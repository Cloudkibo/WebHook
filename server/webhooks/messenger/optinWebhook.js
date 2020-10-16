const TAG = 'webhooks/messenger/optinWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')
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
    let pageId = payload.entry[0].messaging[0].recipient.id
    userRefIdForCheckBox = payload.entry[0].messaging[0].optin.user_ref
    callApi(`pages/query`, 'post', { pageId: pageId, connected: true }, 'accounts')
      .then(page => {
        page = page[0]
        if (page) {
          let payload = refPayload
          payload.subscriberRefId = userRefIdForCheckBox
          let dataToSend = {
            type: 'CHECKBOX_OPT_IN',
            platform: 'messenger',
            page,
            payload
          }
          callApi('webhooks/sendWebhook', 'post', dataToSend, 'kibochat')
          .then(res => logger.serverLog(TAG, `response from sendWebhook ${res}`))
          .catch(err => logger.serverLog(TAG, `Failed to get response from sendWebhook ${JSON.stringify(err)}`, 'error'))
        }
      })
      .catch((err) => {
        logger.serverLog(TAG, `Failed to fetch page: ${err}`, 'error')
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
        logger.serverLog(TAG, `in addAdminAsSubscriberWebhook user${JSON.stringify(user)}`)
        user = user[0]
        callApi(`companyUser/query`, 'post', { domain_email: user.domain_email }, 'accounts')
          .then(companyUser => {
            logger.serverLog(TAG, `in addAdminAsSubscriberWebhook companyId${JSON.stringify(companyUser.companyId)}`)
            callApi(`pages/query`, 'post', { pageId: event.recipient.id, companyId: companyUser.companyId, connected: true }, 'accounts')
              .then(pages => {
                logger.serverLog(TAG, `in addAdminAsSubscriberWebhook pages${JSON.stringify(pages)}`)
                if (pages.length > 0) {
                  let page = pages[0]
                  let pageAdminPayload = {
                    companyId: companyUser.companyId,
                    userId: user._id,
                    subscriberId: event.sender.id,
                    pageId: page._id
                  }
                  logger.serverLog(TAG, `in addAdminAsSubscriberWebhook pageAdminPayload${JSON.stringify(pageAdminPayload)}`)
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
