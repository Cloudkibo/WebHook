const TAG = 'webhook_subscriptions/messenger/newSubscriberWebhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')

exports.newSubscriberWebhook = (payload) => {
  if (!payload.entry[0].messaging[0].prior_message && payload.entry[0].messaging[0].message && !payload.entry[0].messaging[0].message.attachments && !payload.entry[0].messaging[0].postback && !payload.entry[0].messaging[0].delivery) {
    logger.serverLog(TAG,
      `in newSubscriberWebhook ${JSON.stringify(payload)}`)
    callApi.callApi('messengerEvents/subscriber', 'post', payload)
  }
}
