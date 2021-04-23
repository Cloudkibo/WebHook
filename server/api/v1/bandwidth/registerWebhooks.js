const init = require('./initWebhooks')

const { incomingMessageSchema } = require('../../../schemas/bandwidth/incomingMessageSchema')
const { incomingMessageWebhook } = require('../../../webhooks/bandwidth/incomingMessageWebhook')

const { messageDeliverySchema } = require('../../../schemas/bandwidth/messageDeliverySchema')
const { messageDeliveryWebhook } = require('../../../webhooks/bandwidth/messageDeliveryWebhook')

const { orderStatusSchema } = require('../../../schemas/bandwidth/orderStatusSchema')
const { orderStatusWebhook } = require('../../../webhooks/bandwidth/orderStatusWebhook')

function initRegistry () {
  init.registerCallback(incomingMessageSchema, (payload) => { incomingMessageWebhook(payload) })
  init.registerCallback(messageDeliverySchema, (payload) => { messageDeliveryWebhook(payload) })
  init.registerCallback(orderStatusSchema, (payload) => { orderStatusWebhook(payload) })
}

exports.registeryInit = () => {
  initRegistry()
  init.freezeRegistry()
}
