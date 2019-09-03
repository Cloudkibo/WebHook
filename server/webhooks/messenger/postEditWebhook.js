const TAG = 'webhooks/messenger/postWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')

exports.postEditWebhook = (payload) => {
  // logger.serverLog(TAG, `in commentWebhook ${JSON.stringify(payload)}`, 'debug')
  callApi('facebookEvents/post', 'post', payload, 'kiboengage')
    .then((response) => {
      logger.serverLog(TAG, `response recieved from Kiboengage: ${response}`, 'debug')
    })
    .catch((err) => {
      logger.serverLog(TAG, `error from Kiboengage: ${err}`, 'error')
    })
}
