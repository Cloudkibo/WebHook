const { callApi } = require('../../utility/api.caller.service')
const TAG = '/webhooks/bandwidth/incomingMessageWebhook.js'
const logger = require('../../components/logger')

exports.messageDeliveryWebhook = function (payload) {
  let data = {
    provider: 'bandwidth',
    type: 'message_delivered',
    payload
  }
  callApi(`smsEvents/handleMessageDelivery`, 'post', data, 'kibochat')
    .then()
    .catch(err => {
      const message = err || 'Error at handleMessageDelivery'
      logger.serverLog(message, `${TAG}: exports.messageDeliveryWebhook`, {}, {payload}, 'error')
    })
}
