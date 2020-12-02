const TAG = 'webhooks/messenger/chatbotWebhook'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')
const { createNewSubscriber } = require('../logicLayer/createNewSubscriber.js')

exports.chatbotWebhook = (payload) => {
  const event = payload.entry[0].messaging[0]
  const pageId = payload.entry[0].messaging[0].recipient.id
  const senderId = payload.entry[0].messaging[0].sender.id
  createNewSubscriber(pageId, senderId, 'direct_message', '', null, event)
    .then(response => {
      callApi('messengerEvents/chatbotOptin', 'post', payload, 'kibochat')
      .then((response) => {
        logger.serverLog('Response from KiboChat', `${TAG}: exports.chatbotWebhook`, {}, {payload, response}, 'info')
      })
      .catch((err) => {
        const message = err || 'Error from KiboChat'
        logger.serverLog(message, `${TAG}: exports.chatbotWebhook`, {}, {payload}, 'error')
      })
    })
    .catch(err => {
      // err would have been sent to sentry before coming to this catch.
      // So, we don't need to send the error to sentry here.
      console.log(err)
    })
}
