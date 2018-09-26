const TAG = 'webhook_subscriptions/twitter/webhook.js'
const logger = require('../../components/logger')
const callApi = require('../../utility/api.caller.service')

exports.simpleText = (payload) => {
  logger.serverLog(TAG, `in simpleTextWebhook ${JSON.stringify(payload)}`)
  callApi.callApi('twitterEvents/twitterAutoposting', 'post', payload)
}

exports.simpleTweetWithURLandText = (payload) => {
  logger.serverLog(TAG, `in simpleTweetWithURLandText Webhook ${JSON.stringify(payload)}`)
  callApi.callApi('twitterEvents/twitterAutopostingMedia', 'post', payload)
}

exports.tweetWithURLOnly = (payload) => {
  logger.serverLog(TAG, `in tweetWithURLOnly Webhook ${JSON.stringify(payload)}`)
  callApi.callApi('twitterEvents/twitterAutopostingMedia', 'post', payload)
}

exports.tweetwithLinkandTextAndImage = (payload) => {
  logger.serverLog(TAG, `in tweetwithLinkandTextAndImage Webhook ${JSON.stringify(payload)}`)
  callApi.callApi('twitterEvents/twitterAutopostingMedia', 'post', payload)
}

exports.tweetMultipleImages = (payload) => {
  logger.serverLog(TAG, `in tweetMultipleImages Webhook ${JSON.stringify(payload)}`)
  callApi.callApi('twitterEvents/twitterAutopostingMedia', 'post', payload)
}

exports.tweetVideo = (payload) => {
  logger.serverLog(TAG, `in tweetVideo Webhook ${JSON.stringify(payload)}`)
  callApi.callApi('twitterEvents/twitterAutopostingMedia', 'post', payload)
}
