const TAG = 'webhook_subscriptions/messenger/newSubscriberWebhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')

exports.newSubscriberWebhook = (payload) => {
  if (!payload.entry[0].messaging[0].prior_message && !payload.entry[0].messaging[0].message && !payload.entry[0].messaging[0].postback && !payload.entry[0].messaging[0].read) {
    logger.serverLog(TAG,
      `in newSubscriberWebhook ${JSON.stringify(payload)}`)
    callApi.callApi('messengerEvents/subscriber', 'post', payload)
          .then((response) => {
            logger.serverLog(TAG, `response recieved from KiboPush: ${response}`)
          })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`)
    })
  }
}
