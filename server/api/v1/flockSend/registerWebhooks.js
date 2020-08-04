const init = require('./initWebhooks')

const { messageStatusSchema } = require('../../../schemas/flocksend/messageStatusSchema')
const { messageStatusWebhook } = require('../../../webhooks/flocksend/messageStatusWebhook')

const { messageReceivedSchema } = require('../../../schemas/flocksend/messageReceivedSchema')
const { messageReceivedWebhook } = require('../../../webhooks/flocksend/messageReceivedWebhook')

function initRegistry () {
  init.registerCallback(messageStatusSchema, (payload) => { messageStatusWebhook(payload) })
  init.registerCallback(messageReceivedSchema, (payload) => { messageReceivedWebhook(payload) })
}

exports.registeryInit = () => {
  initRegistry()
  init.freezeRegistry()
}
