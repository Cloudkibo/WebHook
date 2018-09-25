const init = require('./initWebhooks')
const validationSchema = require('./schemas')
const commentValidation = require('./commentSchema')
const customerMatchingValidation = require('./customerMatchingSchema')
const pollResponseValidation = require('./pollResponseSchema')
const getStartedValidation = require('./getStartedSchema')
const newSubscriberValidation = require('./newSubscriberSchema')
const surveyResponseValidation = require('./surveyResponseSchema')
const autopostingValidation = require('./autopostingSchema')
const seenValidation = require('./seenSchema')
const chatPluginValidation = require('./chatPluginSchema')
const shopifyValidation = require('./shopifySchema')

const commentWebhook = require('./commentWebhook')
const customerMatchingWebhook = require('./customerMatchingWebhook')
const pollResponseWebhook = require('./pollResponseWebhook')
const getStartedWebhook = require('./getStartedWebhook')
const newSubscriberWebhook = require('./newSubscriberWebhook')
const surveyResponseWebhook = require('./surveyResponseWebhook')
const autopostingWebhook = require('./autopostingWebhook')
const seenWebhook = require('./seenWebhook')
const chatPluginWebhook = require('./chatPluginWebhook')
const shopifyWebhook = require('./shopifyWebhook')

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
  init.registerCallback(shopifyValidation.shopifySchema, (payload) => { shopifyWebhook.shopifyWebhook(payload) })

}

exports.registeryInit = () => {
  initRegistry()
  init.freezeRegistry()
}
