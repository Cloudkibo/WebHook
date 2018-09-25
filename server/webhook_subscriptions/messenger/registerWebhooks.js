const init = require('./initWebhooks')
const validationSchema = require('./schemas')
const commentValidation = require('./comment/commentSchema')
const customerMatchingValidation = require('./customerMatching/customerMatchingSchema')
const pollResponseValidation = require('./pollResponse/pollResponseSchema')
const getStartedValidation = require('./getStarted/getStartedSchema')
const newSubscriberValidation = require('./newSubscriber/newSubscriberSchema')
const surveyResponseValidation = require('./surveyResponse/surveyResponseSchema')
const autopostingValidation = require('./autoposting/autopostingSchema')
const seenValidation = require('./seen/seenSchema')
const chatPluginValidation = require('./chatPlugin/chatPluginSchema')
const shopifyValidation = require('./shopifyAndAdmin/shopifyAndAdminSchema')
const changePageNameValidation = require('./changePageName/changePageNameSchema')
const wordpressSchemas = require('../wordpress/schemas')
const twitterSchemas = require('../twitter/schemas')

const commentWebhook = require('./comment/commentWebhook')
const customerMatchingWebhook = require('./customerMatching/customerMatchingWebhook')
const pollResponseWebhook = require('./pollResponse/pollResponseWebhook')
const getStartedWebhook = require('./getStarted/getStartedWebhook')
const newSubscriberWebhook = require('./newSubscriber/newSubscriberWebhook')
const surveyResponseWebhook = require('./surveyResponse/surveyResponseWebhook')
const autopostingWebhook = require('./autoposting/autopostingWebhook')
const seenWebhook = require('./seen/seenWebhook')
const chatPluginWebhook = require('./chatPlugin/chatPluginWebhook')
const shopifyWebhook = require('./shopifyAndAdmin/shopifyAndAdminWebhook')
const changePageNameWebhook = require('./changePageName/changePageNameWebhook')
const twitterWebhooks = require('../twitter/webhooks')
const wordpressWebhooks = require('../wordpress/webhooks')

function initRegistry () {
  init.registerCallback(validationSchema.testSchema, (payload) => { console.log('Sample Webhook Called') })
  init.registerCallback(commentValidation.commentSchema, (payload) => { commentWebhook.commentWebhook(payload) })
  init.registerCallback(customerMatchingValidation.customerMatchingSchema, (payload) => { customerMatchingWebhook.customerMatchingWebhook(payload) })
  init.registerCallback(pollResponseValidation.pollResponseSchema, (payload) => { pollResponseWebhook.pollResponseWebhook(payload) })
  init.registerCallback(getStartedValidation.getStartedSchema, (payload) => { getStartedWebhook.getStartedWebhook(payload) })
  init.registerCallback(newSubscriberValidation.newSubscriberSchema, (payload) => { newSubscriberWebhook.newSubscriberWebhook(payload) })
  init.registerCallback(surveyResponseValidation.surveyResponseSchema, (payload) => { surveyResponseWebhook.surveyResponseWebhook(payload) })
  init.registerCallback(autopostingValidation.autopostingSchema, (payload) => { autopostingWebhook.autopostingWebhook(payload) })
  init.registerCallback(seenValidation.seenSchema, (payload) => { seenWebhook.seenWebhook(payload) })
  init.registerCallback(chatPluginValidation.chatPluginSchema, (payload) => { chatPluginWebhook.chatPluginWebhook(payload) })
  init.registerCallback(shopifyValidation.shopifyAndAdminSchema, (payload) => { shopifyWebhook.shopifyAndAdminSchema(payload) })
  init.registerCallback(changePageNameValidation.changePageNameSchema, (payload) => { changePageNameWebhook.changePageNameWebhook(payload) })

  init.registerCallback(wordpressSchemas.publishPost, (payload) => { wordpressWebhooks.publishPost(payload) })
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
