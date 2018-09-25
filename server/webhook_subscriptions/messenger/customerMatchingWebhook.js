const TAG = 'webhook_subscriptions/messenger/customerMatchingWebhook.js'
const logger = require('../../components/logger')
const callApi = require('../../utility/api.caller.service')

exports.customerMatchingWebhook = (payload) => {
  logger.serverLog(TAG,
    `in customerMatchingWebhook ${JSON.stringify(payload)}`)
  callApi.callApi('messengerEvents/subscriber', 'post', payload)
}
