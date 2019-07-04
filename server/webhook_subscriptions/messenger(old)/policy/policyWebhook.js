const TAG = 'webhook_subscriptions/messenger/policyWebhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')

exports.policyWebhook = (payload) => {
  logger.serverLog(TAG,
    `in policyWebhook ${JSON.stringify(payload)}`)
  let data = {pageId: payload.recipient.id, policy: payload['policy-enforcement']}
  callApi.callApi('messengerEvents/policyNotification', 'post', data, 'kiboengage')
    .then((response) => {
      logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
    })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
    })
}
