const TAG = 'webhook_subscriptions/messenger/getStartedWebhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')
const logicLayer = require('./logiclayer')
const request = require('request')
const needle = require('needle')

exports.getStartedWebhook = (payload) => {
  logger.serverLog(TAG, `in getStartedWebhook ${JSON.stringify(payload)}`)
  if (payload.entry[0].messaging[0].postback.referral) {
    // This will send postback referal for messenger code
    logger.serverLog(TAG, `in Messenger ${JSON.stringify(payload)}`)
    callApi.callApi('messenger_code/webhook', 'post', payload.entry[0].messaging[0], 'accounts')
  }

  if (payload.entry[0].messaging[0].postback.payload !== '<GET_STARTED_PAYLOAD>') {
    logger.serverLog(TAG,
      `in surveyResponseWebhook ${JSON.stringify(payload)}`)
    let resp = ''
    if (isJsonString(payload.entry[0].messaging[0].postback.payload)) {
      resp = JSON.parse(payload.entry[0].messaging[0].postback.payload)
    } else {
      resp = payload.entry[0].messaging[0].postback.payload
    }
    logger.serverLog(TAG,
      `Payload Response ${JSON.stringify(resp)}`)
    var jsonAdPayload = resp.split('-')
    if (resp.survey_id) {
      logger.serverLog(TAG,
        `in surveyResponseWebhook ${JSON.stringify(payload)}`)
      callApi.callApi('messengerEvents/surveyResponse', 'post', payload, 'kiboengage')
    } else if (resp.unsubscribe) {
      handleUnsubscribe(resp, payload.entry[0].messaging[0])
    } else if (resp.action === 'subscribe') {
      callApi.callApi('messengerEvents/subscribeToSequence', 'post', payload, 'kiboengage')
    } else if (resp.action === 'unsubscribe') {
      callApi.callApi('messengerEvents/unsubscribeFromSequence', 'post', payload, 'kiboengage')
    } else if (jsonAdPayload.length > 0 && jsonAdPayload[0] === 'JSONAD') {
      var jsonMessageId = jsonAdPayload[1]
      callApi.callApi(`jsonAd/jsonAdResponse/${jsonMessageId}`, 'get', {}, 'accounts')
        .then((response) => {
          sendResponseMessage(payload, response)
        })
        .catch(err => {
          logger.serverLog(TAG, `error from accounts jsonAdResponse: ${err}`)
        })
    } else {
      callApi.callApi('messengerEvents/menu', 'post', payload, 'accounts')
    }
  } else if (payload.entry[0].messaging[0].postback.payload === '<GET_STARTED_PAYLOAD>') {
    logger.serverLog(TAG,
      `in getStartedWebhook ${JSON.stringify(payload)}`)
    sendWelcomeMessage(payload)
  }
}

function sendWelcomeMessage (payload) {
  const sender = payload.entry[0].messaging[0].sender.id
  const pageId = payload.entry[0].messaging[0].recipient.id
  callApi.callApi(`pages/query`, 'post', { pageId: pageId, connected: true }, 'accounts')
    .then(page => {
      page = page[0]
      callApi.callApi(`subscribers/query`, 'post', { pageId: page._id, senderId: sender }, 'accounts')
        .then(subscriber => {
          subscriber = subscriber[0]
          if (page.welcomeMessage) {
            for (let i = 0; i < page.welcomeMessage.length; i++) {
              let messageData = logicLayer.prepareSendAPIPayload(subscriber.senderId, page.welcomeMessage[i], subscriber.firstName, subscriber.lastName, true)
              request(
                {
                  'method': 'POST',
                  'json': true,
                  'formData': messageData,
                  'uri': 'https://graph.facebook.com/v2.6/me/messages?access_token=' +
                    subscriber.pageId.accessToken
                },
                (err, res) => {
                  if (err) {
                  } else {
                    if (res.statusCode !== 200) {
                      logger.serverLog(TAG,
                        `At send message landingPage ${JSON.stringify(
                          res.body.error)}`)
                    }
                  }
                })
            }
          }
        })
        .catch(err => {
          logger.serverLog(TAG, `Failed to fetch subscriber ${JSON.stringify(err)}`)
        })
    })
    .catch(err => {
      logger.serverLog(TAG, `Failed to fetch page ${JSON.stringify(err)}`)
    })
}
function handleUnsubscribe (resp, req) {
  let messageData = {}
  if (resp.action === 'yes') {
    messageData = {
      text: 'You have unsubscribed from our broadcasts. Send "start" to subscribe again.'
    }
    callApi.callApi(`subscribers/update`, 'put', {query: { senderId: req.sender.id }, newPayload: { isSubscribed: false }, options: {}}, 'accounts')
      .then(updated => {
        logger.serverLog(TAG, `updated subscriber: ${JSON.stringify(updated)}`)
        callApi.callApi(`subscribers/query`, 'post', { senderId: req.sender.id }, 'accounts')
          .then(subscribers => {
            let subscriber = subscribers[0]
            logger.serverLog(TAG, `subscriber fetched ${JSON.stringify(subscriber)}`)
            callApi.callApi('featureUsage/updatePlanUsage', 'put', {query: {companyId: subscriber.companyId}, newPayload: { $inc: { subscribers: -1 } }, options: {}}, 'accounts')
              .then(updated => {
                logger.serverLog(TAG, `company usage incremented succssfully ${JSON.stringify(updated)}`)
              })
              .catch(err => {
                logger.serverLog(TAG, `Failed to update company usage ${JSON.stringify(err)}`)
              })
          })
          .catch(err => {
            logger.serverLog(TAG, `Failed to fetch subscriber ${JSON.stringify(err)}`)
          })
      })
      .catch(err => {
        logger.serverLog(TAG, `Failed to update subscriber ${JSON.stringify(err)}`)
      })
  } else {
    messageData = {
      text: 'You can unsubscribe anytime by saying stop.'
    }
  }
  needle.get(
    `https://graph.facebook.com/v2.10/${req.recipient.id}?fields=access_token&access_token=${resp.userToken}`,
    (err3, response) => {
      if (err3) {
        logger.serverLog(TAG,
          `Page token error from graph api ${JSON.stringify(err3)}`)
      }
      const data = {
        messaging_type: 'RESPONSE',
        recipient: JSON.stringify({ id: req.sender.id }), // this is the subscriber id
        message: messageData
      }
      needle.post(
        `https://graph.facebook.com/v2.6/me/messages?access_token=${response.body.access_token}`,
        data, (err4, respp) => {
          logger.serverLog(TAG, `ressp.body ${JSON.stringify(respp.body)}`)
          logger.serverLog(TAG,
            `Sending unsubscribe confirmation response to subscriber  ${JSON.stringify(
              respp.body)}`)
        })
    })
}

function sendResponseMessage (payload, response) {
  const sender = payload.entry[0].messaging[0].sender.id
  const pageId = payload.entry[0].messaging[0].recipient.id
  callApi.callApi(`pages/query`, 'post', { pageId: pageId, connected: true }, 'accounts')
    .then(page => {
      page = page[0]
      callApi.callApi(`subscribers/query`, 'post', { pageId: page._id, senderId: sender }, 'accounts')
        .then(subscriber => {
          subscriber = subscriber[0]
          if (response.messageContent) {
            for (let i = 0; i < response.messageContent.length; i++) {
              let messageData = logicLayer.prepareSendAPIPayload(subscriber.senderId, response.messageContent[i], subscriber.firstName, subscriber.lastName, true)
              request(
                {
                  'method': 'POST',
                  'json': true,
                  'formData': messageData,
                  'uri': 'https://graph.facebook.com/v2.6/me/messages?access_token=' +
                    subscriber.pageId.accessToken
                },
                (err, res) => {
                  if (err) {
                    console.log(`At send jsonAd response ${JSON.stringify(err)}`)
                  } else {
                    console.log('res', res.body)
                    if (res.statusCode !== 200) {
                      logger.serverLog(TAG,
                        `At send message jsonAd response ${JSON.stringify(
                          res.body.error)}`)
                    }
                  }
                })
            }
          }
        })
        .catch(err => {
          logger.serverLog(TAG, `Failed to fetch subscriber ${JSON.stringify(err)}`)
        })
    })
    .catch(err => {
      logger.serverLog(TAG, `Failed to fetch page ${JSON.stringify(err)}`)
    })
}
function isJsonString (str) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}
