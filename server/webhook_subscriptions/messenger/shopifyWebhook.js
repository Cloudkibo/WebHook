const TAG = 'webhook_subscriptions/messenger/shopifyWebhook.js'
const logger = require('../../components/logger')
//  const callApi = require('../../utility/api.caller.service')

exports.shopifyWebhook = (payload) => {
  logger.serverLog(TAG,
    `in shopifyWebhook ${JSON.stringify(payload)}`)
}
