const TAG = 'webhooks/messenger/pollResponseWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')
const logicLayer = require('../logicLayer/postback.logiclayer.js')

exports.pollResponseWebhook = (payload) => {
  let resp = ''
  if (logicLayer.isJsonString(payload.entry[0].messaging[0].message.quick_reply.payload)) {
    resp = JSON.parse(payload.entry[0].messaging[0].message.quick_reply.payload)
  } else {
    resp = payload.entry[0].messaging[0].message.quick_reply.payload
  }
  if (typeof resp === 'string') {
    callApi('messengerEvents/welcomeMessage/emailNumberQuickReply', 'post', payload, 'kiboengage')
      .then((response) => {
        logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
      })
      .catch((err) => {
        logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
      })
  } else {
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
        if (resp[i].action && resp[i].action === 'send_message_block') {
          callApi('messengerEvents/sendMessageBlock', 'post', payload, 'kiboengage')
            .then((response) => {
              logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
            })
            .catch((err) => {
              logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
            })
        }
        if (resp[i].action && resp[i].action === '_chatbot') {
          callApi('messengerEvents/quickReply', 'post', payload, 'kibochat')
            .then((response) => {
              logger.serverLog(TAG, `response recieved from KiboChat: ${response}`, 'debug')
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
      callApi('messengerEvents/pollResponse', 'post', payload, 'kiboengage')
        .then((response) => {
          logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
        })
        .catch((err) => {
          logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
        })
    }
  }
}
