const TAG = 'webhook_subscriptions/messenger/messengerCodeWebhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')

exports.getStartedWebhook = (payload) => {
  logger.serverLog(TAG, `in Messenger ${JSON.stringify(payload)}`)
  callApi.callApi('messenger_code/webhook', 'post', payload.entry[0].messaging[0], 'accounts')
}
