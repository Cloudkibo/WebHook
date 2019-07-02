const TAG = 'webhooks/messenger/postLikeWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')

exports.postLikeWebhook = (payload) => {
  logger.serverLog(TAG, `in likesWebhook ${JSON.stringify(payload)}`, 'debug')
  callApi('facebookEvents/likes', 'post', payload, 'kiboengage')
    .then((response) => {
      logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
    })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
    })
}
