const init = require('./initWebhooks')

const { uninstallAppSchema } = require('../../../schemas/zoom/uninstallAppSchema.js')
const { uninstallAppWebhook } = require('../../../webhooks/zoom/uninstallAppWebhook.js')

function initRegistry () {
  init.registerCallback(uninstallAppSchema, (payload) => { uninstallAppWebhook(payload) })
}

exports.registeryInit = () => {
  initRegistry()
  init.freezeRegistry()
}
