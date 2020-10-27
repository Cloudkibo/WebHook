const needle = require('needle')
const { callApi } = require('../../utility/api.caller.service')
const TAG = 'LogicLayer/createNewSubscriber.logiclayer.js'
const logger = require('../../components/logger')
const config = require('../../config/environment/index')
const { updateCompanyUsage } = require('../../global/billingPricing')

exports.getSubscriberInfoFromFB = (sender, pageAccessToken, page) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `https://graph.facebook.com/v6.0/${sender}?fields=gender,first_name,last_name,locale,profile_pic,timezone&access_token=${pageAccessToken}`,
      qs: { access_token: page.accessToken },
      method: 'GET'
    }
    needle.get(options.url, options, (error, response) => {
      logger.serverLog(TAG, `Subscriber response git from facebook: ${JSON.stringify(response.body)}`, 'debug')
      if (error) {
        reject(error)
      } else {
        resolve(response)
      }
    })
  })
}

exports.createSubscriber = (payload, page) => {
  return new Promise((resolve, reject) => {
    callApi('companyprofile/query', 'post', {_id: page.companyId}, 'accounts')
      .then(company => {
        const planUsagePromise = callApi('featureUsage/planQuery', 'post', {planId: company.planId._id}, 'accounts')
        const companyUsagePromise = callApi('featureUsage/companyQuery', 'post', {companyId: company._id}, 'accounts')
        Promise.all([planUsagePromise, companyUsagePromise])
          .then(results => {
            const planUsage = results[0][0]
            const companyUsage = results[1][0]
            if (companyUsage.subscribers >= planUsage.subscribers) {
              payload.disabledByPlan = true
            }
            callApi(`subscribers`, 'post', payload, 'accounts')
              .then(subscriberCreated => {
                updateCompanyUsage(page.companyId, 'subscribers', 1)
                resolve(subscriberCreated)
              })
              .catch(err => reject(err))
          })
          .catch(err => reject(err))
      })
      .catch(err => reject(err))
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
      logger.serverLog(TAG, `company usage incremented successfully`, 'debug')
    })
    .catch(err => {
      logger.serverLog(TAG, `Failed to update company usage ${JSON.stringify(err)}`, 'error')
    })
}

exports.updatePhoneNumberCustomerMatching = (identifier, pageId, companyId) => {
  callApi(`phone/update`, 'post', {query: {number: identifier, pageId: pageId, companyId: companyId}, newPayload: {hasSubscribed: true}, options: {}}, 'accounts')
    .then(phonenumberupdated => {
      logger.serverLog(TAG, `phone number updated successfully ${JSON.stringify(phonenumberupdated)}`, 'debug')
    })
    .catch(err => {
      logger.serverLog(TAG, `Failed to update phone number ${JSON.stringify(err)}`, 'error')
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
  .then(res => logger.serverLog(TAG, `response from sendWebhook ${res}`))
  .catch(err => logger.serverLog(TAG, `Failed to get response from sendWebhook ${JSON.stringify(err)}`, 'error'))
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
    logger.serverLog(TAG, `response recieved from KiboEngage: ${response}`, 'debug')
  })
  .catch((err) => {
    logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
  })
}

const informLandingPageOfSubscriber = (recipientId, senderId, companyId) => {
  callApi('messengerEvents/landingPage', 'post', {
    pageId: recipientId,
    senderId: senderId,
    companyId: companyId
  }, 'kiboengage')
  .then((response) => {
    logger.serverLog(TAG, `response recieved from KiboEngage: ${response}`, 'debug')
  })
  .catch((err) => {
    logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
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

exports.handleSubscribeAgain = (sender, page, subscriberFound) => {
  callApi(`subscribers/update`, 'put', {query: { senderId: sender }, newPayload: {isSubscribed: true, isEnabledByPage: true}, options: {}}, 'accounts')
    .then(subscriber => {
      logger.serverLog(TAG, subscriber, 'debug')
      callApi(`tags/query`, 'post', {tag: `_${page.pageId}_unsubscribe`, defaultTag: true, companyId: page.companyId}, 'accounts')
        .then(unsubscribeTag => {
          unsubscribeTag = unsubscribeTag[0]
          needle('delete', `https://graph.facebook.com/v6.0/${unsubscribeTag.labelFbId}/label?user=${subscriberFound.senderId}&access_token=${page.accessToken}`)
            .then(response => {
              if (response.body.error) {
                logger.serverLog(TAG, `failed to unassigned unsubscribe tag: ${JSON.stringify(response.body.error)}`, 'error')
              } else {
                logger.serverLog(TAG, `unsubscribe tag unassigned successfully!`)
              }
            })
            .catch((err) => {
              logger.serverLog(TAG, `failed to unassigned unsubscribe tag: ${JSON.stringify(err)}`, 'error')
            })
        })
        .catch((err) => {
          logger.serverLog(TAG, `failed to fetch unsubscribe tag: ${err}`, 'error')
        })
    })
    .catch((err) => {
      logger.serverLog(TAG, `failed to update subscriber: ${err}`, 'error')
    })
}
exports.addCompleteInfoOfSubscriber = (subscriber, payload) => {
  payload.completeInfo = true
  callApi(`subscribers/update`, 'put', {query: { _id: subscriber._id }, newPayload: payload, options: {}}, 'accounts')
    .then(updated => {
    })
    .catch((err) => {
      logger.serverLog(TAG, `failed to update subscriber: ${err}`, 'error')
    })
}
exports.updateConversionCount = (postId) => {
  let newPayloadConversionCount = { $inc: { conversionCount: 1 } }
  let newPayloadWaitingReply = { $inc: { waitingReply: -1 } }
  callApi(`comment_capture/update`, 'put', {query: { _id: postId }, newPayload: newPayloadConversionCount, options: {}}, 'accounts')
   .then(updated => {
     logger.serverLog(TAG, `Conversion count updated ${JSON.stringify(updated)}`, 'updated')
   })
   .catch(err => {
     logger.serverLog(TAG, `Failed to update conversion Count ${JSON.stringify(err)}`, 'error')
   })

  callApi(`comment_capture/update`, 'put', {query: { _id: postId }, newPayload: newPayloadWaitingReply, options: {}}, 'accounts')
     .then(updated => {
       logger.serverLog(TAG, `Waiting Reply updated ${JSON.stringify(updated)}`, 'updated')
     })
     .catch(err => {
       logger.serverLog(TAG, `Failed to update Waiting Reply ${JSON.stringify(err)}`, 'error')
     })
}
exports.addSiteInfoForSubscriber = (subscriber, payload, siteInfo) => {
  payload.siteInfo = siteInfo
  callApi(`subscribers/update`, 'put', {query: { _id: subscriber._id }, newPayload: payload, options: {}}, 'accounts')
    .then(updated => {
    })
    .catch((err) => {
      logger.serverLog(TAG, `failed to update subscriber: ${err}`, 'error')
    })
}

exports.checkCommentReply = (subscriberFound, page, payload, body) => {
  updateSubscriberAwaitingReply(subscriberFound._id)
  if (subscriberFound.awaitingCommentReply && subscriberFound.awaitingCommentReply.sendSecondMessage && subscriberFound.awaitingCommentReply.postId) {
    callApi(`comment_capture/query`, 'post', {_id: subscriberFound.awaitingCommentReply.postId}, 'accounts')
      .then(post => {
        console.log('post found')
        post = post[0]
        if (post) {
          if (post.secondReply && post.secondReply.action === 'reply') {
            payload.awaitingCommentReply = subscriberFound.awaitingCommentReply
            payload._id = subscriberFound._id
            callApi('facebookEvents/sendSecondReplyToComment', 'post', {page: page, subscriber: payload, post: post}, 'kiboengage')
              .then((response) => {
                logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
              })
          } else if (post.secondReply && post.secondReply.action === 'subscribe') {
            body.entry[0].messaging[0].postback = {
              payload: JSON.stringify({sequenceId: post.secondReply.sequenceId})
            }
            callApi('messengerEvents/subscribeToSequence', 'post', body, 'kiboengage')
              .then((response) => {
                logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
              })
              .catch((err) => {
                logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
              })
          }
        }
      })
      .catch((err) => {
        logger.serverLog(TAG, `failed to fetch post: ${err}`, 'error')
      })
  }
}
function updateSubscriberAwaitingReply (subscriberId) {
  callApi(`subscribers/update`, 'put', {query: {_id: subscriberId}, newPayload: {'awaitingCommentReply.sendSecondMessage': false}, options: {}}, 'accounts')
    .then(updated => {
    })
    .catch(err => {
      logger.serverLog(TAG, `Failed to udpate subscriber ${JSON.stringify(err)}`, 'error')
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
      logger.serverLog(TAG, `Failed to udpate subscriber ${JSON.stringify(err)}`, 'error')
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
            logger.serverLog(TAG, `Failed to udpate subscriber ${JSON.stringify(err)}`, 'error')
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
            logger.serverLog(TAG, `Failed to udpate subscriber ${JSON.stringify(err)}`, 'error')
          })
      }
    })
    .catch(err => {
      logger.serverLog(TAG, `Failed to udpate subscriber ${JSON.stringify(err)}`, 'error')
    })
}
