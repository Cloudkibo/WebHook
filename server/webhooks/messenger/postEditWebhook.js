const TAG = 'webhooks/messenger/postWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')

exports.postEditWebhook = (payload) => {
  // logger.serverLog(TAG, `in commentWebhook ${JSON.stringify(payload)}`, 'debug')
  callApi('facebookEvents/post', 'post', payload, 'kiboengage')
    .then((response) => {
      logger.serverLog('Response from KiboEngage', `${TAG}: exports.postEditWebhook`, {}, {payload, response}, 'debug')
    })
    .catch((err) => {
      const message = err || 'Error response from KiboEngage'
      logger.serverLog(message, `${TAG}: exports.postEditWebhook`, {}, {payload}, 'error')
    })
}
