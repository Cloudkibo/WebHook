const TAG = 'webhooks/messenger/checkboxPluginWebhook.js'
const logger = require('../../components/logger')
const { createNewSubscriber } = require('../logicLayer/createNewSubscriber.js')
const { callApi } = require('../../utility/api.caller.service')

exports.checkboxPluginWebhook = (payload) => {
  logger.serverLog(TAG, `in checkboxPluginWebhook ${JSON.stringify(payload)}`, 'debug')
  const event = payload.entry[0].messaging[0]
  const senderId = event.message && event.message.is_echo ? event.recipient.id : event.sender.id
  const pageId = event.message && event.message.is_echo ? event.sender.id : event.recipient.id
  const identifier = event.prior_message.identifier
  let source = 'checkbox_plugin'
  if (identifier.indexOf('-') !== -1) {
    source = 'shopify'
    additionalWorkForShopify({ event, senderId, pageId, identifier })
  }
  createNewSubscriber(pageId, senderId, source, identifier, null, event)
}

function additionalWorkForShopify (payload) {
  callApi('messengerEvents/shopifyNewSubscriber', 'post', payload, 'kiboengage')
    .then((response) => {
      logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
    })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
    })
}