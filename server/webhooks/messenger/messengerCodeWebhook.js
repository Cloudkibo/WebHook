const TAG = 'webhooks/messenger/messengerCodeWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')

exports.messengerCodeWebhook = (payload) => {
  // logger.serverLog(TAG, `in messenger code ${JSON.stringify(payload)}`)
  callApi('messenger_code/webhook', 'post', payload.entry[0].messaging[0], 'accounts')
    .then((response) => {
      logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
    })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
    })
}
