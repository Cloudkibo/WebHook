const init = require('./initWebhooks')
const twitterSchemas = require('../twitter/schemas')

const twitterWebhooks = require('../twitter/webhooks')

function initRegistry () {
  init.registerCallback(twitterSchemas.simpleTweetWithURLandText, (payload) => { twitterWebhooks.simpleTweetWithURLandText(payload) })
  init.registerCallback(twitterSchemas.tweetWithURLOnly, (payload) => { twitterWebhooks.tweetWithURLOnly(payload) })
  init.registerCallback(twitterSchemas.tweetwithLinkandTextAndImage, (payload) => { twitterWebhooks.tweetwithLinkandTextAndImage(payload) })
  init.registerCallback(twitterSchemas.imageOnly, (payload) => { twitterWebhooks.imageOnly(payload) })
  init.registerCallback(twitterSchemas.tweetMultipleImages, (payload) => { twitterWebhooks.tweetMultipleImages(payload) })
  init.registerCallback(twitterSchemas.tweetVideo, (payload) => { twitterWebhooks.tweetVideo(payload) })
}

exports.registeryInit = () => {
  initRegistry()
  init.freezeRegistry()
}
