const TAG = 'webhook_subscriptions/messenger/surveyResponseWebhook.js'
const logger = require('../../components/logger')

exports.surveyResponseWebhook = (payload) => {
  logger.serverLog(TAG,
    `in surveyResponseWebhook ${JSON.stringify(payload)}`)
}
