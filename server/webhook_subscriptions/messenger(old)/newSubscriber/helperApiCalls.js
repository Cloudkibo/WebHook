const callApi = require('../../../utility/api.caller.service')
const TAG = 'webhook_subscriptions/messenger/helperApiCalls.js'
const logger = require('../../../components/logger')
const needle = require('needle')

exports.informMessengerRefUrlOfSubscriber = (recipientId, senderId, referral) => {
  callApi.callApi('messengerEvents/messagingReferrals', 'post', {
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

exports.informLandingPageOfSubscriber = (recipientId, senderId, companyId) => {
  callApi.callApi('messengerEvents/landingPage', 'post', {
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

exports.handleSubscribeAgain = (sender, page, subscriberFound) => {
  callApi.callApi(`subscribers/update`, 'put', {query: { senderId: sender }, newPayload: {isSubscribed: true, isEnabledByPage: true}, options: {}}, 'accounts')
    .then(subscriber => {
      logger.serverLog(TAG, subscriber, 'debug')
      callApi.callApi(`tags/query`, 'post', {tag: `_${page.pageId}_unsubscribe`, defaultTag: true, companyId: page.companyId}, 'accounts')
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

exports.incrementSubscriberForCompany = (companyId) => {
  callApi.callApi(`featureUsage/updateCompany`, 'put', {query: {companyId: companyId}, newPayload: { $inc: { subscribers: 1 } }, options: {}}, 'accounts')
    .then(updated => {
      logger.serverLog(TAG, `company usage incremented successfully`, 'debug')
    })
    .catch(err => {
      logger.serverLog(TAG, `Failed to update company usage ${JSON.stringify(err)}`, 'error')
    })
}

exports.updatePhoneNumberCustomerMatching = (identifier, pageId, companyId) => {
  callApi.callApi(`phone/update`, 'post', {query: {number: identifier, pageId: pageId, companyId: companyId}, newPayload: {hasSubscribed: true}, options: {}}, 'accounts')
    .then(phonenumberupdated => {
      logger.serverLog(TAG, `phone number updated successfully ${JSON.stringify(phonenumberupdated)}`, 'debug')
    })
    .catch(err => {
      logger.serverLog(TAG, `Failed to update phone number ${JSON.stringify(err)}`, 'error')
    })
}

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
