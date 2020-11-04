const TAG = 'webhooks/messenger/autopostingWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')

exports.postWebhook = (payload) => {
  callApi('facebookEvents/autoposting', 'post', payload, 'kiboengage')
    .then((response) => {
      logger.serverLog('Response from KiboEngage', `${TAG}: exports.postWebhook`, {}, {payload, response}, 'debug')
    })
    .catch((err) => {
      const message = err || 'Error response from KiboEngage'
      logger.serverLog(message, `${TAG}: exports.postWebhook`, {}, {payload}, 'error')
    })
}
