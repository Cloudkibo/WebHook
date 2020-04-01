const { callApi } = require('../../utility/api.caller.service')
const TAG = 'LogicLayer/createNewSubscriber.js'
const logger = require('../../components/logger')
const Global = require('../../global/global.js')
const LogicLayer = require('./createNewSubscriber.logiclayer.js')

exports.createNewSubscriber = (pageId, senderId, subscriberSource, identifier, ref, event, fullPayload) => {
  callApi(`pages/query`, 'post', { pageId: pageId, connected: true }, 'accounts')
    .then(pages => {
      let page = pages[0]
      console.log('page', page)
      if (page) {
        if (subscriberSource === 'customer_matching') {
          LogicLayer.updatePhoneNumberCustomerMatching(identifier, page._id, page.companyId)
        }
        Global.getRefreshedPageAccessToken(page.pageId, page.accessToken)
          .then(pageAccessToken => {
            console.log('pageAccessToken', pageAccessToken)
            LogicLayer.getSubscriberInfoFromFB(senderId, pageAccessToken, page)
              .then(response => {
                console.log('response from facebook', response.body)
                if (response.body.error) {
                  logger.serverLog(TAG, `Error occured while fetching subscriber details from facebook ${JSON.stringify(response.body.error)}`)
                } else {
                  const subscriber = response.body
                  const payload = LogicLayer.prepareNewSubscriberPayload(subscriber, page, subscriberSource, identifier, senderId, ref)
                  if (subscriberSource === 'checkbox_plugin' || subscriberSource === 'shopify') {
                    payload.userRefIdForCheckBox = identifier
                  }
                  callApi(`subscribers/query`, 'post', {senderId: senderId, pageId: page._id}, 'accounts')
                    .then(subscriberFound => {
                      console.log('subscriberFound', subscriberFound)
                      if (subscriberFound.length === 0) {
                        callApi(`subscribers`, 'post', payload, 'accounts')
                          .then(subscriberCreated => {
                            if (subscriberSource === 'checkbox_plugin' || subscriberSource === 'shopify') {
                              LogicLayer.sendWebhookForNewSubscriber(
                                page.pageId,
                                page.companyId,
                                identifier,
                                subscriber,
                                subscriberCreated._id
                              )
                            }
                            LogicLayer.assignDefaultTags(page, subscriberCreated)
                            LogicLayer.handleNewsSubscriptionForNewSubscriber(subscriberCreated)
                            callApi(`messengerEvents/sequence/subscriberJoins`, 'post', {companyId: page.companyId, senderId: senderId, pageId: page._id}, 'kiboengage')
                              .then(seqRes => logger.serverLog(TAG, `response from sequence subscriberJoins ${seqRes}`))
                              .catch(err => logger.serverLog(TAG, `Failed to get response from sequence subscriberJoins ${JSON.stringify(err)}`, 'error'))
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
                            callApi('messengerEvents/sessions', 'post', {page: page, subscriber: subscriberCreated, event: event}, 'kibochat')
                            .then(sessRes => logger.serverLog(TAG, `response from sessions ${sessRes}`))
                            .catch(err => logger.serverLog(TAG, `Failed to get response from sessions ${JSON.stringify(err)}`, 'error'))
                          })
                          .catch(err => {
                            logger.serverLog(TAG, `Failed to create subscriber ${JSON.stringify(err)}`, 'error')
                          })
                      } else {
                        subscriberFound = subscriberFound[0]
                        if (event.message && !event.message.is_echo) {
                          if (subscriberFound.waitingForUserInput && subscriberFound.waitingForUserInput.componentIndex !== -1) {
                            callApi('messengerEvents/userInput', 'post', {payload: payload, message: event.message}, 'kiboengage')
                            .then((response) => {
                              logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
                            })
                            .catch((err) => {
                              logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
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
                          LogicLayer.addSiteInfoForSubscriber(subscriberFound, payload, ref)
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
                        if (!subscriberFound.isSubscribed) {
                          // subscribing the subscriber again in case he
                          // or she unsubscribed and removed chat
                          var messageText = ''
                          if (event.message) {
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
                          .then(sessRes => logger.serverLog(TAG, `response from sessions ${sessRes}`))
                          .catch(err => logger.serverLog(TAG, `Failed to get response from sessions ${JSON.stringify(err)}`, 'error'))
                      }
                    })
                    .catch(err => {
                      logger.serverLog(TAG, `Failed to fetch subscriber ${err}`, 'error')
                    })
                }
              })
              .catch(err => {
                logger.serverLog(TAG, `Failed to refresh access token ${JSON.stringify(err)}`, 'error')
              })
          })
          .catch(err => {
            logger.serverLog(TAG, `Failed to refresh access token ${JSON.stringify(err)}`, 'error')
          })
      }
    })
    .catch(err => {
      logger.serverLog(TAG, `Failed to fetch pages ${JSON.stringify(err)}`, 'error')
    })
}
