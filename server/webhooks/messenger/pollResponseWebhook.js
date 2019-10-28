const TAG = 'webhooks/messenger/pollResponseWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')

exports.pollResponseWebhook = (payload) => {
  console.log('pollResponseWebhook', payload)
  let resp = JSON.parse(payload.entry[0].messaging[0].message.quick_reply.payload)
  console.log('resp value', resp)
  if (resp.action && resp.action === 'subscribe_to_sequence') {
    callApi('messengerEvents/subscribeToSequence', 'post', payload, 'kiboengage')
      .then((response) => {
        logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
      })
      .catch((err) => {
        logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
      })
  } else if (resp.action && resp.action === 'unsubscribe_from_sequence') {
    callApi('messengerEvents/unsubscribeFromSequence', 'post', payload, 'kiboengage')
      .then((response) => {
        logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
      })
      .catch((err) => {
        logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
      })
  } else if (resp.action && resp.action === 'send_new_message') {
    callApi('messengerEvents/sendTemplateMessage', 'post', payload, 'kiboengage')
      .then((response) => {
        logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
      })
      .catch((err) => {
        logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
      })
  } else if (resp.option && resp.option === 'talkToHuman') {
    // logger.serverLog(TAG,
    //   `in talkToHuman ${JSON.stringify(payload)}`)
    callApi('messengerEvents/talkToHuman', 'post', payload, 'kibochat')
      .then((response) => {
        logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
      })
      .catch((err) => {
        logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
      })
  } else {
    // logger.serverLog(TAG,
    //   `in pollResponseWebhook ${JSON.stringify(payload)}`)
    callApi('messengerEvents/pollResponse', 'post', payload, 'kiboengage')
      .then((response) => {
        logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
      })
      .catch((err) => {
        logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
      })
  }
}
