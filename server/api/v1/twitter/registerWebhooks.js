const init = require('./initWebhooks')
const twitterSchemas = require('./schemas')

const twitterWebhooks = require('./webhooks')

function initRegistry () {
  // init.registerCallback(twitterSchemas.simpleTweet, (payload) => { twitterWebhooks.simpleTweet(payload) })
  init.registerCallback(twitterSchemas.mediaTweet, (payload) => { twitterWebhooks.mediaTweet(payload) })
}

exports.registeryInit = () => {
  initRegistry()
  init.freezeRegistry()
}
