const TAG = 'webhook_subscriptions/messenger/seenWebhook.js'
const logger = require('../../components/logger')
const callApi = require('../../utility/api.caller.service')

exports.seenWebhook = (payload) => {
  logger.serverLog(TAG,
    `in seenWebhook ${JSON.stringify(payload)}`)
  callApi.callApi('messengerEvents/seen', 'post', payload)
}
