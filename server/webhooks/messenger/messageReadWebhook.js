const TAG = 'webhooks/messenger/seenWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')

exports.messageReadWebhook = (payload) => {
  logger.serverLog(TAG, `in seenWebhook ${JSON.stringify(payload)}`)
  callApi('messengerEvents/seen', 'post', payload, 'kiboengage')
    .then((response) => {
      logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
    })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
    })
  callApi('messengerEvents/seen', 'post', payload, 'kibochat')
    .then((response) => {
      logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
    })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
    })
}
