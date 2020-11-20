const TAG = 'webhooks/messenger/optinWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')
const { createNewSubscriber } = require('../logicLayer/createNewSubscriber.js')
const logicLayer = require('../logicLayer/postback.logiclayer.js')

exports.optinWebhook = (payload) => {
  logger.serverLog('In option', `${TAG}: exports.optinWebhook`, {}, {payload}, 'debug')
  let userRefIdForCheckBox
  let refPayload = ''
  if (logicLayer.isJsonString(payload.entry[0].messaging[0].optin.ref)) {
    refPayload = JSON.parse(payload.entry[0].messaging[0].optin.ref)
  } else {
    refPayload = payload.entry[0].messaging[0].optin.ref
  }
  if (refPayload && refPayload.type === 'checkbox' && refPayload.industry === 'commerce') {
    let pageId = payload.entry[0].messaging[0].recipient.id
    userRefIdForCheckBox = payload.entry[0].messaging[0].optin.user_ref
    callApi(`pages/query`, 'post', { pageId: pageId, connected: true }, 'accounts')
      .then(page => {
        page = page[0]
        if (page) {
          let payload = {
            subscriberRefId: userRefIdForCheckBox,
            cartId: refPayload.cart_id,
            type: refPayload.type,
            industry: refPayload.industry,
            timestamp: Date.now()
          }
          let dataToSend = {
            type: 'CHECKBOX_OPTIN',
            platform: 'facebook',
            page,
            payload
          }
          callApi('webhooks/sendWebhook', 'post', dataToSend, 'kibochat')
          .then(res => {
            logger.serverLog('Response from KiboChat', `${TAG}: exports.optinWebhook`, {}, {payload}, 'debug')
          })
          .catch(err => {
            const message = err || 'Error response from kibochat sendwebhook'
            logger.serverLog(message, `${TAG}: exports.optinWebhook`, {}, {payload}, 'error')
          })
        }
      })
      .catch((err) => {
        const message = err || 'Failed to fetch page'
        logger.serverLog(message, `${TAG}: exports.optinWebhook`, {}, {payload}, 'error')
      })
    return
  }
  // pageAdminSubscription and landingPage work
  const event = payload.entry[0].messaging[0]
  const senderId = event.message && event.message.is_echo ? event.recipient.id : event.sender.id
  const pageId = event.message && event.message.is_echo ? event.sender.id : event.recipient.id
  createNewSubscriber(pageId, senderId, 'landing_page', '', null, event)
    .then(response => {})
    .catch(err => {
      // err would have been sent to sentry before coming to this catch.
      // So, we don't need to send the error to sentry here.
      console.log(err)
    })
  let ref = event.optin.ref.split('__')
  if (ref.length === 2 && ref[1] === 'kibopush_test_broadcast_') {
    event.optin.ref = ref[0]
    handlePageAdminSubscription(event)
  }
}

function handlePageAdminSubscription (event) {
  callApi(`user/query`, 'post', {_id: event.optin.ref}, 'accounts')
    .then(user => {
      if (user.length > 0) {
        user = user[0]
        callApi(`companyUser/query`, 'post', { domain_email: user.domain_email }, 'accounts')
          .then(companyUser => {
            callApi(`pages/query`, 'post', { pageId: event.recipient.id, companyId: companyUser.companyId, connected: true }, 'accounts')
              .then(pages => {
                if (pages.length > 0) {
                  let page = pages[0]
                  let pageAdminPayload = {
                    companyId: companyUser.companyId,
                    userId: user._id,
                    subscriberId: event.sender.id,
                    pageId: page._id
                  }
                  callApi(`adminsubscriptions`, 'post', pageAdminPayload, 'kiboengage')
                    .then(record => {
                      logger.serverLog('Admin subscription added', `${TAG}: exports.handlePageAdminSubscription`, {}, {event}, 'debug')
                    })
                    .catch(err => {
                      const message = err || 'Unable to create admin subscription'
                      logger.serverLog(message, `${TAG}: exports.handlePageAdminSubscription`, {}, {event}, 'error')
                    })
                }
              })
              .catch(err => {
                const message = err || 'Unable to get pages'
                logger.serverLog(message, `${TAG}: exports.handlePageAdminSubscription`, {}, {event}, 'error')
              })
          })
          .catch(err => {
            const message = err || 'Unable to get company user'
            logger.serverLog(message, `${TAG}: exports.handlePageAdminSubscription`, {}, {event}, 'error')
          })
      }
    })
    .catch(err => {
      const message = err || 'Unable to get user'
      logger.serverLog(message, `${TAG}: exports.handlePageAdminSubscription`, {}, {event}, 'error')
    })
}
