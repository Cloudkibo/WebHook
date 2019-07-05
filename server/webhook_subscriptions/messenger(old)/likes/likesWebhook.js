const TAG = 'webhook_subscriptions/messenger/likesWebhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')

exports.likesWebhook = (payload) => {
  logger.serverLog(TAG,
    `in likesWebhook ${JSON.stringify(payload)}`, 'debug')
  callApi.callApi('facebookEvents/likes', 'post', payload, 'kiboengage')
        .then((response) => {
          logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
        })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
    })
}
