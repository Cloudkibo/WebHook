const TAG = 'webhook_subscriptions/wordpress/webhook.js'
const logger = require('../../components/logger')
const callApi = require('../../utility/api.caller.service')

exports.publishPost = (payload) => {
  logger.serverLog(TAG, `in publishPostWebhook ${JSON.stringify(payload)}`)
  callApi.callApi('wordpressEvents/wordpress', 'post', payload)
}
