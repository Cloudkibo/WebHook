const TAG = 'webhook_subscriptions/messenger/changePageNameWebhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')

exports.changePageNameWebhook = (payload) => {
  if (payload.entry[0].changes[0].field === 'name') {
    logger.serverLog(TAG,
      `in changePageNameWebhook ${JSON.stringify(payload)}`, 'debug')
    callApi.callApi('facebookEvents/changePageName', 'post', payload, 'kiboengage')
          .then((response) => {
            logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
          })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
    })
  }
}