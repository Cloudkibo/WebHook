const TAG = 'webhooks/messenger/chatPluginWebhook.js'
const logger = require('../../components/logger')
// const { callApi } = require('../../utility/api.caller.service')
const { createNewSubscriber } = require('../logicLayer/createNewSubscriber.js')

exports.chatPluginWebhook = (payload) => {
  logger.serverLog(TAG, `in chatPluginWebhook ${JSON.stringify(payload)}`, 'info')
  const event = payload.entry[0].messaging[0]
  const senderId = event.message && event.message.is_echo ? event.recipient.id : event.sender.id
  const pageId = event.message && payload.entry[0].messaging[0].message.is_echo ? event.sender.id : event.recipient.id
  const ref = event.referral && event.referral.ref ? JSON.parse(event.referral.ref) : JSON.parse(event.postback.referral.ref)
  createNewSubscriber(pageId, senderId, 'chat_plugin', '', ref, event)
  // callApi('messengerEvents/subscriber', 'post', payload, 'accounts')
  //   .then((response) => {
  //     logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
  //   })
  //   .catch((err) => {
  //     logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
  //   })
}
