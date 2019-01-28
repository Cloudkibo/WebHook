const TAG = 'webhook_subscriptions/messenger/policyWebhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')

exports.policyWebhook = (payload) => {
  logger.serverLog(TAG,
    `in policyWebhook ${JSON.stringify(payload)}`)
}
