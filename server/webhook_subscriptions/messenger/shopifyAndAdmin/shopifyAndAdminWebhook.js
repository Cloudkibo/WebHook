const TAG = 'webhook_subscriptions/messenger/shopifyAndAdminWebhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')
const needle = require('needle')

exports.shopifyAndAdminWebhook = (payload) => {
  if (payload.entry[0].messaging[0].optin.ref === 'SHOPIFY') {
    logger.serverLog(TAG,
      `in shopifyWebhook ${JSON.stringify(payload)}`)
    callApi.callApi('facebookEvents/shopify', 'post', payload, 'kibocommerce')
  } else {
    logger.serverLog(TAG,
      `in checkbox ${JSON.stringify(payload)}`)
    let userRefIdForCheckBox
    let refPayload = JSON.parse(payload.entry[0].messaging[0].optin.ref)
    if (refPayload && refPayload.type === 'checkbox' && refPayload.industry === 'commerce') {
      let companyId = refPayload.company_id
      let pageId = payload.entry[0].messaging[0].recipient.id
      userRefIdForCheckBox = payload.entry[0].messaging[0].optin.user_ref
      callApi.callApi('webhooks/query', 'post', {companyId, pageId}, 'accounts')
      .then(webhook => {
        webhook = webhook[0]
        if (webhook && webhook.isEnabled) {
          needle.get(webhook.webhook_url, (err, r) => {
            if (err) {
              logger.serverLog(TAG, err)
            } else if (r.statusCode === 200) {
              if (webhook && webhook.optIn.NEW_OPTIN) {
                var data = {
                  subscription_type: 'NEW_OPTIN',
                  payload: JSON.stringify({ subscriberRefId: userRefIdForCheckBox, payload: refPayload })
                }
                needle.post(webhook.webhook_url, data, {json: true},
                  (error, response) => {
                    if (error) logger.serverLog(TAG, err)
                  })
              }
            } else {
              // webhookUtility.saveNotification(webhook)
            }
          })
        }
      })
      .catch((err) => {
        logger.serverLog(TAG, `error from KiboPush on Fetching Webhooks on Optin: ${err}`)
      })
      return
    }
    // todo this seems not working, needs to check this
    logger.serverLog(TAG,
      `in addAdminAsSubscriberWebhook ${JSON.stringify(payload)}`)
    callApi.callApi('facebookEvents/addAdminAsSubscriber', 'post', payload, 'kibocommerce')
          .then((response) => {
            logger.serverLog(TAG, `response recieved from KiboPush: ${response}`)
          })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`)
    })
  }
}
