const TAG = 'webhook_subscriptions/twitter/webhook.js'
const logger = require('../../components/logger')
const callApi = require('../../utility/api.caller.service')

exports.simpleTweet = (payload) => {
  logger.serverLog(TAG, `in simpleTweet`)
  callApi.callApi('twitterEvents/twitterAutoposting', 'post', payload)
    .then((response) => {
      logger.serverLog(TAG, `response recieved from KiboPush: ${response}`)
    })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`)
    })
}

exports.mediaTweet = (payload) => {
  logger.serverLog(TAG, `in mediaTweet Webhook`)
  callApi.callApi('twitterEvents/twitterAutopostingMedia', 'post', payload)
      .then((response) => {
        logger.serverLog(TAG, `response recieved from KiboPush: ${response}`)
      })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`)
    })
}
