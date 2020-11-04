const TAG = 'webhooks/twitter/webhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')

exports.simpleTweet = (payload) => {
  // logger.serverLog(TAG, `in simpleTweet ${JSON.stringify(payload)}`)
  callApi.callApi('twitterEvents/twitterAutoposting', 'post', payload, 'kiboengage')
    .then((response) => {
      logger.serverLog(`response recieved from KiboEngage: ${response}`, `${TAG}: exports.simpleTweet`, {}, {payload: payload}, 'info')
    })
    .catch((err) => {
      const message = err || 'response recieved from kiboengage error'
      logger.serverLog(message, `${TAG}: exports.simpleTweet`, {}, {payload: payload}, 'error')
    })
}

exports.mediaTweet = (payload) => {
  // logger.serverLog(TAG, `in mediaTweet Webhook ${JSON.stringify(payload)}`)
  callApi.callApi('twitterEvents/twitterAutoposting', 'post', payload, 'kiboengage')
      .then((response) => {
        logger.serverLog(`response recieved from KiboEngage: ${response}`, `${TAG}: exports.mediaTweet`, {}, {payload: payload}, 'info')
      })
    .catch((err) => {
      const message = err || 'response recieved from KiboPush error'
      logger.serverLog(message, `${TAG}: exports.mediaTweet`, {}, {payload: payload}, 'error')
    })
}
