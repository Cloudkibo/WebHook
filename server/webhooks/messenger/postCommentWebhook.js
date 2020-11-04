const TAG = 'webhooks/messenger/commentWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')

exports.postCommentWebhook = (payload) => {
  // logger.serverLog(TAG, `in commentWebhook ${JSON.stringify(payload)}`, 'debug')
  callApi('facebookEvents/comment', 'post', payload, 'kiboengage')
    .then((response) => {
      logger.serverLog('Response from KiboEngage', `${TAG}: exports.postCommentWebhook`, {}, {payload, response}, 'debug')
    })
    .catch((err) => {
      const message = err || 'Error response from KiboEngage'
      logger.serverLog(message, `${TAG}: exports.postCommentWebhook`, {}, {payload}, 'error')
    })
}
