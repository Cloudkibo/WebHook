const TAG = 'webhooks/messenger/customerMatchingWebhook.js'
const logger = require('../../components/logger')
const { createNewSubscriber } = require('../logicLayer/createNewSubscriber.js')

exports.customerMatchingWebhook = (payload) => {
  // logger.serverLog(TAG, `in customerMatchingWebhook ${JSON.stringify(payload)}`, 'debug')
  const event = payload.entry[0].messaging[0]
  const senderId = event.message && event.message.is_echo ? event.recipient.id : event.sender.id
  const pageId = event.message && event.message.is_echo ? event.sender.id : event.recipient.id
  const phoneNumber = event.prior_message.identifier
  createNewSubscriber(pageId, senderId, 'customer_matching', phoneNumber, null, event)
}
