const TAG = 'webhook_subscriptions/twitter/webhook.js'
const logger = require('../../components/logger')
const callApi = require('../../utility/api.caller.service')

exports.simpleTweet = (payload) => {
  logger.serverLog(TAG, `in simpleTweet ${JSON.stringify(payload)}`)
  callApi.callApi('twitterEvents/twitterAutoposting', 'post', payload)
}

exports.mediaTweet = (payload) => {
  logger.serverLog(TAG, `in mediaTweet Webhook ${JSON.stringify(payload)}`)
  callApi.callApi('twitterEvents/twitterAutopostingMedia', 'post', payload)
}
