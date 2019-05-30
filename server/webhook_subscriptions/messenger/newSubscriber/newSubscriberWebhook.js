const TAG = 'webhook_subscriptions/messenger/newSubscriberWebhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')
const needle = require('needle')
const pageAdminSubscriptionWebhok = require('../pageAdminSubscription/pageAdminSubscriptionWebhook')
const helperApiCalls = require('./helperApiCalls')
const global = require('../../../global/global')

exports.newSubscriberWebhook = (payloadBody) => {
  logger.serverLog(TAG, `in newSubscriberWebhook: ${JSON.stringify(payloadBody)}`)
  callApi.callApi('messengerEvents/sequence', 'post', payloadBody, 'kiboengage')

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
      let phoneNumber = ''
      for (let i = 0; i < payloadBody.entry[0].messaging.length; i++) {
        const event = payloadBody.entry[0].messaging[i]
        const sender = payloadBody.entry[0].messaging[i].message && payloadBody.entry[0].messaging[i].message.is_echo ? event.recipient.id : event.sender.id
        const pageId = payloadBody.entry[0].messaging[i].message && payloadBody.entry[0].messaging[i].message.is_echo ? event.sender.id : event.recipient.id

        let subscriberSource = findSubscriberSource(event)

        // checkbox plugin code starts here
        let userRefIdForCheckBox
        if (subscriberSource === 'checkbox_plugin') {
          userRefIdForCheckBox = payloadBody.entry[0].messaging[i].prior_message.identifier
        }
        // checkbox plugin code ends
        callApi.callApi(`pages/query`, 'post', { pageId: pageId, connected: true }, 'accounts')
        .then(pages => {
          let page = pages[0]
          if (subscriberSource === 'customer_matching') {
            phoneNumber = event.prior_message.identifier
            helperApiCalls.updatePhoneNumberCustomerMatching(payloadBody.entry[0].messaging[0].prior_message.identifier,
            page._id, page.companyId)
          }
          global.getRefreshedPageAccessToken(page.pageId, page.accessToken)
          .then(pageAccessToken => {
            helperApiCalls.getSubscriberInfoFromFB(sender, pageAccessToken, page)
            .then(response => {
              const subscriber = response.body
              if (!response.error) {
                const payload = prepareNewSubscriberPayload(subscriber, page, subscriberSource, phoneNumber, sender, event.referral ? event.referral.ref : null)
                // checkbox plugin code starts here
                if (userRefIdForCheckBox) {
                  payload.userRefIdForCheckBox = userRefIdForCheckBox
                }
                // checkbox plugin code ends here
                callApi.callApi(`subscribers/query`, 'post', {senderId: sender, pageId: page._id}, 'accounts')
                  .then(subscriberFound => {
                    if (subscriberFound.length === 0) {
                      callApi.callApi(`subscribers`, 'post', payload, 'accounts')
                        .then(subscriberCreated => {
                          // checkbox code starts
                          if (userRefIdForCheckBox) {
                            sendWebhookForNewSubscriber(page.pageId,
                              page.companyId, userRefIdForCheckBox, subscriber, subscriberCreated._id)
                          }
                          // checkbox code ends
                          assignDefaultTags(page, subscriberCreated)
                          callApi.callApi(`messengerEvents/sequence/subscriberJoins`, 'post', {companyId: page.companyId, senderId: sender, pageId: page._id}, 'kiboengage')
                          helperApiCalls.incrementSubscriberForCompany(page.companyId)
                          if (subscriberSource === 'customer_matching') {
                            updateList(phoneNumber, sender, page)
                          }
                          informGrowthTools(subscriberSource,
                            payloadBody.entry[0].messaging[i].recipient.id,
                            payloadBody.entry[0].messaging[i].sender.id,
                            page.companyId,
                            payloadBody.entry[0].messaging[i].referral)
                          callApi.callApi('messengerEvents/sessions', 'post', {page: page, subscriber: subscriberCreated, event: event}, 'kibochat')
                        })
                        .catch(err => {
                          logger.serverLog(TAG, `Failed to create subscriber ${JSON.stringify(err)}`, 'error')
                        })
                    } else {
                      subscriberFound = subscriberFound[0]
                      informGrowthTools(subscriberSource,
                        payloadBody.entry[0].messaging[i].recipient.id,
                        payloadBody.entry[0].messaging[i].sender.id,
                        page.companyId,
                        payloadBody.entry[0].messaging[i].referral)
                      if (!subscriberFound.isSubscribed) {
                        // subscribing the subscriber again in case he
                        // or she unsubscribed and removed chat
                        var messageText = ''
                        if (isMessage) {
                          messageText = payloadBody.entry[0].messaging[0].message.text
                        }
                        if (!isEcho && (messageText.toLowerCase() === 'subscribe' || messageText.toLowerCase() === 'start')) {
                          helperApiCalls.handleSubscribeAgain(sender, page, subscriberFound)
                        }
                      }
                      callApi.callApi('messengerEvents/sessions', 'post', {page: page, subscriber: subscriberFound, event: event}, 'kibochat')
                    }
                  })
                  .catch(err => {
                    logger.serverLog(TAG, `Failed to fetch subscriber ${JSON.stringify(err)}`, 'error')
                  })
              }
            })
            .catch(error => {
              logger.serverLog(TAG, `ERROR in fetching subscriber info ${JSON.stringify(error)}`, 'error')
            })
          })
          .catch(err => {
            logger.serverLog(TAG, `ERROR in fetching subscriber info ${JSON.stringify(err)}`, 'error')
          })
        })
        .catch(err => {
          logger.serverLog(TAG, `Failed to fetch pages ${JSON.stringify(err)}`, 'error')
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
                logger.serverLog(TAG, `list updated successfully ${JSON.stringify(savedList)}`, 'debug')
              })
              .catch(err => {
                logger.serverLog(TAG, `Failed to update list ${JSON.stringify(err)}`, 'error')
              })
          })
          .catch(err => {
            logger.serverLog(TAG, `Failed to update update subscriber ${JSON.stringify(err)}`, 'error')
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
    .catch(err => logger.serverLog(TAG, `Failed to get subscribers count ${err}`, 'error'))
}

function assignTag (page, subscriber, tag) {
  callApi.callApi('tags/query', 'post', {tag, pageId: page._id}, 'accounts')
    .then(tags => {
      let tag = tags[0]
      needle('post', `https://graph.facebook.com/v2.11/me/${tag.labelFbId}/label?access_token=${page.pageAccessToken}`, 'post', {'user': subscriber.senderId})
        .then(assignedLabel => {
          if (assignedLabel.error) logger.serverLog(TAG, `Error at save tag ${assignedLabel.error}`, 'error')
          let subscriberTagsPayload = {
            tagId: tag._id,
            subscriberId: subscriber._id,
            companyId: page.companyId
          }
          callApi.callApi(`tags_subscriber/`, 'post', subscriberTagsPayload, 'accounts')
            .then(newRecord => {
              logger.serverLog(TAG, `label associated successfully!`)
            })
            .catch(err => logger.serverLog(TAG, `Error at save tag ${err}`, 'error'))
        })
        .catch(err => logger.serverLog(TAG, `Error at save tag ${err}`, 'error'))
    })
    .catch(err => logger.serverLog(TAG, `Error at save tag ${err}`, 'error'))
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
            logger.serverLog(TAG, `Error at save tag ${err}`, 'error')
          })
      } else {
        logger.serverLog(TAG, `Error at create tag on Facebook ${label.error}`, 'error')
      }
    })
    .catch(err => {
      logger.serverLog(TAG, `Error at create tag on Facebook ${err}`, 'error')
    })
}

function informGrowthTools (subscriberSource, recipientId, senderId, companyId, referral) {
  if (subscriberSource === 'messaging_referrals') {
    helperApiCalls.informMessengerRefUrlOfSubscriber(
      recipientId,
      senderId,
      referral
    )
  }
  if (subscriberSource === 'landing_page') {
    helperApiCalls.informLandingPageOfSubscriber(
      recipientId,
      senderId,
      companyId
    )
  }
}

function findSubscriberSource (event) {
  let subscriberSource = 'direct_message'
  if (event.message && event.message.tags && event.message.tags.source === 'customer_chat_plugin') {
    subscriberSource = 'chat_plugin'
  }
  if (event.prior_message) {
    if (event.prior_message.source === 'customer_matching') {
      subscriberSource = 'customer_matching'
    }
    if (event.prior_message.source === 'checkbox_plugin') {
      subscriberSource = 'checkbox_plugin'
    }
  }
  if (event.referral) {
    subscriberSource = 'messaging_referrals'
  }
  if (event.optin) {
    subscriberSource = 'landing_page'
  }
  return subscriberSource
}
function sendWebhookForNewSubscriber (pageId, companyId, userRefIdForCheckBox, subscriber, _id) {
  callApi.callApi('webhooks/query', 'post', {companyId: companyId, pageId: pageId}, 'accounts')
  .then(webhook => {
    webhook = webhook[0]
    if (webhook && webhook.isEnabled) {
      needle.get(webhook.webhook_url, (err, r) => {
        if (err) {
          logger.serverLog(TAG, err, 'error')
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
                  subscriberSenderId: _id
                }})
            }
            needle.post(webhook.webhook_url, data, {json: true},
              (error, response) => {
                if (error) logger.serverLog(TAG, err, 'error')
              })
          }
        } else {
          // webhookUtility.saveNotification(webhook)
        }
      })
    }
  })
  .catch((err) => {
    logger.serverLog(TAG, `error from KiboPush on Fetching Webhooks: ${err}`, 'error')
  })
}

function prepareNewSubscriberPayload (subscriber, page, subscriberSource, phoneNumber, senderId, ref) {
  let payload = {
    firstName: subscriber.first_name,
    lastName: subscriber.last_name,
    locale: subscriber.locale,
    gender: subscriber.gender,
    timezone: subscriber.timezone,
    profilePic: subscriber.profile_pic,
    companyId: page.companyId,
    pageScopedId: '',
    email: '',
    senderId: senderId,
    pageId: page._id,
    isSubscribed: true
  }
  if (subscriberSource === 'customer_matching') {
    payload.phoneNumber = phoneNumber
    payload.source = 'customer_matching'
  } else if (subscriberSource === 'chat_plugin') {
    payload.source = 'chat_plugin'
  } else if (subscriberSource === 'messaging_referrals') {
    payload.source = `https://m.me/${page._id}?ref=${ref}`
  } else if (subscriberSource === 'landing_page') {
    payload.source = 'landing_page'
  } else if (subscriberSource === 'checkbox_plugin') {
    payload.source = 'checkbox_plugin'
  }
  return payload
}
