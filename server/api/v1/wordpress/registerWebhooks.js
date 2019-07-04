const init = require('./initWebhooks')
const wordpressSchemas = require('./schemas')

const wordpressWebhooks = require('./webhooks')

function initRegistry () {
  init.registerCallback(wordpressSchemas.publishPost, (payload) => { wordpressWebhooks.publishPost(payload) })
}

exports.registeryInit = () => {
  initRegistry()
  init.freezeRegistry()
}
