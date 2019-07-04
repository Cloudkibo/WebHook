const TAG = 'webhooks/messenger/commentWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')

exports.postCommentWebhook = (payload) => {
  logger.serverLog(TAG, `in commentWebhook ${JSON.stringify(payload)}`, 'debug')
  callApi('facebookEvents/comment', 'post', payload, 'kiboengage')
    .then((response) => {
      logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
    })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
    })
}