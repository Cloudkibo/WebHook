const TAG = 'webhooks/messenger/postLikeWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')

exports.postLikeWebhook = (payload) => {
  // logger.serverLog(TAG, `in likesWebhook ${JSON.stringify(payload)}`, 'debug')
  callApi('facebookEvents/likes', 'post', payload, 'kiboengage')
    .then((response) => {
      logger.serverLog('Response from KiboEngage', `${TAG}: exports.postLikeWebhook`, {}, {payload, response}, 'debug')
    })
    .catch((err) => {
      const message = err || 'Error response from KiboEngage'
      logger.serverLog(message, `${TAG}: exports.postLikeWebhook`, {}, {payload}, 'error')
    })
}
