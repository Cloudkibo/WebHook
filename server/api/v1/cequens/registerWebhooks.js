const init = require('./initWebhooks')

const { messageStatusSchema } = require('../../../schemas/cequens/messageStatusSchema')
const { messageStatusWebhook } = require('../../../webhooks/cequens/messageStatusWebhook')

const { messageReceivedSchema } = require('../../../schemas/cequens/messageReceivedSchema')
const { messageReceivedWebhook } = require('../../../webhooks/cequens/messageReceivedWebhook')

function initRegistry () {
  init.registerCallback(messageStatusSchema, (payload) => { messageStatusWebhook(payload) })
  init.registerCallback(messageReceivedSchema, (payload) => { messageReceivedWebhook(payload) })
}

exports.registeryInit = () => {
  initRegistry()
  init.freezeRegistry()
}
