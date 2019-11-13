const init = require('./initWebhooks')

const { postLikeSchema } = require('../../../schemas/messenger/postLikeSchema.js')
const { postLikeWebhook } = require('../../../webhooks/messenger/postLikeWebhook.js')

const { postCommentSchema } = require('../../../schemas/messenger/postCommentSchema.js')
const { postCommentWebhook } = require('../../../webhooks/messenger/postCommentWebhook.js')

const {postDeleteSchema} = require('../../../schemas/messenger/postDeleteSchema')
const {postDeleteWebhook} = require('../../../webhooks/messenger/postDeleteWebhook')

const {postEditSchema} = require('../../../schemas/messenger/postEditSchema')
const {postEditWebhook} = require('../../../webhooks/messenger/postEditWebhook')

const { postSchema } = require('../../../schemas/messenger/postSchema.js')
const { postWebhook } = require('../../../webhooks/messenger/postWebhook.js')

const { messageReadSchema } = require('../../../schemas/messenger/messageReadSchema.js')
const { messageReadWebhook } = require('../../../webhooks/messenger/messageReadWebhook.js')

const { messageDeliverySchema } = require('../../../schemas/messenger/messageDeliverySchema.js')
const { messageDeliveryWebhook } = require('../../../webhooks/messenger/messageDeliveryWebhook.js')

const { policyEnforcementSchema } = require('../../../schemas/messenger/policyEnforcementSchema.js')
const { policyEnforcementWebhook } = require('../../../webhooks/messenger/policyEnforcementWebhook.js')

// commented by baqar
// const { userProfilePicSchema } = require('../../../schemas/messenger/userProfilePicSchema.js')
// const { userProfilePicWebhook } = require('../../../webhooks/messenger/userProfilePicWebhook.js')

const { changePageNameSchema } = require('../../../schemas/messenger/changePageNameSchema.js')
const { changePageNameWebhook } = require('../../../webhooks/messenger/changePageNameWebhook.js')

const messengerCodeSchemas = require('../../../schemas/messenger/messengerCodeSchemas.js')
const { messengerCodeWebhook } = require('../../../webhooks/messenger/messengerCodeWebhook.js')

const postbackSchemas = require('../../../schemas/messenger/postbackSchemas.js')
const { getStartedWebhook } = require('../../../webhooks/messenger/getStartedWebhook.js')
const { postbackWebhook } = require('../../../webhooks/messenger/postbackWebhook.js')

const optinSchemas = require('../../../schemas/messenger/optinSchemas.js')
const { shopifyWebhook } = require('../../../webhooks/messenger/shopifyWebhook.js')
const { optinWebhook } = require('../../../webhooks/messenger/optinWebhook.js')

const { quickRepliesSchema } = require('../../../schemas/messenger/quickRepliesSchema.js')
const { pollResponseWebhook } = require('../../../webhooks/messenger/pollResponseWebhook.js')

const { messageReceivedSchema } = require('../../../schemas/messenger/messageReceivedSchema.js')
const { newSubscriberWebhook } = require('../../../webhooks/messenger/newSubscriberWebhook.js')

const { chatPluginSchema, chatPluginWithPostBackSchema } = require('../../../schemas/messenger/chatPluginSchema.js')
const { chatPluginWebhook } = require('../../../webhooks/messenger/chatPluginWebhook.js')

const { customerMatchingSchema } = require('../../../schemas/messenger/customerMatchingSchema.js')
const { customerMatchingWebhook } = require('../../../webhooks/messenger/customerMatchingWebhook.js')

const { checkboxPluginSchema } = require('../../../schemas/messenger/checkboxPluginSchema.js')
const { checkboxPluginWebhook } = require('../../../webhooks/messenger/checkboxPluginWebhook.js')

const { messengerReferralSchema } = require('../../../schemas/messenger/messengerReferralSchema.js')
const { messengerReferralWebhook } = require('../../../webhooks/messenger/messengerReferralWebhook.js')

function initRegistry () {
  init.registerCallback(postLikeSchema, (payload) => { postLikeWebhook(payload) })
  init.registerCallback(postCommentSchema, (payload) => { postCommentWebhook(payload) })
  init.registerCallback(postDeleteSchema, (payload) => { postDeleteWebhook(payload) })
  init.registerCallback(postEditSchema, (payload) => { postEditWebhook(payload) })
  init.registerCallback(postSchema, (payload) => { postWebhook(payload) })
  init.registerCallback(messageReadSchema, (payload) => { messageReadWebhook(payload) })
  init.registerCallback(messageDeliverySchema, (payload) => { messageDeliveryWebhook(payload) })
  init.registerCallback(policyEnforcementSchema, (payload) => { policyEnforcementWebhook(payload) })
  // commented by baqar
  // init.registerCallback(userProfilePicSchema, (payload) => { userProfilePicWebhook(payload) })
  init.registerCallback(changePageNameSchema, (payload) => { changePageNameWebhook(payload) })
  init.registerCallback(messengerCodeSchemas.referralSchema, (payload) => { messengerCodeWebhook(payload) })
  init.registerCallback(messengerCodeSchemas.postbackReferralSchema, (payload) => { messengerCodeWebhook(payload) })
  init.registerCallback(postbackSchemas.getStartedSchema, (payload) => { getStartedWebhook(payload) })
  init.registerCallback(chatPluginWithPostBackSchema, (payload) => { chatPluginWebhook(payload) })
  init.registerCallback(postbackSchemas.postbackSchema, (payload) => { postbackWebhook(payload) })
  init.registerCallback(quickRepliesSchema, (payload) => { pollResponseWebhook(payload) })
  init.registerCallback(optinSchemas.shopifySchema, (payload) => { shopifyWebhook(payload) })
  init.registerCallback(optinSchemas.optinSchema, (payload) => { optinWebhook(payload) })
  init.registerCallback(chatPluginSchema, (payload) => { chatPluginWebhook(payload) })
  init.registerCallback(customerMatchingSchema, (payload) => { customerMatchingWebhook(payload) })
  init.registerCallback(checkboxPluginSchema, (payload) => { checkboxPluginWebhook(payload) })
  init.registerCallback(messengerReferralSchema, (payload) => { messengerReferralWebhook(payload) })
  init.registerCallback(messageReceivedSchema, (payload) => { newSubscriberWebhook(payload) })
}

exports.registeryInit = () => {
  initRegistry()
  init.freezeRegistry()
}
