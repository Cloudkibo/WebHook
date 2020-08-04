const init = require('./initWebhooks')

const { messageStatusSchema } = require('../../../schemas/twilio/messageStatusSchema')
const { messageStatusWebhook } = require('../../../webhooks/twilio/messageStatusWebhook')

const { messageReceivedSchema } = require('../../../schemas/twilio/messageReceivedSchema')
const { messageReceivedWebhook } = require('../../../webhooks/twilio/messageReceivedWebhook')

function initRegistry () {
  init.registerCallback(messageStatusSchema, (payload) => { messageStatusWebhook(payload) })
  init.registerCallback(messageReceivedSchema, (payload) => { messageReceivedWebhook(payload) })
}

exports.registeryInit = () => {
  initRegistry()
  init.freezeRegistry()
}
