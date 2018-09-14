const init = require('./initWebhooks')
const validationSchemas = require('./schemas')

function initRegistry () {
  init.registerCallback(validationSchemas.testSchema, (payload) => { console.log('Sample Webhook Called') })
}

exports.registeryInit = () => {
  initRegistry()
  init.freezeRegistry()
}
