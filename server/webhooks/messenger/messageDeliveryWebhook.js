const TAG = 'webhooks/messenger/deliveryWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')

exports.messageDeliveryWebhook = (payload) => {
  // logger.serverLog(TAG, `in deliveryWebhook ${JSON.stringify(payload)}`, 'debug')
  callApi('messengerEvents/delivery', 'post', payload, 'kiboengage')
    .then((response) => {
      logger.serverLog(TAG, `response recieved from KiboEngage: ${response}`, 'debug')
    })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboEngage: ${err}`, 'error')
    })
}
