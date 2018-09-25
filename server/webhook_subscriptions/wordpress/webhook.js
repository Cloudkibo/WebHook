const TAG = 'webhook_subscriptions/wordpress/shopifyWebhook.js'
const logger = require('../../components/logger')
const callApi = require('../../utility/api.caller.service')

exports.publishPostWebhook = (payload) => {
  logger.serverLog(TAG, `in publishPostWebhook ${JSON.stringify(payload)}`)
  callApi.callApi('/wordpressEvents/publishPost', 'post', payload)
}
