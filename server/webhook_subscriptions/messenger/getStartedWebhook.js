const TAG = 'webhook_subscriptions/messenger/getStartedWebhook.js'
const logger = require('../../components/logger')

exports.getStartedWebhook = (payload) => {
  logger.serverLog(TAG,
    `in getStartedWebhook ${JSON.stringify(payload)}`)
}
