const init = require('./initWebhooks')
const commentValidation = require('./comment/commentSchema')
const likesValidation = require('./likes/likeSchema')
// const customerMatchingValidation = require('./customerMatching/customerMatchingSchema')
const pollResponseValidation = require('./pollResponse/pollResponseSchema')
const getStartedValidation = require('./getStarted/getStartedSchema')
const newSubscriberValidation = require('./newSubscriber/newSubscriberSchema')
const surveyResponseValidation = require('./surveyResponse/surveyResponseSchema')
const autopostingValidation = require('./autoposting/autopostingSchema')
const seenValidation = require('./seen/seenSchema')
const deliveryValidation = require('./delivered/deliverySchema')
const chatPluginValidation = require('./chatPlugin/chatPluginSchema')
const shopifyValidation = require('./shopifyAndAdmin/shopifyAndAdminSchema')
const changePageNameValidation = require('./changePageName/changePageNameSchema')
const messengerCodeSchema = require('./messengerCode/messengerCodeSchema')
// const pageAdminSubscriptionSchema = require('./pageAdminSubscription/pageAdminSubscriptionSchema')
const profilePicSchema = require('./profilePic/profilePicSchema')
const policySchema = require('./policy/policySchema')

const commentWebhook = require('./comment/commentWebhook')
const likesWebhook = require('./likes/likesWebhook')
// const customerMatchingWebhook = require('./customerMatching/customerMatchingWebhook')
const pollResponseWebhook = require('./pollResponse/pollResponseWebhook')
const getStartedWebhook = require('./getStarted/getStartedWebhook')
const newSubscriberWebhook = require('./newSubscriber/newSubscriberWebhook')
const surveyResponseWebhook = require('./surveyResponse/surveyResponseWebhook')
const autopostingWebhook = require('./autoposting/autopostingWebhook')
const seenWebhook = require('./seen/seenWebhook')
const deliveryWebhook = require('./delivered/deliveryWebhook')
const chatPluginWebhook = require('./chatPlugin/chatPluginWebhook')
const shopifyWebhook = require('./shopifyAndAdmin/shopifyAndAdminWebhook')
const changePageNameWebhook = require('./changePageName/changePageNameWebhook')
const messengerCodeWebhook = require('./messengerCode/messengerCodeWebhook')
// const pageAdminSubscriptionWebhok = require('./pageAdminSubscription/pageAdminSubscriptionWebhook')
const profilePicWebhook = require('./profilePic/profilePicWebhook')
const policyWebhook = require('./policy/policyWebhook')

function initRegistry () {
  // init.registerCallback(validationSchema.testSchema, (payload) => { console.log('Sample Webhook Called') })
  // init.registerCallback(pageAdminSubscriptionSchema.pageAdminSubscriptionSchema, (payload) => { pageAdminSubscriptionWebhok.adminSubscriberWebhook(payload) })
  init.registerCallback(likesValidation.likeSchema, (payload) => { likesWebhook.likesWebhook(payload) })
  init.registerCallback(messengerCodeSchema.CodeSchema, (payload) => { messengerCodeWebhook.getStartedWebhook(payload) })
  init.registerCallback(seenValidation.seenSchema, (payload) => { seenWebhook.seenWebhook(payload) })
  init.registerCallback(deliveryValidation.deliverySchema, (payload) => { deliveryWebhook.deliveryWebhook(payload) })
  init.registerCallback(commentValidation.commentSchema, (payload) => { commentWebhook.commentWebhook(payload) })
  // init.registerCallback(customerMatchingValidation.customerMatchingSchema, (payload) => { customerMatchingWebhook.customerMatchingWebhook(payload) })
  init.registerCallback(pollResponseValidation.pollResponseSchema, (payload) => { pollResponseWebhook.pollResponseWebhook(payload) })
  init.registerCallback(getStartedValidation.getStartedSchema, (payload) => { getStartedWebhook.getStartedWebhook(payload) })
  init.registerCallback(newSubscriberValidation.newSubscriberSchema, (payload) => { newSubscriberWebhook.newSubscriberWebhook(payload) })
  init.registerCallback(surveyResponseValidation.surveyResponseSchema, (payload) => { surveyResponseWebhook.surveyResponseWebhook(payload) })
  init.registerCallback(autopostingValidation.autopostingSchema, (payload) => { autopostingWebhook.autopostingWebhook(payload) })
  init.registerCallback(chatPluginValidation.chatPluginSchema, (payload) => { chatPluginWebhook.chatPluginWebhook(payload) })
  init.registerCallback(shopifyValidation.shopifyAndAdminSchema, (payload) => { shopifyWebhook.shopifyAndAdminWebhook(payload) })
  init.registerCallback(changePageNameValidation.changePageNameSchema, (payload) => { changePageNameWebhook.changePageNameWebhook(payload) })
  init.registerCallback(policySchema.policySchema, (payload) => { policyWebhook.policyWebhook(payload) })
  init.registerCallback(profilePicSchema.profilePicSchema, (payload) => { profilePicWebhook.profilePicWebhook(payload) })
}

exports.registeryInit = () => {
  initRegistry()
  init.freezeRegistry()
}