const init = require('./initWebhooks')
const validationSchema = require('./schemas')

function initRegistry () {
  init.registerCallback(validationSchema.testSchema, (payload) => { console.log('Sample Webhook Called') })
}

exports.registeryInit = () => {
  initRegistry()
  init.freezeRegistry()
}
