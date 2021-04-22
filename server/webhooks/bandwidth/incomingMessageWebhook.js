const { callApi } = require('../../utility/api.caller.service')
const TAG = '/webhooks/bandwidth/incomingMessageWebhook.js'
const logger = require('../../components/logger')

exports.incomingMessageWebhook = function (payload) {
  let data = {
    provider: 'bandwidth',
    type: 'incoming_message',
    payload
  }
  callApi(`smsEvents/handleIncomingMessage`, 'post', data, 'kibochat')
    .then()
    .catch(err => {
      const message = err || 'Error at incomingMessageWebhook'
      logger.serverLog(message, `${TAG}: exports.incomingMessageWebhook`, {}, {payload}, 'error')
    })
}
