const { callApi } = require('../../utility/api.caller.service')
const TAG = 'LogicLayer/createNewSubscriber.js'
const logger = require('../../components/logger')
const LogicLayer = require('./createNewSubscriber.logiclayer.js')

exports.createNewSubscriber = (pageId, senderId, subscriberSource, identifier, ref, event, fullPayload) => {
  if (event.message && event.message.tags && event.message.tags.source === 'customer_chat_plugin') {
    subscriberSource = 'chat_plugin'
  }
  return new Promise((resolve, reject) => {
    callApi(`pages/query`, 'post', { pageId: pageId, connected: true }, 'accounts')
      .then(pages => {
        let page = pages[0]
        if (page) {
          if (subscriberSource === 'customer_matching') {
            LogicLayer.updatePhoneNumberCustomerMatching(identifier, page._id, page.companyId)
          }
          LogicLayer.getSubscriberInfoFromFB(senderId, page.accessToken, page)
            .then(response => {
              if (response.body.error) {
                reject(response.body.error)
                const message = response.body.error ? response.body.error.message : 'Error occured while fetching subscriber details from facebook'
                let severity = 'error'
                if (response.body.error.code && (response.body.error.code === 190 || response.body.error.code === 100)) {
                  severity = 'info'
                }
                logger.serverLog(message, `${TAG}: exports.createNewSubscriber`, {}, {event, pageId, senderId, error: response.body.error}, severity)
              } else {
                const subscriber = response.body
                const payload = LogicLayer.prepareNewSubscriberPayload(subscriber, page, subscriberSource, identifier, senderId, ref)
                if (subscriberSource === 'checkbox_plugin' || subscriberSource === 'shopify') {
                  payload.userRefIdForCheckBox = identifier
                }
                let subscriberQueryPayload = {pageId: page._id, senderId}
                callApi(`subscribers/query`, 'post', subscriberQueryPayload, 'accounts')
                  .then(subscriberFound => {
                    if (subscriberFound.length === 0) {
                      LogicLayer.createSubscriber(payload, page)
                        .then(subscriberCreated => {
                          resolve('resolve')
                          // if (subscriberSource === 'checkbox_plugin' || subscriberSource === 'shopify') {
                          LogicLayer.sendWebhookForNewSubscriber(
                            subscriberCreated,
                            page
                          )
                          // }
                          LogicLayer.handleNewsSubscriptionForNewSubscriber(subscriberCreated)
                          callApi(`messengerEvents/sequence/subscriberJoins`, 'post', {companyId: page.companyId, senderId: senderId, pageId: page._id}, 'kiboengage')
                            .then(seqRes => {
                              logger.serverLog(`response from sequence subscriberJoins ${seqRes}`, `${TAG}: exports.createNewSubscriber`, {}, {event: event, page: page, senderId: senderId}, 'debug')
                            })
                            .catch(err => {
                              const message = err || 'Failed to get response from sequence subscriberJoins'
                              logger.serverLog(message, `${TAG}: exports.createNewSubscriber`, {}, {event: event, page: page, senderId: senderId}, 'error')
                            })
                          LogicLayer.incrementSubscriberForCompany(page.companyId)
                          if (subscriberSource === 'customer_matching') {
                            LogicLayer.updateList(identifier, senderId, page)
                          }
                          if (['messaging_referrals', 'landing_page'].indexOf(subscriberSource) !== -1) {
                            LogicLayer.informGrowthTools(
                              subscriberSource,
                              pageId,
                              senderId,
                              page.companyId,
                              event.referral
                            )
                          }
                          let payloadData = {page: page, subscriber: subscriberCreated, event: event, pushPendingSessionInfo: true, newSubscriber: true}
                          callApi('messengerEvents/sessions', 'post', payloadData, 'kibochat')
                          .then(sessRes => {
                            logger.serverLog(`response from sessions ${sessRes}`, `${TAG}: exports.createNewSubscriber`, {}, {event: event, page: page, subscriber: subscriberCreated}, 'debug')
                          })
                          .catch(err => {
                            const message = err || 'Failed to get response from sessions'
                            logger.serverLog(message, `${TAG}: exports.createNewSubscriber`, {}, {event: event, page: page, subscriber: subscriberCreated}, 'error')
                          })
                        })
                        .catch(err => {
                          const message = err || 'Failed to create subscriber'
                          logger.serverLog(message, `${TAG}: exports.createNewSubscriber`, {}, {event: event, pageId: pageId}, 'error')
                        })
                    } else {
                      resolve('resolve')
                      subscriberFound = subscriberFound[0]
                      if (event.message && !event.message.is_echo) {
                        if (subscriberFound.waitingForUserInput && subscriberFound.waitingForUserInput.componentIndex !== -1) {
                          callApi('messengerEvents/userInput', 'post', {payload: payload, message: event.message}, 'kiboengage')
                          .then((response) => {
                            logger.serverLog(`response recieved from Kiboengage: ${response}`, `${TAG}: exports.createNewSubscriber`, {}, {event: event, page: page, subscriber: subscriberFound}, 'debug')
                          })
                          .catch((err) => {
                            const message = err || 'response recieved from Kiboengage'
                            logger.serverLog(message, `${TAG}: exports.createNewSubscriber`, {}, {event: event, page: page, subscriber: subscriberFound}, 'error')
                          })
                        }
                        if (!subscriberFound.completeInfo) {
                          LogicLayer.addCompleteInfoOfSubscriber(subscriberFound, payload)
                          if (subscriberFound.awaitingCommentReply && subscriberFound.awaitingCommentReply.postId) {
                            LogicLayer.updateConversionCount(subscriberFound.awaitingCommentReply.postId)
                          }
                        }
                        LogicLayer.checkCommentReply(subscriberFound, page, payload, fullPayload)
                      }
                      if (subscriberSource === 'chat_plugin') {
                        LogicLayer.addSiteInfoForSubscriber(subscriberFound, payload, ref, senderId)
                      }
                      if (['messaging_referrals', 'landing_page'].indexOf(subscriberSource) !== -1) {
                        LogicLayer.informGrowthTools(
                          subscriberSource,
                          pageId,
                          senderId,
                          page.companyId,
                          event.referral
                        )
                      }
                      if (!subscriberFound.isSubscribed && subscriberFound.unSubscribedBy === 'subscriber') {
                        // subscribing the subscriber again in case he
                        // or she unsubscribed and removed chat
                        var messageText = ''
                        if (event.message && event.message.text) {
                          messageText = event.message.text
                        }
                        if (
                          !(event.message && (event.message.is_echo && event.message.is_echo === 'true')) &&
                          (messageText.toLowerCase() === 'subscribe' || messageText.toLowerCase() === 'start')
                        ) {
                          LogicLayer.handleSubscribeAgain(senderId, page, subscriberFound)
                          LogicLayer.handleNewsSubscriptionForOldSubscriber(subscriberFound)
                        }
                      }
                      callApi('messengerEvents/sessions', 'post', {page: page, subscriber: subscriberFound, event: event}, 'kibochat')
                        .then(sessRes => {
                          logger.serverLog(`response from sessions kibochat ${sessRes}`, `${TAG}: exports.createNewSubscriber`, {}, {event: event, page: page, subscriber: subscriberFound}, 'debug')
                        })
                        .catch(err => {
                          const message = err || `Error response from sessions kibochat`
                          logger.serverLog(message, `${TAG}: exports.createNewSubscriber`, {}, {event: event, page: page, subscriber: subscriberFound}, 'error')
                        })
                    }
                  })
                  .catch(err => {
                    reject(err)
                    const message = err || `Failed to fetch subscriber`
                    logger.serverLog(message, `${TAG}: exports.createNewSubscriber`, {}, {event: event, pageId: pageId}, 'error')
                  })
              }
            })
            .catch(err => {
              reject(err)
              const message = err || `Failed to fetch subscriber details`
              logger.serverLog(message, `${TAG}: exports.createNewSubscriber`, {}, {event: event, pageId: pageId}, 'error')
            })
        } else {
          reject('fail')
        }
      })
      .catch(err => {
        reject(err)
        const message = err || `Failed to fetch pages`
        logger.serverLog(message, `${TAG}: exports.createNewSubscriber`, {}, {event: event, pageId: pageId}, 'error')
      })
  })
}
