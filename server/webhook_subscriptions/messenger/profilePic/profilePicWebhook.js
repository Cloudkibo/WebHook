const TAG = 'webhook_subscriptions/messenger/profilePicWebhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')

exports.profilePicWebhook = (payload) => {
  logger.serverLog(TAG,
    `in profilePicWebhook ${JSON.stringify(payload)}`)
}
