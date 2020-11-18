const TAG = 'webhooks/messenger/getStartedWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')
const { newSubscriberWebhook } = require('./newSubscriberWebhook.js')
const { createNewSubscriber } = require('../logicLayer/createNewSubscriber.js')

exports.getStartedWebhook = (payload) => {
  logger.serverLog('In get started webhook', `${TAG}: exports.getStartedWebhook`, {}, {payload}, 'debug')
  if (payload.entry[0].messaging[0].postback && payload.entry[0].messaging[0].postback.referral) {
    payload.entry[0].messaging[0].referral = payload.entry[0].messaging[0].postback.referral
    const event = payload.entry[0].messaging[0]
    const senderId = event.message && event.message.is_echo ? event.recipient.id : event.sender.id
    const pageId = event.message && event.message.is_echo ? event.sender.id : event.recipient.id
    createNewSubscriber(pageId, senderId, 'messaging_referrals', '', null, event)
  } else {
    sendWelcomeMessage(payload)
  }
}

function _sendWelcomeMessage(payload) {
  callApi('messengerEvents/welcomeMessage', 'post', payload, 'kiboengage')
  .then((response) => {
    logger.serverLog('Response from KiboEngage', `${TAG}: exports.sendWelcomeMessage`, {}, {payload}, 'debug')
  })
  .catch((err) => {
    const message = err || 'Error response from KiboEngage'
    logger.serverLog(message, `${TAG}: exports.sendWelcomeMessage`, {}, {payload}, 'error')
  })
  callApi('messengerEvents/welcomeMessage', 'post', payload, 'kibochat')
  .then((response) => {
    logger.serverLog('Response from KiboChat', `${TAG}: exports.sendWelcomeMessage`, {}, {payload}, 'debug')
  })
  .catch((err) => {
    const message = err || 'Error response from KiboChat'
    logger.serverLog(message, `${TAG}: exports.sendWelcomeMessage`, {}, {payload}, 'error')
  })
}

function sendWelcomeMessage (payload) {
  const sender = payload.entry[0].messaging[0].sender.id
  const pageId = payload.entry[0].messaging[0].recipient.id
  callApi(`pages/query`, 'post', { pageId: pageId, connected: true }, 'accounts')
    .then(page => {
      page = page[0]
      if (page) {
        callApi(`subscribers/query`, 'post', { pageId: page._id, senderId: sender, companyId: page.companyId }, 'accounts')
          .then(subscriber => {
            subscriber = subscriber[0]
            if (!subscriber) {
              newSubscriberWebhook(prepareSubscriberPayload(sender, pageId))
              .then(sub => {
                _sendWelcomeMessage(payload)
              }).catch((err) => {
                let severity = 'error'
                if (err.code && err.code === 190) {
                  err = err.message ? err.message : err
                  severity = 'info'
                }
                const message = err || 'Error in setting up welcome message'
                logger.serverLog(message, `${TAG}: exports.newSubscriberWebhook`, {}, {payload}, severity)
              })
            }
            else {
              payload.subscriber = subscriber
              payload.page = page
              _sendWelcomeMessage(payload)
            }
          })
          .catch(err => {
            const message = err || 'Failed to fetch subscriber'
            logger.serverLog(message, `${TAG}: exports.sendWelcomeMessage`, {}, {payload}, 'error')
          })
      }
    })
    .catch(err => {
      const message = err || 'Failed to fetch page'
      logger.serverLog(message, `${TAG}: exports.sendWelcomeMessage`, {}, {payload}, 'error')
    })
}

function prepareSubscriberPayload (senderId, pageId) {
  let data = {
    entry: [{
      messaging: [{
        sender: {id: senderId},
        recipient: {id: pageId},
        message: {text: 'Get Started'},
        type: 'get_started'
      }]
    }]
  }
  return data
}
