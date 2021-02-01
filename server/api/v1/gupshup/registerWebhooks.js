const init = require('./initWebhooks')

const { messageStatusSchema } = require('../../../schemas/gupshup/messageStatusSchema')
const { messageStatusWebhook } = require('../../../webhooks/gupshup/messageStatusWebhook')

const { messageReceivedSchema } = require('../../../schemas/gupshup/messageReceivedSchema')
const { messageReceivedWebhook } = require('../../../webhooks/gupshup/messageReceivedWebhook')

function initRegistry () {
  init.registerCallback(messageStatusSchema, (payload) => { messageStatusWebhook(payload) })
  init.registerCallback(messageReceivedSchema, (payload) => { messageReceivedWebhook(payload) })
}

exports.registeryInit = () => {
  initRegistry()
  init.freezeRegistry()
}
