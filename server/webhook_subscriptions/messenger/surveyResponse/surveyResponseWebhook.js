const TAG = 'webhook_subscriptions/messenger/surveyResponseWebhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')

exports.surveyResponseWebhook = (payload) => {
  if (payload.entry[0].messaging[0].postback.payload !== '<GET_STARTED_PAYLOAD>') {
    logger.serverLog(TAG,
      `in surveyResponseWebhook ${JSON.stringify(payload)}`)
    let resp = JSON.parse(payload.entry[0].messaging[0].postback.payload)
    if (resp.survey_id) {
      callApi.callApi('messengerEvents/surveyResponse', 'post', payload)
    } else if (resp.unsubscribe) {
      callApi.callApi('messengerEvents/unsubscribe', 'post', payload)
    } else if (resp.action === 'subscribe') {
      callApi.callApi('messengerEvents/subscribeToSequence', 'post', payload)
    } else if (resp.action === 'unsubscribe') {
      callApi.callApi('messengerEvents/unsubscribeFromSequence', 'post', payload)
    } else {
      callApi.callApi('messengerEvents/menu', 'post', payload)
    }
  }
}
