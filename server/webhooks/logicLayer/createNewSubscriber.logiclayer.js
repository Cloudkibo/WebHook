const needle = require('needle')
const { callApi } = require('../../utility/api.caller.service')
const TAG = 'LogicLayer/createNewSubscriber.logiclayer.js'
const logger = require('../../components/logger')
const config = require('../../config/environment/index')

exports.getSubscriberInfoFromFB = (sender, pageAccessToken, page) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `https://graph.facebook.com/v6.0/${sender}?fields=gender,first_name,last_name,locale,profile_pic,timezone&access_token=${pageAccessToken}`,
      qs: { access_token: page.accessToken },
      method: 'GET'
    }
    needle.get(options.url, options, (error, response) => {
      if (error) {
        reject(error)
      } else {
        // handling "This action was not submitted due to new privacy rules in Europe." error
        if (response.body.error && response.body.error.code === 10 && response.body.error.subcode === 2018336) {
          options.url = `https://graph.facebook.com/v6.0/${sender}?fields=gender,first_name,last_name,locale,timezone&access_token=${pageAccessToken}`
          needle.get(options.url, options, (error, response) => {
            if (error) {
              reject(error)
            } else {
              resolve(response)
            }
          })
        } else {
          resolve(response)
        }
      }
    })
  })
}

exports.prepareNewSubscriberPayload = (subscriber, page, subscriberSource, phoneNumber, senderId, ref) => {
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
    payload.siteInfo = ref
  } else if (subscriberSource === 'messaging_referrals') {
    payload.source = `https://m.me/${page._id}?ref=${ref}`
  } else if (subscriberSource === 'landing_page') {
    payload.source = 'landing_page'
  } else if (subscriberSource === 'checkbox_plugin') {
    payload.source = 'checkbox_plugin'
  } else if (subscriberSource === 'shopify') {
    payload.source = 'shopify'
  }
  return payload
}

exports.incrementSubscriberForCompany = (companyId) => {
  callApi(`featureUsage/updateCompany`, 'put', {query: {companyId: companyId}, newPayload: { $inc: { subscribers: 1 } }, options: {}}, 'accounts')
    .then(updated => {
      logger.serverLog(`company usage incremented successfully`, `${TAG}: exports.incrementSubscriberForCompany`, {}, {companyId: companyId}, 'debug')
    })
    .catch(err => {
      const message = err || 'Failed to update company usage'
      logger.serverLog(message, `${TAG}: exports.incrementSubscriberForCompany`, {}, {companyId: companyId}, 'error')
    })
}

exports.updatePhoneNumberCustomerMatching = (identifier, pageId, companyId) => {
  callApi(`phone/update`, 'post', {query: {number: identifier, pageId: pageId, companyId: companyId}, newPayload: {hasSubscribed: true}, options: {}}, 'accounts')
    .then(phonenumberupdated => {
      logger.serverLog(`phone number updated successfully`, `${TAG}: exports.updatePhoneNumberCustomerMatching`, {}, {companyId: companyId, pageId: pageId, identifier: identifier}, 'debug')
    })
    .catch(err => {
      const message = err || 'Failed to update phone number'
      logger.serverLog(message, `${TAG}: exports.updatePhoneNumberCustomerMatching`, {}, {companyId: companyId, pageId: pageId, identifier: identifier}, 'error')
    })
}

exports.sendWebhookForNewSubscriber = (subscriber, page) => {
  let payload = {
    type: 'NEW_SUBSCRIBER',
    platform: 'facebook',
    page: page,
    payload: {
      name: subscriber.firstName + ' ' + subscriber.lastName,
      locale: subscriber.locale,
      timezone: subscriber.timezone,
      gender: subscriber.gender,
      psid: subscriber.senderId,
      profilePic: subscriber.profilePic,
      pageId: page.pageId,
      source: subscriber.source,
      subscriberRefId: subscriber.userRefIdForCheckBox,
      timestamp: Date.now(),
      siteInfo: subscriber.siteInfo,
      livechatUrl: config.env === 'staging'
      ? `https://skibochat.cloudkibo.com/liveChat/${subscriber.firstName}-${subscriber.lastName}-${subscriber.senderId}`
      : `https://kibochat.cloudkibo.com/liveChat/${subscriber.firstName}-${subscriber.lastName}-${subscriber.senderId}`
    }
  }
  callApi('webhooks/sendWebhook', 'post', payload, 'kibochat')
  .then(res => {
    logger.serverLog(`response from sendWebhook ${res}`, `${TAG}: exports.sendWebhookForNewSubscriber`, {}, {subscriber, page}, 'debug')
  })
  .catch(err => {
    const message = err || 'Error response from sendWebhook'
    logger.serverLog(message, `${TAG}: exports.sendWebhookForNewSubscriber`, {}, {subscriber, page}, 'debug')
  })
}

exports.informGrowthTools = (subscriberSource, recipientId, senderId, companyId, referral) => {
  if (subscriberSource === 'messaging_referrals') {
    informMessengerRefUrlOfSubscriber(
      recipientId,
      senderId,
      referral
    )
  }
  if (subscriberSource === 'landing_page') {
    informLandingPageOfSubscriber(
      recipientId,
      senderId,
      companyId
    )
  }
}

const informMessengerRefUrlOfSubscriber = (recipientId, senderId, referral) => {
  callApi('messengerEvents/messagingReferrals', 'post', {
    pageId: recipientId,
    senderId: senderId,
    referral: referral }, 'kiboengage')
  .then((response) => {
    logger.serverLog(`response from KiboEngage ${response}`, `${TAG}: exports.informMessengerRefUrlOfSubscriber`, {}, {recipientId, senderId, referral}, 'debug')
  })
  .catch((err) => {
    const message = err || 'Error response from KiboEngage'
    logger.serverLog(message, `${TAG}: exports.informMessengerRefUrlOfSubscriber`, {}, {recipientId, senderId, referral}, 'error')
  })
}

const informLandingPageOfSubscriber = (recipientId, senderId, companyId) => {
  callApi('messengerEvents/landingPage', 'post', {
    pageId: recipientId,
    senderId: senderId,
    companyId: companyId
  }, 'kiboengage')
  .then((response) => {
    logger.serverLog(`response from KiboEngage ${response}`, `${TAG}: exports.informLandingPageOfSubscriber`, {}, {recipientId, senderId, companyId}, 'debug')
  })
  .catch((err) => {
    const message = err || 'Error response from KiboEngage'
    logger.serverLog(message, `${TAG}: exports.informLandingPageOfSubscriber`, {}, {recipientId, senderId, companyId}, 'error')
  })
}

exports.updateList = (phoneNumber, sender, page) => {
  callApi(`phone/query`, 'post', {number: phoneNumber, hasSubscribed: true, pageId: page, companyId: page.companyId}, 'accounts')
    .then(number => {
      if (number.length > 0) {
        let subscriberFindCriteria = {
          source: 'customer_matching',
          senderId: sender,
          isSubscribed: true,
          phoneNumber: phoneNumber,
          pageId: page._id
        }
        callApi(`subscribers/query`, 'post', subscriberFindCriteria, 'accounts')
          .then(subscribers => {
            let temp = []
            for (let i = 0; i < subscribers.length; i++) {
              temp.push(subscribers[i]._id)
            }
            callApi(`lists/update`, 'put', {query: { listName: number[0].fileName, companyId: page.companyId }, newPayload: {content: temp}, options: {}}, 'accounts')
              .then(savedList => {
                logger.serverLog(`list updated successfully ${JSON.stringify(savedList)}`, `${TAG}: exports.updateList`, {}, {phoneNumber, sender, page}, 'debug')
              })
              .catch(err => {
                const message = err || 'Failed to update list'
                logger.serverLog(message, `${TAG}: exports.updateList`, {}, {phoneNumber, sender, page}, 'error')
              })
          })
          .catch(err => {
            const message = err || 'Failed to update subscriber'
            logger.serverLog(message, `${TAG}: exports.updateList`, {}, {phoneNumber, sender, page}, 'error')
          })
      }
    })
}

exports.handleSubscribeAgain = (sender, page, subscriberFound) => {
  callApi(`subscribers/update`, 'put', {query: { senderId: sender }, newPayload: {isSubscribed: true, isEnabledByPage: true}, options: {}}, 'accounts')
    .then(subscriber => {
      logger.serverLog('Subcriber isSubscribed Updated', `${TAG}: exports.handleSubscribeAgain`, {}, {sender, page, subscriber: subscriberFound}, 'info')
    })
    .catch((err) => {
      const message = err || 'failed to update subscriber'
      logger.serverLog(message, `${TAG}: exports.handleSubscribeAgain`, {}, {sender, page, subscriber: subscriberFound}, 'error')
    })
}
exports.addCompleteInfoOfSubscriber = (subscriber, payload) => {
  payload.completeInfo = true
  callApi(`subscribers/update`, 'put', {query: { _id: subscriber._id }, newPayload: payload, options: {}}, 'accounts')
    .then(updated => {
    })
    .catch((err) => {
      const message = err || 'failed to update subscriber'
      logger.serverLog(message, `${TAG}: exports.addCompleteInfoOfSubscriber`, {}, {payload, subscriber}, 'error')
    })
}
exports.updateConversionCount = (postId) => {
  let newPayloadConversionCount = { $inc: { conversionCount: 1 } }
  let newPayloadWaitingReply = { $inc: { waitingReply: -1 } }
  callApi(`comment_capture/update`, 'put', {query: { _id: postId }, newPayload: newPayloadConversionCount, options: {}}, 'accounts')
   .then(updated => {
     logger.serverLog('Conversion count updated', `${TAG}: exports.updateConversionCount`, {}, {postId}, 'debug')
   })
   .catch(err => {
     const message = err || 'failed to update conversion count'
     logger.serverLog(message, `${TAG}: exports.updateConversionCount`, {}, {postId}, 'error')
   })

  callApi(`comment_capture/update`, 'put', {query: { _id: postId }, newPayload: newPayloadWaitingReply, options: {}}, 'accounts')
    .then(updated => {
      logger.serverLog('Waiting Reply updated', `${TAG}: exports.updateConversionCount`, {}, {postId}, 'debug')
    })
    .catch(err => {
      const message = err || 'failed to update waiting reply'
      logger.serverLog(message, `${TAG}: exports.updateConversionCount`, {}, {postId}, 'error')
    })
}
exports.addSiteInfoForSubscriber = (subscriber, payload, siteInfo, senderId) => {
  if (siteInfo) {
    payload.siteInfo = siteInfo
  }
  payload.source = 'chat_plugin'
  callApi(`subscribers/update`, 'put', {query: { _id: subscriber._id }, newPayload: payload, options: { upsert: true }}, 'accounts')
    .then(updated => {
    })
    .catch((err) => {
      const message = err || 'failed to update subscriber'
      logger.serverLog(message, `${TAG}: exports.addSiteInfoForSubscriber`, {}, {payload, subscriber}, 'error')
    })
}

exports.checkCommentReply = (subscriberFound, page, payload, body) => {
  updateSubscriberAwaitingReply(subscriberFound._id)
  if (subscriberFound.awaitingCommentReply && subscriberFound.awaitingCommentReply.sendSecondMessage && subscriberFound.awaitingCommentReply.postId) {
    callApi(`comment_capture/query`, 'post', {_id: subscriberFound.awaitingCommentReply.postId}, 'accounts')
      .then(post => {
        post = post[0]
        if (post) {
          if (post.secondReply && post.secondReply.action === 'reply') {
            payload.awaitingCommentReply = subscriberFound.awaitingCommentReply
            payload._id = subscriberFound._id
            callApi('facebookEvents/sendSecondReplyToComment', 'post', {page: page, subscriber: payload, post: post}, 'kiboengage')
              .then((response) => {
                logger.serverLog('Response sendSecondReplyToComment from KiboEngage', `${TAG}: exports.checkCommentReply`, {}, {subscriberFound, page, payload, body}, 'debug')
              })
          } else if (post.secondReply && post.secondReply.action === 'subscribe') {
            body.entry[0].messaging[0].postback = {
              payload: JSON.stringify({sequenceId: post.secondReply.sequenceId})
            }
            callApi('messengerEvents/subscribeToSequence', 'post', body, 'kiboengage')
              .then((response) => {
                logger.serverLog('Response subscribeToSequence from KiboEngage', `${TAG}: exports.checkCommentReply`, {}, {subscriberFound, page, payload, body}, 'debug')
              })
              .catch((err) => {
                const message = err || 'Error from KiboEngage Subscribe to Sequence'
                logger.serverLog(message, `${TAG}: exports.checkCommentReply`, {}, {subscriberFound, page, payload, body}, 'error')
              })
          }
        }
      })
      .catch((err) => {
        const message = err || 'Failed to fetch post'
        logger.serverLog(message, `${TAG}: exports.checkCommentReply`, {}, {subscriberFound, page, payload, body}, 'error')
      })
  }
}
function updateSubscriberAwaitingReply (subscriberId) {
  callApi(`subscribers/update`, 'put', {query: {_id: subscriberId}, newPayload: {'awaitingCommentReply.sendSecondMessage': false}, options: {}}, 'accounts')
    .then(updated => {
    })
    .catch(err => {
      const message = err || 'Failed to update subscriber'
      logger.serverLog(message, `${TAG}: exports.updateSubscriberAwaitingReply`, {}, {subscriberId}, 'error')
    })
}
exports.handleNewsSubscriptionForNewSubscriber = (subscriber) => {
  let query = {
    purpose: 'updateAll',
    match: {companyId: subscriber.companyId, defaultFeed: true},
    updated: {$inc: {subscriptions: 1}}
  }
  callApi(`newsSections`, 'put', query, 'engageDbLayer')
    .then(updated => {
    })
    .catch(err => {
      const message = err || 'Failed to update subscriber'
      logger.serverLog(message, `${TAG}: exports.handleNewsSubscriptionForNewSubscriber`, {}, {subscriber}, 'error')
    })
}
exports.handleNewsSubscriptionForOldSubscriber = (subscriber) => {
  let findQuery = {
    purpose: 'findAll',
    match: {companyId: subscriber.companyId, defaultFeed: true}
  }
  callApi(`newsSections/query`, 'post', findQuery, 'engageDbLayer')
    .then(newsSections => {
      if (newsSections.length > 0) {
        let newsSectionIds = newsSections.map(n => n._id)
        let updateQuery = {
          purpose: 'updateAll',
          match: {'subscriberId._id': subscriber._id, subscription: false, newsSectionId: {$in: newsSectionIds}},
          updated: {subscription: true}
        }
        callApi(`newsSubscriptions`, 'put', updateQuery, 'engageDbLayer')
          .then(updated => {
          })
          .catch(err => {
            const message = err || 'Failed to update newsSubscriptions'
            logger.serverLog(message, `${TAG}: exports.handleNewsSubscriptionForOldSubscriber`, {}, {subscriber}, 'error')
          })
        let updatedQuery = {
          purpose: 'updateAll',
          match: {_id: {$in: newsSectionIds}},
          updated: {$inc: {subscriptions: 1}}
        }
        callApi(`newsSections`, 'put', updatedQuery, 'engageDbLayer')
          .then(updated => {
          })
          .catch(err => {
            const message = err || 'Failed to update newsSections'
            logger.serverLog(message, `${TAG}: exports.handleNewsSubscriptionForOldSubscriber`, {}, {subscriber}, 'error')
          })
      }
    })
    .catch(err => {
      const message = err || 'Failed to fetch newsSections'
      logger.serverLog(message, `${TAG}: exports.handleNewsSubscriptionForOldSubscriber`, {}, {subscriber}, 'error')
    })
}
