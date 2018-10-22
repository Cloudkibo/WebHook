const TAG = 'webhook_subscriptions/messenger/seenWebhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')

exports.seenWebhook = (payload) => {
  logger.serverLog(TAG,
    `in seenWebhook ${JSON.stringify(payload)}`)
  callApi.callApi('messengerEvents/seen', 'post', payload, 'kiboengage')
        .then((response) => {
          logger.serverLog(TAG, `response recieved from KiboPush: ${response}`)
        })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`)
    })
}
