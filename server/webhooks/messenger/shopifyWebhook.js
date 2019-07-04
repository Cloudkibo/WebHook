const TAG = 'webhooks/messenger/shopifyAndAdminWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')

exports.shopifyWebhook = (payload) => {
  logger.serverLog(TAG, `in shopifyWebhook ${JSON.stringify(payload)}`)
  callApi('messengerEvents/shopify', 'post', payload, 'kiboengage')
    .then((response) => {
      logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
    })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
    })
}
