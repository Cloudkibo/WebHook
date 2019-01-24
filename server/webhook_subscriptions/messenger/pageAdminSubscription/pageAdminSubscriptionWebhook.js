const TAG = 'webhook_subscriptions/pageAdminSubscription/pageAdminSubscriptionWebhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')

exports.adminSubscriberWebhook = (payloadBody) => {
  let payload = payloadBody.entry[0]
  logger.serverLog(TAG, `in adminSubscriberWebhook: ${JSON.stringify(payloadBody)}`)
  if (payload.messaging) {
    if (payload.messaging[0].optin) {
      if (payload.messaging[0].optin.ref) {
        addAdminAsSubscriber(payload)
      }
    }
  }
}

function addAdminAsSubscriber (payload) {
  callApi.callApi(`user/query`, 'post', {_id: payload.messaging[0].optin.ref}, 'accounts')
    .then(user => {
      if (user.length > 0) {
        user = user[0]
        logger.serverLog(TAG, `user: ${JSON.stringify(user)}`)
        callApi.callApi(`companyUser/query`, 'post', { domain_email: user.domain_email }, 'accounts')
          .then(companyUser => {
            logger.serverLog(TAG, `companyUser: ${JSON.stringify(companyUser)}`)
            callApi.callApi(`pages/query`, 'post', { pageId: payload.id, companyId: companyUser.companyId }, 'accounts')
              .then(pages => {
                if (pages.length > 0) {
                  let page = pages[0]
                  logger.serverLog(TAG, `page: ${JSON.stringify(page)}`)
                  let pageAdminPayload = {
                    'companyId': companyUser.companyId,
                    'userId': user._id,
                    'subscriberId': payload.messaging[0].sender.id,
                    'pageId': page._id
                  }
                  callApi.callApi(`adminsubscriptions`, 'post', pageAdminPayload, 'kiboengage')
                    .then(record => {
                      logger.serverLog(TAG, `Admin subscription added: ${JSON.stringify(record)}`)
                    })
                    .catch(err => {
                      logger.serverLog(TAG, `Error: Unable to create admin subscription ${JSON.stringify(err)}`)
                    })
                }
              })
              .catch(err => {
                logger.serverLog(TAG, `Error: Unable to get company user ${JSON.stringify(err)}`)
              })
          })
          .catch(err => {
            logger.serverLog(TAG, `Error: Unable to get company user ${JSON.stringify(err)}`)
          })
      }
    })
    .catch(err => {
      logger.serverLog(TAG, `Error: Unable to get user ${JSON.stringify(err)}`)
    })
}
