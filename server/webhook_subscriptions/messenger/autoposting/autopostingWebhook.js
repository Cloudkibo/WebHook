const TAG = 'webhook_subscriptions/messenger/autopostingWebhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')

exports.autopostingWebhook = (payload) => {
  logger.serverLog(TAG,
    `in autopostingWebhook ${JSON.stringify(payload)}`)
  callApi.callApi('facebookEvents/autoposting', 'post', payload)
        .then((response) => {
          logger.serverLog(TAG, `response recieved from KiboPush: ${response}`)
        })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`)
    })
}
