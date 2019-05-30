const TAG = 'webhook_subscriptions/messenger/customerMatchingWebhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')

exports.customerMatchingWebhook = (payload) => {
  logger.serverLog(TAG,
    `in customerMatchingWebhook ${JSON.stringify(payload)}`, 'debug')
  callApi.callApi('messengerEvents/subscriber', 'post', payload, 'accounts')
        .then((response) => {
          logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
        })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
    })
}
