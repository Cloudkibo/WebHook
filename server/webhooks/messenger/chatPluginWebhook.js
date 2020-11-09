const TAG = 'webhooks/messenger/chatPluginWebhook.js'
const logger = require('../../components/logger')
// const { callApi } = require('../../utility/api.caller.service')
const { createNewSubscriber } = require('../logicLayer/createNewSubscriber.js')

exports.chatPluginWebhook = (payload) => {
  logger.serverLog(TAG, `in chatPluginWebhook ${JSON.stringify(payload)}`, 'info')
  const event = payload.entry[0].messaging[0]
  const senderId = event.message && event.message.is_echo ? event.recipient.id : event.sender.id
  const pageId = event.message && payload.entry[0].messaging[0].message.is_echo ? event.sender.id : event.recipient.id
  let ref = null
  if (event.referral && event.referral.ref) {
    ref = JSON.parse(event.referral.ref)
  } else if (event.postback && event.postback.referral) {
    ref = JSON.parse(event.postback.referral.ref)
  }
  if (ref === null) {
    ref = {}
  }
  // NOTE: commenting it out as now after Nov 2, 2020 change, FB doesn't
  // send sender.id of subscriber so it is impossible to track and store
  // information related to chat plugin like web site page information.
  // We have already asked from facebook community.
  // https://github.com/Cloudkibo/KiboPush/issues/10313
  // https://www.facebook.com/groups/messengerplatform/permalink/1266515037058803/
  // createNewSubscriber(pageId, senderId, 'chat_plugin', '', ref, event)
}
