const TAG = 'webhook_subscriptions/messenger/newSubscriberWebhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')
const needle = require('needle')

exports.newSubscriberWebhook = (payload) => {
  logger.serverLog(TAG, `in newSubscriberWebhook: ${payload}`)
  if (!payload.entry[0].messaging[0].prior_message && payload.entry[0].messaging[0].message && !payload.entry[0].messaging[0].message.attachments && !payload.entry[0].messaging[0].postback && !payload.entry[0].messaging[0].delivery) {
    let phoneNumber = ''
    let subscriberSource = 'direct_message'
    for (let i = 0; i < payload.body.entry[0].messaging.length; i++) {
      const event = payload.body.entry[0].messaging[i]
      const sender = event.sender.id
      const pageId = event.recipient.id
      if (event.message && event.message.tags && event.message.tags.source === 'customer_chat_plugin') {
        subscriberSource = 'chat_plugin'
      }
      if (event.prior_message && event.prior_message.source === 'customer_matching') {
        subscriberSource = 'customer_matching'
        phoneNumber = event.prior_message.identifier
      }
      callApi.callAccountsApi(`pages/query`, 'post', { pageId: pageId, connected: true })
      .then(pages => {
        pages.forEach((page) => {
          if (subscriberSource === 'customer_matching') {
            callApi.callAccountsApi(`phone/update`, 'put', {query: {number: payload.body.entry[0].messaging[0].prior_message.identifier, pageId: page._id, companyId: page.companyId}, newPayload: {hasSubscribed: true}, options: {}})
              .then(phonenumberupdated => {
                logger.serverLog(TAG, `phone number updated successfully ${JSON.stringify(phonenumberupdated)}`)
              })
              .catch(err => {
                logger.serverLog(TAG, `Failed to update phone number ${JSON.stringify(err)}`)
              })
          }
          needle.get(
            `https://graph.facebook.com/v2.10/${page.pageId}?fields=access_token&access_token=${page.userId.facebookInfo.fbToken}`,
            (err, resp2) => {
              if (err) {
                logger.serverLog(TAG, `ERROR ${JSON.stringify(err)}`)
              }
              let pageAccessToken = resp2.body.access_token
              const options = {
                url: `https://graph.facebook.com/v2.6/${sender}?access_token=${pageAccessToken}`,
                qs: { access_token: page.accessToken },
                method: 'GET'

              }
              needle.get(options.url, options, (error, response) => {
                logger.serverLog(TAG, `Subscriber response git from facebook: ${JSON.stringify(response.body)}`)
                const subscriber = response.body
                if (!error && !response.error) {
                  const payload = {
                    firstName: subscriber.first_name,
                    lastName: subscriber.last_name,
                    locale: subscriber.locale,
                    gender: subscriber.gender,
                    userId: page.userId,
                    provider: 'facebook',
                    timezone: subscriber.timezone,
                    profilePic: subscriber.profile_pic,
                    companyId: page.companyId,
                    pageScopedId: '',
                    email: '',
                    senderId: sender,
                    pageId: page._id,
                    isSubscribed: true
                  }
                  if (subscriberSource === 'customer_matching') {
                    payload.phoneNumber = phoneNumber
                    payload.source = 'customer_matching'
                  } else if (subscriberSource === 'chat_plugin') {
                    payload.source = 'chat_plugin'
                  }

                  if (subscriber === null) {
                        // subscriber not found, create subscriber
                    callApi.callAccountsApi(`company/${page.companyId}`)
                          .then(company => {
                            callApi.callAccountsApi(`featureUsage/getPlanUsage`, 'post', {planId: company.planId})
                              .then(planUsage => {
                                planUsage = planUsage[0]
                                callApi.callAccountsApi(`featureUsage/getCompanyUsage`, 'post', {companyId: page.companyId})
                                  .then(companyUsage => {
                                    companyUsage = companyUsage[0]
                                    if (planUsage.subscribers !== -1 && companyUsage.subscribers >= planUsage.subscribers) {
                                      // webhookUtility.limitReachedNotification('subscribers', company)
                                    } else {
                                      callApi.callAccountsApi(`subscribers`, 'post', payload)
                                        .then(subscriberCreated => {
                                          callApi.callAccountsApi(`featureUsage/updateCompanyUsage`, 'post', {query: {companyId: page.companyId}, newPayload: { $inc: { subscribers: 1 } }, options: {}})
                                            .then(updated => {
                                              logger.serverLog(TAG, `company usage incremented successfully ${JSON.stringify(err)}`)
                                            })
                                            .catch(err => {
                                              logger.serverLog(TAG, `Failed to update company usage ${JSON.stringify(err)}`)
                                            })
                                          callApi.callAccountsApi(`webhooks/query`, 'post', { pageId: pageId })
                                            .then(webhook => {
                                              if (webhook && webhook.isEnabled) {
                                                needle.get(webhook.webhook_url, (err, r) => {
                                                  if (err) {
                                                    logger.serverLog(TAG, err)
                                                  } else if (r.statusCode === 200) {
                                                    if (webhook && webhook.optIn.NEW_SUBSCRIBER) {
                                                      var data = {
                                                        subscription_type: 'NEW_SUBSCRIBER',
                                                        payload: JSON.stringify({ subscriber: subscriber, recipient: pageId, sender: sender })
                                                      }
                                                      needle.post(webhook.webhook_url, data,
                                                        (error, response) => {
                                                          if (error) logger.serverLog(TAG, err)
                                                        })
                                                    }
                                                  } else {
                                                    // webhookUtility.saveNotification(webhook)
                                                  }
                                                })
                                              }
                                            })
                                            .catch(err => {
                                              logger.serverLog(TAG, err)
                                            })
                                          if (subscriberSource === 'customer_matching') {
                                            updateList(phoneNumber, sender, page)
                                          }
                                          if (!(event.postback &&
                                            event.postback.title === 'Get Started')) {
                                            callApi.callChatApi('sessions', 'post', payload)
                                          }
                                          // require('./../../../config/socketio')
                                          //   .sendMessageToClient({
                                          //     room_id: page.companyId,
                                          //     body: {
                                          //       action: 'dashboard_updated',
                                          //       payload: {
                                          //         subscriber_id: subscriberCreated._id,
                                          //         company_id: page.companyId
                                          //       }
                                          //     }
                                          //   })
                                        })
                                        .catch(err => {
                                          logger.serverLog(TAG, `Failed to create subscriber ${JSON.stringify(err)}`)
                                        })
                                    }
                                  })
                                  .catch(err => {
                                    logger.serverLog(TAG, `Failed to fetch company usage ${JSON.stringify(err)}`)
                                  })
                              })
                              .catch(err => {
                                logger.serverLog(TAG, `Failed to fetch plan usage ${JSON.stringify(err)}`)
                              })
                          })
                          .catch(err => {
                            logger.serverLog(TAG, `Failed to fetch company ${JSON.stringify(err)}`)
                          })
                  } else {
                    if (!subscriber.isSubscribed) {
                      // subscribing the subscriber again in case he
                      // or she unsubscribed and removed chat
                      callApi(`subscribers/update`, 'put', {query: { senderId: sender }, newPayload: {isSubscribed: true, isEnabledByPage: true}, options: {}})
                        .then(subscriber => {
                          logger.serverLog(TAG, subscriber)
                        })
                    }
                    if (!(event.postback &&
                      event.postback.title === 'Get Started')) {
                      callApi.callChatApi('sessions', 'post', payload)
                    }
                  }
                } else {
                  if (error) {
                    logger.serverLog(TAG, `ERROR in fetching subscriber info ${JSON.stringify(error)}`)
                  }
                }
              })
            })
        })
      })
      .catch(err => {
        logger.serverLog(TAG, `Failed to fetch pages ${JSON.stringify(err)}`)
      })
    }
  }
}

function updateList (phoneNumber, sender, page) {
  callApi.callAccountsApi(`phone/query`, 'post', {number: phoneNumber, hasSubscribed: true, pageId: page, companyId: page.companyId})
    .then(number => {
      if (number.length > 0) {
        let subscriberFindCriteria = {
          source: 'customer_matching',
          senderId: sender,
          isSubscribed: true,
          phoneNumber: phoneNumber,
          pageId: page._id
        }
        callApi.callAccountsApi(`subscribers/query`, 'post', subscriberFindCriteria)
          .then(subscribers => {
            let temp = []
            for (let i = 0; i < subscribers.length; i++) {
              temp.push(subscribers[i]._id)
            }
            callApi.callAccountsApi(`lists/update`, 'put', {query: { listName: number[0].fileName, companyId: page.companyId }, newPayload: {content: temp}, options: {}})
              .then(savedList => {
                logger.serverLog(TAG, `list updated successfully ${JSON.stringify(savedList)}`)
              })
              .catch(err => {
                logger.serverLog(TAG, `Failed to update list ${JSON.stringify(err)}`)
              })
          })
          .catch(err => {
            logger.serverLog(TAG, `Failed to update update subscriber ${JSON.stringify(err)}`)
          })
      }
    })
}
