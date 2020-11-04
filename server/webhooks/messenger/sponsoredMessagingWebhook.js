const TAG = 'webhooks/messenger/sponsoredMessagingWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')

exports.sponsoredMessagingWebhook = (payload) => {
  logger.serverLog(TAG, `in sponsored messaging ${JSON.stringify(payload)}`)
  callApi('messengerEvents/sponsoredMessaging', 'post', payload, 'kiboengage')
    .then((response) => {
      logger.serverLog('Response from KiboEngage', `${TAG}: exports.sponsoredMessagingWebhook`, {}, {payload, response}, 'debug')
    })
    .catch((err) => {
      const message = err || 'Error response from KiboEngage'
      logger.serverLog(message, `${TAG}: exports.sponsoredMessagingWebhook`, {}, {payload}, 'error')
    })
}
