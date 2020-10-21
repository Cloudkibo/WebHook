const TAG = 'webhooks/messenger/getStartedWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')
const { newSubscriberWebhook } = require('./newSubscriberWebhook.js')
const { createNewSubscriber } = require('../logicLayer/createNewSubscriber.js')

exports.getStartedWebhook = (payload) => {
  logger.serverLog(TAG, `in getStartedWebhook ${JSON.stringify(payload)}`, 'info')
  if (payload.entry[0].messaging[0].postback && payload.entry[0].messaging[0].postback.referral) {
    payload.entry[0].messaging[0].referral = payload.entry[0].messaging[0].postback.referral
    const event = payload.entry[0].messaging[0]
    const senderId = event.message && event.message.is_echo ? event.recipient.id : event.sender.id
    const pageId = event.message && event.message.is_echo ? event.sender.id : event.recipient.id
    createNewSubscriber(pageId, senderId, 'messaging_referrals', '', null, event)
  } else {
    sendWelcomeMessage(payload)
  }
}

function sendWelcomeMessage (payload) {
  const sender = payload.entry[0].messaging[0].sender.id
  const pageId = payload.entry[0].messaging[0].recipient.id
  callApi(`pages/query`, 'post', { pageId: pageId, connected: true }, 'accounts')
    .then(page => {
      page = page[0]
      callApi(`subscribers/query`, 'post', { pageId: page._id, senderId: sender, companyId: page.companyId }, 'accounts')
        .then(subscriber => {
          subscriber = subscriber[0]
          if (!subscriber) {
            newSubscriberWebhook(prepareSubscriberPayload(sender, pageId))
          }
          callApi('messengerEvents/welcomeMessage', 'post', payload, 'kiboengage')
            .then((response) => {
              logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
            })
            .catch((err) => {
              logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
            })
          // sending both page and subscriber to kibochat to save
          // two DB queries for these on kibochat server
          payload.subscriber = subscriber
          payload.page = page
          callApi('messengerEvents/welcomeMessage', 'post', payload, 'kibochat')
            .then((response) => {
              logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
            })
            .catch((err) => {
              logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
            })
        })
        .catch(err => {
          logger.serverLog(TAG, `Failed to fetch subscriber ${JSON.stringify(err)}`, 'error')
        })
    })
    .catch(err => {
      logger.serverLog(TAG, `Failed to fetch page ${JSON.stringify(err)}`, 'error')
    })
}

function prepareSubscriberPayload (senderId, pageId) {
  let data = {
    entry: [{
      messaging: [{
        sender: {id: senderId},
        recipient: {id: pageId},
        message: {text: 'Get Started'},
        type: 'get_started'
      }]
    }]
  }
  return data
}
