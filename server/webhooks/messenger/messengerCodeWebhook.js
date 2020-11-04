const TAG = 'webhooks/messenger/messengerCodeWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')

exports.messengerCodeWebhook = (payload) => {
  // logger.serverLog(TAG, `in messenger code ${JSON.stringify(payload)}`)
  callApi('messenger_code/webhook', 'post', payload.entry[0].messaging[0], 'accounts')
    .then((response) => {
      logger.serverLog('Response from accounts', `${TAG}: exports.messengerCodeWebhook`, {}, {payload, response}, 'debug')
    })
    .catch((err) => {
      const message = err || 'Error from Account'
      logger.serverLog(message, `${TAG}: exports.messengerCodeWebhook`, {}, {payload}, 'error')
    })
}
