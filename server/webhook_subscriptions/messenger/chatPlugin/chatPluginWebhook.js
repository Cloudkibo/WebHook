const TAG = 'webhook_subscriptions/messenger/chatPluginWebhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')

exports.chatPluginWebhook = (payload) => {
  logger.serverLog(TAG,
    `in chatPluginWebhook ${JSON.stringify(payload)}`)
  callApi.callApi('messengerEvents/subscriber', 'post', payload)
        .then((response) => {
          logger.serverLog(TAG, `response recieved from KiboPush: ${response}`)
        })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`)
    })
}
