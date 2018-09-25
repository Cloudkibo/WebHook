const TAG = 'webhook_subscriptions/messenger/newSubscriberWebhook.js'
const logger = require('../../components/logger')

exports.newSubscriberWebhook = (payload) => {
  logger.serverLog(TAG,
    `in newSubscriberWebhook ${JSON.stringify(payload)}`)
}
