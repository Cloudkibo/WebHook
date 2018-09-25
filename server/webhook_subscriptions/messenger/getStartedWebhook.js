const TAG = 'webhook_subscriptions/messenger/getStartedWebhook.js'
const logger = require('../../components/logger')
const callApi = require('../../utility/api.caller.service')

exports.getStartedWebhook = (payload) => {
  logger.serverLog(TAG,
    `in getStartedWebhook ${JSON.stringify(payload)}`)
  callApi.callApi('messengerEvents/subscriber', 'post', payload)
}
