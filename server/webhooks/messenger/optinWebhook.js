const TAG = 'webhooks/messenger/shopifyAndAdminWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')
const needle = require('needle')
const { createNewSubscriber } = require('../logicLayer/createNewSubscriber.js')
const logicLayer = require('../logicLayer/postback.logiclayer.js')

exports.optinWebhook = (payload) => {
  logger.serverLog(TAG, `in optin ${JSON.stringify(payload)}`)
  let userRefIdForCheckBox
  let refPayload = ''
  if (logicLayer.isJsonString(payload.entry[0].messaging[0].optin.ref)) {
    refPayload = JSON.parse(payload.entry[0].messaging[0].optin.ref)
  } else {
    refPayload = payload.entry[0].messaging[0].optin.ref
  }
  if (refPayload && refPayload.type === 'checkbox' && refPayload.industry === 'commerce') {
    let companyId = refPayload.company_id
    let pageId = payload.entry[0].messaging[0].recipient.id
    userRefIdForCheckBox = payload.entry[0].messaging[0].optin.user_ref
    callApi('webhooks/query', 'post', {companyId, pageId}, 'accounts')
      .then(webhook => {
        webhook = webhook[0]
        if (webhook && webhook.isEnabled) {
          needle.get(webhook.webhook_url, (err, r) => {
            if (err) {
              logger.serverLog(TAG, err, 'error')
            } else if (r.statusCode === 200) {
              if (webhook && webhook.optIn.NEW_OPTIN) {
                var data = {
                  subscription_type: 'NEW_OPTIN',
                  payload: JSON.stringify({ subscriberRefId: userRefIdForCheckBox, payload: refPayload })
                }
                needle.post(webhook.webhook_url, data, {json: true},
                  (error, response) => {
                    if (error) logger.serverLog(TAG, err, 'error')
                  })
              }
            } else {
              // webhookUtility.saveNotification(webhook)
            }
          })
        }
      })
      .catch((err) => {
        logger.serverLog(TAG, `error from KiboPush on Fetching Webhooks on Optin: ${err}`, 'error')
      })
    return
  }
  // pageAdminSubscription and landingPage work
  const event = payload.entry[0].messaging[0]
  const senderId = event.message && event.message.is_echo ? event.recipient.id : event.sender.id
  const pageId = event.message && event.message.is_echo ? event.sender.id : event.recipient.id
  createNewSubscriber(pageId, senderId, 'landing_page', '', null, event)
  let ref = event.optin.ref.split('__')
  if (ref.length === 2 && ref[1] === 'kibopush_test_broadcast_') {
    event.optin.ref = ref[0]
    handlePageAdminSubscription(event)
  }
}

function handlePageAdminSubscription (event) {
  logger.serverLog(TAG, `in addAdminAsSubscriberWebhook ${JSON.stringify(event)}`)
  callApi(`user/query`, 'post', {_id: event.optin.ref}, 'accounts')
    .then(user => {
      if (user.length > 0) {
        user = user[0]
        callApi(`companyUser/query`, 'post', { domain_email: user.domain_email }, 'accounts')
          .then(companyUser => {
            callApi(`pages/query`, 'post', { pageId: event.recipient.id, companyId: companyUser.companyId }, 'accounts')
              .then(pages => {
                if (pages.length > 0) {
                  let page = pages[0]
                  let pageAdminPayload = {
                    companyId: companyUser.companyId,
                    userId: user._id,
                    subscriberId: event.sender.id,
                    pageId: page._id
                  }
                  console.log('pageAdminPayload', pageAdminPayload)
                  callApi(`adminsubscriptions`, 'post', pageAdminPayload, 'kiboengage')
                    .then(record => {
                      logger.serverLog(TAG, `Admin subscription added: ${JSON.stringify(record)}`)
                    })
                    .catch(err => {
                      logger.serverLog(TAG, `Error: Unable to create admin subscription ${JSON.stringify(err)}`, 'error')
                    })
                }
              })
              .catch(err => {
                logger.serverLog(TAG, `Error: Unable to get company user ${JSON.stringify(err)}`)
              })
          })
          .catch(err => {
            logger.serverLog(TAG, `Error: Unable to get company user ${JSON.stringify(err)}`, 'error')
          })
      }
    })
    .catch(err => {
      logger.serverLog(TAG, `Error: Unable to get user ${JSON.stringify(err)}`, 'error')
    })
}
