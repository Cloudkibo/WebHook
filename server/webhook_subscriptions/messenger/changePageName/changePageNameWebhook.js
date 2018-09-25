const TAG = 'webhook_subscriptions/messenger/changePageNameWebhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')

exports.changePageNameWebhook = (payload) => {
  if (payload.entry[0].changes[0].field === 'name') {
    logger.serverLog(TAG,
      `in changePageNameWebhook ${JSON.stringify(payload)}`)
    callApi.callApi('facebookEvents/changePageName', 'post', payload)
  }
}
