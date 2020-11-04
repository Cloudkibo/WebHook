const TAG = 'webhooks/messenger/seenWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')

exports.messageReadWebhook = (payload) => {
  logger.serverLog(TAG, `in seenWebhook ${JSON.stringify(payload)}`)
  callApi('messengerEvents/seen', 'post', payload, 'kiboengage')
    .then((response) => {
      logger.serverLog('Response from KiboEngage', `${TAG}: exports.messageReadWebhook`, {}, {payload, response}, 'debug')
    })
    .catch((err) => {
      const message = err || 'Error from KiboEngage'
      logger.serverLog(message, `${TAG}: exports.messageReadWebhook`, {}, {payload}, 'error')
    })
  callApi('messengerEvents/seen', 'post', payload, 'kibochat')
    .then((response) => {
      logger.serverLog('Response from KiboChat', `${TAG}: exports.messageReadWebhook`, {}, {payload, response}, 'debug')
    })
    .catch((err) => {
      const message = err || 'Error from KiboChat'
      logger.serverLog(message, `${TAG}: exports.messageReadWebhook`, {}, {payload}, 'error')
    })
}
