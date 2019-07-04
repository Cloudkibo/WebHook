const TAG = 'webhooks/wordpress/webhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')

exports.publishPost = (payload) => {
  logger.serverLog(TAG, `in publishPostWebhook ${JSON.stringify(payload)}`)
  callApi.callApi('wordpressEvents/wordpress', 'post', payload, 'kiboengage')
        .then((response) => {
          logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
        })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
    })
}
