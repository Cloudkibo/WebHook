const TAG = 'webhooks/messenger/pollResponseWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')

exports.pollResponseWebhook = (payload) => {
  let resp = JSON.parse(payload.entry[0].messaging[0].message.quick_reply.payload)
  console.log('response value', resp)
  if (resp[0]) {
    for (let i = 0; i < resp.length; i++) {
      payload.entry[0].messaging[0].message.quick_reply.payload = JSON.stringify(resp[i])
      console.log('payload', payload.entry[0].messaging[0].message.quick_reply.payload)
      if (resp[i].action && resp[i].action === 'subscribe_to_sequence') {
        callApi('messengerEvents/subscribeToSequence', 'post', payload, 'kiboengage')
          .then((response) => {
            logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
          })
          .catch((err) => {
            logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
          })
      }
      if (resp[i].action && resp[i].action === 'unsubscribe_from_sequence') {
        callApi('messengerEvents/unsubscribeFromSequence', 'post', payload, 'kiboengage')
          .then((response) => {
            logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
          })
          .catch((err) => {
            logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
          })
      }
      if (resp[i].action && resp[i].action === 'send_new_message') {
        callApi('messengerEvents/sendTemplateMessage', 'post', payload, 'kiboengage')
          .then((response) => {
            logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
          })
          .catch((err) => {
            logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
          })
      }
      if (resp[i].action && resp[i].action === 'assign_tag') {
        callApi('messengerEvents/assignTag', 'post', payload, 'kiboengage')
          .then((response) => {
            logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
          })
          .catch((err) => {
            logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
          })
      }
      if (resp[i].action && resp[i].action === 'unassign_tag') {
        callApi('messengerEvents/unAssignTag', 'post', payload, 'kiboengage')
          .then((response) => {
            logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
          })
          .catch((err) => {
            logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
          })
      }
    }
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
