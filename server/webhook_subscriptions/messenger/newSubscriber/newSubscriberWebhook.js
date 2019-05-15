const TAG = 'webhook_subscriptions/messenger/newSubscriberWebhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')
const needle = require('needle')
const pageAdminSubscriptionWebhok = require('../pageAdminSubscription/pageAdminSubscriptionWebhook')

exports.newSubscriberWebhook = (payloadBody) => {
  logger.serverLog(TAG, `in newSubscriberWebhook: ${JSON.stringify(payloadBody)}`)
  console.log('in newSubscriberWebhook', JSON.stringify(payloadBody))
  callApi.callApi('messengerEvents/sequence', 'post', payloadBody, 'kiboengage')

  // todo all these should be separate schemas for matching
  // this is making the code messy. It needs refactor. @Sojharo
  const isMessage = (payloadBody.entry[0].messaging[0].message && (payloadBody.entry[0].messaging[0].message.text || payloadBody.entry[0].messaging[0].message.attachments))
  const isReferral = (payloadBody.entry[0].messaging[0].referral)
  const isOptin = (payloadBody.entry[0].messaging[0].optin)
  const isPostback = (payloadBody.entry[0].messaging[0].postback)
  const isDelivery = (payloadBody.entry[0].messaging[0].delivery)
  const isEcho = (payloadBody.entry[0].messaging[0].message && (payloadBody.entry[0].messaging[0].message.is_echo && payloadBody.entry[0].messaging[0].message.is_echo === 'true'))

  // if (!payloadBody.entry[0].messaging[0].delivery) {
  //   // PLEASE DON'T REMOVE THIS LINE:
  //   // callApi.callApi('messengerEvents/subscriber', 'post', payloadBody)
  // }
  let ref = []
  if (isOptin) {
    ref = payloadBody.entry[0].messaging[0].optin.ref.split('__')
  }
  if (ref.length === 2 && ref[1] === 'kibopush_test_broadcast_') {
    payloadBody.entry[0].messaging[0].optin.ref = ref[0]
    pageAdminSubscriptionWebhok.adminSubscriberWebhook(payloadBody)
  } else {
    if ((isMessage || isReferral || isOptin) && !isPostback && !isDelivery) {
      console.log('inside if conditions')
      let phoneNumber = ''
      let subscriberSource = 'direct_message'
      for (let i = 0; i < payloadBody.entry[0].messaging.length; i++) {
        const event = payloadBody.entry[0].messaging[i]
        const sender = payloadBody.entry[0].messaging[i].message && payloadBody.entry[0].messaging[i].message.is_echo ? event.recipient.id : event.sender.id
        const pageId = payloadBody.entry[0].messaging[i].message && payloadBody.entry[0].messaging[i].message.is_echo ? event.sender.id : event.recipient.id
        if (event.message && event.message.tags && event.message.tags.source === 'customer_chat_plugin') {
          subscriberSource = 'chat_plugin'
        }
        if (event.prior_message && event.prior_message.source === 'customer_matching') {
          subscriberSource = 'customer_matching'
          phoneNumber = event.prior_message.identifier
        }
        if (event.referral) {
          console.log('event.referral', event.referral)
          subscriberSource = 'messaging_referrals'
        }
        if (event.optin) {
          subscriberSource = 'landing_page'
        }
        // checkbox plugin code starts here
        let userRefIdForCheckBox
        if (payloadBody.entry[0].messaging[i].prior_message) {
          if (payloadBody.entry[0].messaging[i].prior_message.source === 'checkbox_plugin') {
            subscriberSource = 'checkbox_plugin'
            userRefIdForCheckBox = payloadBody.entry[0].messaging[i].prior_message.identifier
          }
        }
        // checkbox plugin code ends
        callApi.callApi(`pages/query`, 'post', { pageId: pageId, connected: true }, 'accounts')
        .then(pages => {
          console.log('pages.length', pages.length)
          pages.forEach((page) => {
            console.log('pages.length', page)
            if (subscriberSource === 'customer_matching') {
              callApi.callApi(`phone/update`, 'post', {query: {number: payloadBody.entry[0].messaging[0].prior_message.identifier, pageId: page._id, companyId: page.companyId}, newPayload: {hasSubscribed: true}, options: {}}, 'accounts')
                .then(phonenumberupdated => {
                  logger.serverLog(TAG, `phone number updated successfully ${JSON.stringify(phonenumberupdated)}`)
                })
                .catch(err => {
                  logger.serverLog(TAG, `Failed to update phone number ${JSON.stringify(err)}`)
                })
            }
            needle.get(
              `https://graph.facebook.com/v2.10/${page.pageId}?fields=access_token&access_token=${page.accessToken}`,
              (err, resp2) => {
                if (err) {
                  logger.serverLog(TAG, `ERROR ${JSON.stringify(err)}`)
                }
                logger.serverLog(TAG, `page access token: ${JSON.stringify(resp2.body)}`)
                let pageAccessToken = resp2.body.access_token
                const options = {
                  url: `https://graph.facebook.com/v2.10/${sender}?fields=gender,first_name,last_name,locale,profile_pic,timezone&access_token=${pageAccessToken}`,
                  qs: { access_token: page.accessToken },
                  method: 'GET'
                }
                logger.serverLog(TAG, `options: ${JSON.stringify(options)}`)
                needle.get(options.url, options, (error, response) => {
                  logger.serverLog(TAG, `Subscriber response git from facebook: ${JSON.stringify(response.body)}`)
                  const subscriber = response.body
                  if (!error && !response.error) {
                    const payload = {
                      firstName: subscriber.first_name,
                      lastName: subscriber.last_name,
                      locale: subscriber.locale,
                      gender: subscriber.gender,
                      timezone: subscriber.timezone,
                      profilePic: subscriber.profile_pic,
                      companyId: page.companyId,
                      pageScopedId: '',
                      email: '',
                      senderId: sender,
                      pageId: page._id,
                      isSubscribed: true
                    }
                    console.log('payload to send', payload)
                    if (subscriberSource === 'customer_matching') {
                      payload.phoneNumber = phoneNumber
                      payload.source = 'customer_matching'
                    } else if (subscriberSource === 'chat_plugin') {
                      payload.source = 'chat_plugin'
                    } else if (subscriberSource === 'messaging_referrals') {
                      payload.source = `https://m.me/${page._id}?ref=${event.referral.ref}`
                    } else if (subscriberSource === 'landing_page') {
                      payload.source = 'landing_page'
                    } else if (subscriberSource === 'checkbox_plugin') {
                      payload.source = 'checkbox_plugin'
                    }
                    // checkbox plugin code starts here
                    if (userRefIdForCheckBox) {
                      payload.userRefIdForCheckBox = userRefIdForCheckBox
                    }
                    // checkbox plugin code ends here
                    callApi.callApi(`subscribers/query`, 'post', {senderId: sender, pageId: page._id}, 'accounts')
                      .then(subscriberFound => {
                        console.log('fetched subscriber', subscriberFound)
                        if (subscriberFound.length === 0) {
                            // subscriber not found, create subscriber
                          callApi.callApi(`companyprofile/query`, 'post', {_id: page.companyId}, 'accounts')
                              .then(company => {
                                console.log('fetched company')
                                callApi.callApi(`featureUsage/planQuery`, 'post', {planId: company.planId}, 'accounts')
                                  .then(planUsage => {
                                    console.log('fetched plan')
                                    planUsage = planUsage[0]
                                    callApi.callApi(`featureUsage/companyQuery`, 'post', {companyId: page.companyId}, 'accounts')
                                      .then(companyUsage => {
                                        console.log('fetched companyUsage')
                                        companyUsage = companyUsage[0]
                                        // if (planUsage.subscribers !== -1 && companyUsage.subscribers >= planUsage.subscribers) {
                                          // webhookUtility.limitReachedNotification('subscribers', company)
                                        // } else {
                                        callApi.callApi(`subscribers`, 'post', payload, 'accounts')
                                          .then(subscriberCreated => {
                                            console.log('subscriberCreated')
                                            // checkbox code starts
                                            if (userRefIdForCheckBox) {
                                              callApi.callApi('webhooks/query', 'post', {companyId: page.companyId, pageId: page.pageId}, 'accounts')
                                              .then(webhook => {
                                                webhook = webhook[0]
                                                if (webhook && webhook.isEnabled) {
                                                  needle.get(webhook.webhook_url, (err, r) => {
                                                    if (err) {
                                                      logger.serverLog(TAG, err)
                                                    } else if (r.statusCode === 200) {
                                                      if (webhook && webhook.optIn.NEW_SUBSCRIBER) {
                                                        var data = {
                                                          subscription_type: 'NEW_SUBSCRIBER',
                                                          payload: JSON.stringify({
                                                            subscriberRefId: userRefIdForCheckBox,
                                                            payload: {
                                                              firstName: subscriber.first_name,
                                                              lastName: subscriber.last_name,
                                                              locale: subscriber.locale,
                                                              gender: subscriber.gender,
                                                              timezone: subscriber.timezone,
                                                              profilePic: subscriber.profile_pic,
                                                              subscriberSenderId: subscriberCreated._id
                                                            }})
                                                        }
                                                        needle.post(webhook.webhook_url, data, {json: true},
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
                                              .catch((err) => {
                                                logger.serverLog(TAG, `error from KiboPush on Fetching Webhooks: ${err}`)
                                              })
                                            }
                                            // checkbox code ends
                                            assignDefaultTags(page, subscriberCreated)
                                            callApi.callApi(`messengerEvents/sequence/subscriberJoins`, 'post', {companyId: page.companyId, senderId: sender, pageId: page._id}, 'kiboengage')
                                            callApi.callApi(`featureUsage/updateCompany`, 'put', {query: {companyId: page.companyId}, newPayload: { $inc: { subscribers: 1 } }, options: {}}, 'accounts')
                                              .then(updated => {
                                                logger.serverLog(TAG, `company usage incremented successfully ${JSON.stringify(err)}`)
                                              })
                                              .catch(err => {
                                                logger.serverLog(TAG, `Failed to update company usage ${JSON.stringify(err)}`)
                                              })
                                            if (subscriberSource === 'customer_matching') {
                                              updateList(phoneNumber, sender, page)
                                            }
                                            if (subscriberSource === 'messaging_referrals') {
                                              console.log('in messaging_referralss')
                                              callApi.callApi('messengerEvents/messagingReferrals', 'post', {
                                                pageId: payloadBody.entry[0].messaging[i].recipient.id,
                                                senderId: payloadBody.entry[0].messaging[i].sender.id,
                                                referral: payloadBody.entry[0].messaging[i].referral }, 'kiboengage')
                                              .then((response) => {
                                                logger.serverLog(TAG, `response recieved from KiboEngage: ${response}`)
                                              })
                                              .catch((err) => {
                                                logger.serverLog(TAG, `error from KiboPush: ${err}`)
                                              })
                                            }
                                            if (subscriberSource === 'landing_page') {
                                              callApi.callApi('messengerEvents/landingPage', 'post', {
                                                pageId: payloadBody.entry[0].messaging[i].recipient.id,
                                                senderId: payloadBody.entry[0].messaging[i].sender.id,
                                                companyId: page.companyId
                                              }, 'kiboengage')
                                              .then((response) => {
                                                logger.serverLog(TAG, `response recieved from KiboEngage: ${response}`)
                                              })
                                              .catch((err) => {
                                                logger.serverLog(TAG, `error from KiboPush: ${err}`)
                                              })
                                            }
                                            if (!(event.postback &&
                                              event.postback.title === 'Get Started')) {
                                              callApi.callApi('messengerEvents/sessions', 'post', {page: page, subscriber: subscriberCreated, event: event}, 'kibochat')
                                              if (event.postback.referral) {
                                                callApi.callApi('messengerEvents/messagingReferrals', 'post', {
                                                  pageId: payloadBody.entry[0].messaging[i].recipient.id,
                                                  senderId: payloadBody.entry[0].messaging[i].sender.id,
                                                  referral: event.postback.referral }, 'kiboengage')
                                                  .then((response) => {
                                                    logger.serverLog(TAG, `response recieved from Kiboengage: ${response}`)
                                                  })
                                                  .catch((err) => {
                                                    logger.serverLog(TAG, `error from KiboPush: ${err}`)
                                                  })
                                                callApi.callApi('messengerEvents/messagingReferrals', 'post', {
                                                  pageId: payloadBody.entry[0].messaging[i].recipient.id,
                                                  senderId: payloadBody.entry[0].messaging[i].sender.id,
                                                  referral: event.postback.referral }, 'kibochat')
                                                .then((response) => {
                                                  logger.serverLog(TAG, `response recieved from KiboChat: ${response}`)
                                                })
                                                .catch((err) => {
                                                  logger.serverLog(TAG, `error from KiboPush: ${err}`)
                                                })
                                              }
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
                                          // }
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
                          subscriberFound = subscriberFound[0]
                          if (subscriberSource === 'messaging_referrals') {
                            console.log('in messaging_referralss')
                            callApi.callApi('messengerEvents/messagingReferrals', 'post', {
                              pageId: payloadBody.entry[0].messaging[i].recipient.id,
                              senderId: payloadBody.entry[0].messaging[i].sender.id,
                              referral: payloadBody.entry[0].messaging[i].referral }, 'kiboengage')
                            .then((response) => {
                              logger.serverLog(TAG, `response recieved from KiboEngage: ${response}`)
                            })
                            .catch((err) => {
                              logger.serverLog(TAG, `error from KiboPush: ${err}`)
                            })
                          }
                          if (subscriberSource === 'landing_page') {
                            callApi.callApi('messengerEvents/landingPage', 'post', {
                              pageId: payloadBody.entry[0].messaging[i].recipient.id,
                              senderId: payloadBody.entry[0].messaging[i].sender.id,
                              companyId: page.companyId
                            }, 'kiboengage')
                            .then((response) => {
                              logger.serverLog(TAG, `response recieved from KiboEngage: ${response}`)
                            })
                            .catch((err) => {
                              logger.serverLog(TAG, `error from KiboPush: ${err}`)
                            })
                          }
                          if (!subscriberFound.isSubscribed) {
                            // subscribing the subscriber again in case he
                            // or she unsubscribed and removed chat
                            var messageText = ''
                            if (isMessage) {
                              messageText = payloadBody.entry[0].messaging[0].message.text
                            }
                            if (!isEcho && (messageText.toLowerCase() === 'subscribe' || messageText.toLowerCase() === 'start')) {
                              callApi.callApi(`subscribers/update`, 'put', {query: { senderId: sender }, newPayload: {isSubscribed: true, isEnabledByPage: true}, options: {}}, 'accounts')
                                .then(subscriber => {
                                  logger.serverLog(TAG, subscriber)
                                  callApi.callApi(`tags/query`, 'post', {tag: `_${page.pageId}_unsubscribe`, defaultTag: true, companyId: page.companyId}, 'accounts')
                                    .then(unsubscribeTag => {
                                      unsubscribeTag = unsubscribeTag[0]
                                      needle('delete', `https://graph.facebook.com/v2.11/${unsubscribeTag.labelFbId}/label?user=${subscriberFound.senderId}&access_token=${page.accessToken}`)
                                        .then(response => {
                                          if (response.body.error) {
                                            logger.serverLog(TAG, `failed to unassigned unsubscribe tag: ${JSON.stringify(response.body.error)}`)
                                          } else {
                                            logger.serverLog(TAG, `unsubscribe tag unassigned successfully!`)
                                          }
                                        })
                                        .catch((err) => {
                                          logger.serverLog(TAG, `failed to unassigned unsubscribe tag: ${JSON.stringify(err)}`)
                                        })
                                    })
                                    .catch((err) => {
                                      logger.serverLog(TAG, `failed to fetch unsubscribe tag: ${err}`)
                                    })
                                })
                                .catch((err) => {
                                  logger.serverLog(TAG, `failed to update subscriber: ${err}`)
                                })
                            }
                          }
                          if (!(event.postback &&
                            event.postback.title === 'Get Started')) {
                            console.log('in getstarted')
                            callApi.callApi('messengerEvents/sessions', 'post', {page: page, subscriber: subscriberFound, event: event}, 'kibochat')
                            if (event.postback.referral) {
                              callApi.callApi('messengerEvents/messagingReferrals', 'post', {
                                pageId: payloadBody.entry[0].messaging[i].recipient.id,
                                senderId: payloadBody.entry[0].messaging[i].sender.id,
                                referral: event.postback.referral }, 'kiboengage')
                              .then((response) => {
                                logger.serverLog(TAG, `response recieved from kiboengage: ${response}`)
                              })
                              .catch((err) => {
                                logger.serverLog(TAG, `error from KiboPush: ${err}`)
                              })
                              callApi.callApi('messengerEvents/messagingReferrals', 'post', {
                                pageId: payloadBody.entry[0].messaging[i].recipient.id,
                                senderId: payloadBody.entry[0].messaging[i].sender.id,
                                referral: event.postback.referral }, 'kibochat')
                              .then((response) => {
                                logger.serverLog(TAG, `response recieved from KiboChat: ${response}`)
                              })
                              .catch((err) => {
                                logger.serverLog(TAG, `error from KiboPush: ${err}`)
                              })
                            }
                          }
                        }
                      })
                      .catch(err => {
                        logger.serverLog(TAG, `Failed to fetch subscriber ${JSON.stringify(err)}`)
                      })
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
}

function updateList (phoneNumber, sender, page) {
  callApi.callApi(`phone/query`, 'post', {number: phoneNumber, hasSubscribed: true, pageId: page, companyId: page.companyId}, 'accounts')
    .then(number => {
      if (number.length > 0) {
        let subscriberFindCriteria = {
          source: 'customer_matching',
          senderId: sender,
          isSubscribed: true,
          phoneNumber: phoneNumber,
          pageId: page._id
        }
        callApi.callApi(`subscribers/query`, 'post', subscriberFindCriteria, 'accounts')
          .then(subscribers => {
            let temp = []
            for (let i = 0; i < subscribers.length; i++) {
              temp.push(subscribers[i]._id)
            }
            callApi.callApi(`lists/update`, 'put', {query: { listName: number[0].fileName, companyId: page.companyId }, newPayload: {content: temp}, options: {}}, 'accounts')
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

function assignDefaultTags (page, subscriber) {
  let subscribersData = [
    {$match: {pageId: page._id}},
    {$group: {_id: null, count: {$sum: 1}}}
  ]
  callApi.callApi('subscribers/aggregate', 'post', subscribersData, 'accounts')
    .then(subscribersCount => {
      let value = (subscribersCount[0].count - 1) % 10000
      let count = Math.floor(subscribersCount[0].count / 10000)
      if (value === 0 && subscribersCount[0].count > 10000) {
        createTag(page, subscriber, `_${page.pageId}_${count + 1}`)
      } else {
        assignTag(page, subscriber, `_${page.pageId}_${count + 1}`)
      }
      assignTag(page, subscriber, subscriber.gender)
      assignTag(page, subscriber, subscriber.locale)
    })
    .catch(err => logger.serverLog(TAG, `Failed to get subscribers count ${err}`))
}

function assignTag (page, subscriber, tag) {
  callApi.callApi('tags/query', 'post', {tag, pageId: page._id}, 'accounts')
    .then(tags => {
      let tag = tags[0]
      needle('post', `https://graph.facebook.com/v2.11/me/${tag.labelFbId}/label?access_token=${page.pageAccessToken}`, 'post', {'user': subscriber.senderId})
        .then(assignedLabel => {
          if (assignedLabel.error) logger.serverLog(TAG, `Error at save tag ${assignedLabel.error}`)
          let subscriberTagsPayload = {
            tagId: tag._id,
            subscriberId: subscriber._id,
            companyId: page.companyId
          }
          callApi.callApi(`tags_subscriber/`, 'post', subscriberTagsPayload, 'accounts')
            .then(newRecord => {
              logger.serverLog(TAG, `label associated successfully!`)
            })
            .catch(err => logger.serverLog(TAG, `Error at save tag ${err}`))
        })
        .catch(err => logger.serverLog(TAG, `Error at save tag ${err}`))
    })
    .catch(err => logger.serverLog(TAG, `Error at save tag ${err}`))
}

function createTag (page, subscriber, tag) {
  needle('post', `https://graph.facebook.com/v2.11/me/custom_labels?accessToken=${page.pageAccessToken}`)
    .then(label => {
      if (label.id) {
        let tagData = {
          tag: tag,
          userId: page.userId,
          companyId: page.companyId,
          pageId: page._id,
          labelFbId: label.id,
          defaultTag: true
        }
        callApi('tags', 'post', tagData, 'accounts')
          .then(created => {
            assignTag(page, subscriber, tag)
            logger.serverLog(TAG, `default tag created successfully!`)
          })
          .catch(err => {
            logger.serverLog(TAG, `Error at save tag ${err}`)
          })
      } else {
        logger.serverLog(TAG, `Error at create tag on Facebook ${label.error}`)
      }
    })
    .catch(err => {
      logger.serverLog(TAG, `Error at create tag on Facebook ${err}`)
    })
}
