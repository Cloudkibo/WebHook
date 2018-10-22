const TAG = 'webhook_subscriptions/messenger/pollResponseWebhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')

exports.pollResponseWebhook = (payload) => {
  logger.serverLog(TAG,
    `in pollResponseWebhook ${JSON.stringify(payload)}`)
  callApi.callApi('messengerEvents/pollResponse', 'post', payload)
        .then((response) => {
          logger.serverLog(TAG, `response recieved from KiboPush: ${response}`)
        })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`)
    })
}
