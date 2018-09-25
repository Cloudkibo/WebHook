const TAG = 'webhook_subscriptions/messenger/customerMatchingWebhook.js'
const logger = require('../../components/logger')

exports.customerMatchingWebhook = (payload) => {
  logger.serverLog(TAG,
    `in customerMatchingWebhook ${JSON.stringify(payload)}`)
}
