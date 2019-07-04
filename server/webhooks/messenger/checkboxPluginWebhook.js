const TAG = 'webhooks/messenger/checkboxPluginWebhook.js'
const logger = require('../../components/logger')
const { createNewSubscriber } = require('../logicLayer/createNewSubscriber.js')

exports.checkboxPluginWebhook = (payload) => {
  logger.serverLog(TAG, `in checkboxPluginWebhook ${JSON.stringify(payload)}`, 'debug')
  const event = payload.entry[0].messaging[0]
  const senderId = event.message && event.message.is_echo ? event.recipient.id : event.sender.id
  const pageId = event.message && event.message.is_echo ? event.sender.id : event.recipient.id
  const identifier = event.prior_message.identifier
  createNewSubscriber(pageId, senderId, 'checkbox_plugin', identifier, null, event)
}
