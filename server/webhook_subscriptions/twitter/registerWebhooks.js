const init = require('./initWebhooks')
const twitterSchemas = require('../twitter/schemas')

const twitterWebhooks = require('../twitter/webhooks')

function initRegistry () {
  init.registerCallback(twitterSchemas.simpleTweet, (payload) => { twitterWebhooks.simpleTweet(payload) })
  init.registerCallback(twitterSchemas.mediaTweet, (payload) => { twitterWebhooks.mediaTweet(payload) })
}

exports.registeryInit = () => {
  initRegistry()
  init.freezeRegistry()
}
