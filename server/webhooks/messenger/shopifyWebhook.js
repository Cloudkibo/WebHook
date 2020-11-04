const TAG = 'webhooks/messenger/shopifyAndAdminWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')

exports.shopifyWebhook = (payload) => {
  // logger.serverLog(TAG, `in shopifyWebhook ${JSON.stringify(payload)}`)
  callApi('messengerEvents/shopify', 'post', payload, 'kiboengage')
    .then((response) => {
      logger.serverLog('Response from KiboEngage', `${TAG}: exports.shopifyWebhook`, {}, {payload, response}, 'debug')
    })
    .catch((err) => {
      const message = err || 'Error response from KiboEngage'
      logger.serverLog(message, `${TAG}: exports.shopifyWebhook`, {}, {payload}, 'error')
    })
}
