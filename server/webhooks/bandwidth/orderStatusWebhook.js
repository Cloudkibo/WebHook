const { callApi } = require('../../utility/api.caller.service')
const TAG = '/webhooks/bandwidth/incomingMessageWebhook.js'
const logger = require('../../components/logger')

exports.orderStatusWebhook = function (payload) {
  let data = {
    provider: 'bandwidth',
    type: 'order_status',
    payload
  }
  callApi(`smsEvents/handleOrderStatus`, 'post', data, 'kibochat')
    .then()
    .catch(err => {
      const message = err || 'Error at handleOrderStatus'
      logger.serverLog(message, `${TAG}: exports.orderStatusWebhook`, {}, {payload}, 'error')
    })
}
