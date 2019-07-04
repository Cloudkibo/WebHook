const TAG = 'webhook_subscriptions/messenger/autopostingWebhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')

exports.autopostingWebhook = (payload) => {
  logger.serverLog(TAG,
    `in autopostingWebhook ${JSON.stringify(payload)}`, 'debug')
  callApi.callApi('facebookEvents/autoposting', 'post', payload, 'kiboengage')
        .then((response) => {
          logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
        })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
    })
}
