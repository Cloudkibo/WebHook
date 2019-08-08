const TAG = 'webhook_subscriptions/messenger/commentWebhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')

exports.commentWebhook = (payload) => {
  // logger.serverLog(TAG,
  //   `in commentWebhook ${JSON.stringify(payload)}`, 'debug')
  callApi.callApi('facebookEvents/comment', 'post', payload, 'kiboengage')
        .then((response) => {
          logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
        })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
    })
}
