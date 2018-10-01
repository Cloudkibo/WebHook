const TAG = 'webhook_subscriptions/messenger/commentWebhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')

exports.commentWebhook = (payload) => {
  logger.serverLog(TAG,
    `in commentWebhook ${JSON.stringify(payload)}`)
  callApi.callApi('facebookEvents/comment', 'post', payload)
        .then((response) => {
          logger.serverLog(TAG, `response recieved from KiboPush: ${response}`)
        })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`)
    })
}
