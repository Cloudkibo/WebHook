const TAG = 'webhooks/messenger/pollResponseWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')

exports.pollResponseWebhook = (payload) => {
  let resp = JSON.parse(payload.entry[0].messaging[0].message.quick_reply.payload)
  if (resp[0]) {
    for (let i = 0; i < resp.length; i++) {
      payload.entry[0].messaging[0].message.quick_reply.payload = JSON.stringify(resp[i])
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
      if (resp[i].action && resp[i].action === 'reply_with_a_message') {
        callApi('messengerEvents/sendMessageBlock', 'post', payload, 'kiboengage')
          .then((response) => {
            logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
          })
          .catch((err) => {
            logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
          })
      }
      if (resp[i].action && resp[i].action === 'set_custom_field') {
        callApi('messengerEvents/setCustomField', 'post', payload, 'kiboengage')
          .then((response) => {
            logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
          })
          .catch((err) => {
            logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
          })
      }
      if (resp[i].action && resp[i].action === 'google_sheets') {
        callApi('messengerEvents/googleSheets', 'post', payload, 'kiboengage')
          .then((response) => {
            logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
          })
          .catch((err) => {
            logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
          })
      }
      if (resp[i].action && resp[i].action === 'unsubscribe_from_rssFeed') {
        callApi('messengerEvents/rssFeeds/changeSubscription', 'post', payload, 'kiboengage')
          .then((response) => {
            logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
          })
          .catch((err) => {
            logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
          })
      }
      if (resp[i].action && resp[i].action === 'subscribe_to_rssFeed') {
        callApi('messengerEvents/rssFeeds/changeSubscription', 'post', payload, 'kiboengage')
          .then((response) => {
            logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
          })
          .catch((err) => {
            logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
          })
      }
      if (resp[i].action && resp[i].action === 'show_more_topics') {
        callApi('messengerEvents/rssFeeds/showMoreTopics', 'post', payload, 'kiboengage')
          .then((response) => {
            logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
          })
          .catch((err) => {
            logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
          })
      }
      if (resp[i].action && resp[i].action === 'send_topic_feed') {
        callApi('messengerEvents/rssFeeds/sendTopicFeed', 'post', payload, 'kiboengage')
          .then((response) => {
            logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
          })
          .catch((err) => {
            logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
          })
      }
      if (resp[i].action && resp[i].action === 'hubspot') {
        callApi('messengerEvents/hubspot', 'post', payload, 'kiboengage')
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
  } else if (resp.option && resp.option === 'userInputSkip') {
    logger.serverLog(TAG,
      `userInputSkip ${JSON.stringify(payload)}`)
    callApi('messengerEvents/userInput', 'post', {payload: payload, message: resp.option}, 'kiboengage')
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
