const TAG = 'webhooks/twitter/webhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')

exports.simpleTweet = (payload) => {
  logger.serverLog(TAG, `in simpleTweet ${JSON.stringify(payload)}`)
  callApi.callApi('twitterEvents/twitterAutoposting', 'post', payload, 'kiboengage')
    .then((response) => {
      logger.serverLog(TAG, `response recieved from KiboPush: ${response}`)
    })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`)
    })
}

exports.mediaTweet = (payload) => {
  logger.serverLog(TAG, `in mediaTweet Webhook ${JSON.stringify(payload)}`)
  callApi.callApi('twitterEvents/twitterAutoposting', 'post', payload, 'kiboengage')
      .then((response) => {
        logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'kiboengage')
      })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`)
    })
}
