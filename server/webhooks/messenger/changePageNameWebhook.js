const TAG = 'webhooks/messenger/changePageNameWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')

exports.changePageNameWebhook = (payload) => {
  // logger.serverLog(TAG, `in changePageNameWebhook ${JSON.stringify(payload)}`, 'debug')
  callApi('facebookEvents/changePageName', 'post', payload, 'kiboengage')
    .then((response) => {
      logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
    })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
    })
}
