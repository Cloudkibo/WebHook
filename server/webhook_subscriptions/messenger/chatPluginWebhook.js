const TAG = 'webhook_subscriptions/messenger/chatPluginWebhook.js'
const logger = require('../../components/logger')

exports.chatPluginWebhook = (payload) => {
  logger.serverLog(TAG,
    `in chatPluginWebhook ${JSON.stringify(payload)}`)
}
