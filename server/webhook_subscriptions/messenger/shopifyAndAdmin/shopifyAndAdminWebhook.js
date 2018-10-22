const TAG = 'webhook_subscriptions/messenger/shopifyAndAdminWebhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')

exports.shopifyAndAdminWebhook = (payload) => {
  if (payload.entry[0].messaging[0].optin.ref === 'SHOPIFY') {
    logger.serverLog(TAG,
      `in shopifyWebhook ${JSON.stringify(payload)}`)
    callApi.callApi('facebookEvents/shopify', 'post', payload)
  } else {
    logger.serverLog(TAG,
      `in addAdminAsSubscriberWebhook ${JSON.stringify(payload)}`)
    callApi.callApi('facebookEvents/addAdminAsSubscriber', 'post', payload)
          .then((response) => {
            logger.serverLog(TAG, `response recieved from KiboPush: ${response}`)
          })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`)
    })
  }
}
