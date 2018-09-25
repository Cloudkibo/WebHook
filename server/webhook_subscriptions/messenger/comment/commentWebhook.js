const TAG = 'webhook_subscriptions/messenger/commentWebhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')

exports.commentWebhook = (payload) => {
  logger.serverLog(TAG,
    `in commentWebhook ${JSON.stringify(payload)}`)
  callApi.callApi('facebookEvents/comment', 'post', payload)
}
