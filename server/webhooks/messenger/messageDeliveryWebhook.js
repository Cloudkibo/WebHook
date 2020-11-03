const TAG = 'webhooks/messenger/deliveryWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')

exports.messageDeliveryWebhook = (payload) => {
  // logger.serverLog(TAG, `in deliveryWebhook ${JSON.stringify(payload)}`, 'debug')
  callApi('messengerEvents/delivery', 'post', payload, 'kiboengage')
    .then((response) => {
      logger.serverLog('Response from KiboEngage', `${TAG}: exports.messageDeliveryWebhook`, {}, {payload, response}, 'debug')
    })
    .catch((err) => {
      const message = err || 'Error from KiboEngage'
      logger.serverLog(message, `${TAG}: exports.messageDeliveryWebhook`, {}, {payload}, 'error')
    })
  callApi('messengerEvents/delivery', 'post', payload, 'kibochat')
    .then((response) => {
      logger.serverLog('Response from KiboChat', `${TAG}: exports.messageDeliveryWebhook`, {}, {payload, response}, 'debug')
    })
    .catch((err) => {
      const message = err || 'Error from KiboChat'
      logger.serverLog(message, `${TAG}: exports.messageDeliveryWebhook`, {}, {payload}, 'error')
    })
}
