const TAG = 'webhook_subscriptions/messenger/getStartedWebhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')

exports.getStartedWebhook = (payload) => {
  if (payload.entry[0].messaging[0].postback.payload !== '<GET_STARTED_PAYLOAD>') {
    logger.serverLog(TAG,
      `in surveyResponseWebhook ${JSON.stringify(payload)}`)
    let resp = JSON.parse(payload.entry[0].messaging[0].postback.payload)
    if (resp.survey_id) {
      callApi.callApi('messengerEvents/surveyResponse', 'post', payload, 'kiboengage')
    } else if (resp.unsubscribe) {
      callApi.callApi('messengerEvents/unsubscribe', 'post', payload, 'accounts')
    } else if (resp.action === 'subscribe') {
      callApi.callApi('messengerEvents/subscribeToSequence', 'post', payload, 'kiboengage')
    } else if (resp.action === 'unsubscribe') {
      callApi.callApi('messengerEvents/unsubscribeFromSequence', 'post', payload, 'kiboengage')
    } else {
      callApi.callApi('messengerEvents/menu', 'post', payload, 'accounts')
    }
  } else if (payload.entry[0].messaging[0].postback.payload === '<GET_STARTED_PAYLOAD>') {
    logger.serverLog(TAG,
      `in getStartedWebhook ${JSON.stringify(payload)}`)
    callApi.callApi('messengerEvents/subscriber', 'post', payload, 'accounts')
  }
}
