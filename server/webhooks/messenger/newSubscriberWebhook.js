const TAG = 'webhooks/messenger/newSubscriberWebhook.js'
const logger = require('../../components/logger')
const { createNewSubscriber } = require('../logicLayer/createNewSubscriber.js')

exports.newSubscriberWebhook = (payload) => {
  console.log(TAG, `in newSubscriberWebhook ${JSON.stringify(payload)}`)
  const event = payload.entry[0].messaging[0]
  const senderId = event.message && event.message.is_echo ? event.recipient.id : event.sender.id
  const pageId = event.message && event.message.is_echo ? event.sender.id : event.recipient.id
  createNewSubscriber(pageId, senderId, 'direct_message', '', null, event, payload)
}
