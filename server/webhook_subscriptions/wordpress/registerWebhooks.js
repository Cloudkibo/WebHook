const init = require('./initWebhooks')
const wordpressSchemas = require('../wordpress/schemas')

const wordpressWebhooks = require('../wordpress/webhooks')

function initRegistry () {
  init.registerCallback(wordpressSchemas.publishPost, (payload) => { wordpressWebhooks.publishPost(payload) })
}

exports.registeryInit = () => {
  initRegistry()
  init.freezeRegistry()
}
