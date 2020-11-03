const TAG = 'webhooks/messenger/policyWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')

exports.policyEnforcementWebhook = (payload) => {
  let data = {pageId: payload.recipient.id, policy: payload['policy-enforcement']}
  callApi('messengerEvents/policyNotification', 'post', data, 'kiboengage')
    .then((response) => {
      logger.serverLog('Response from KiboEngage', `${TAG}: exports.policyEnforcementWebhook`, {}, {payload, response}, 'debug')
    })
    .catch((err) => {
      const message = err || 'Error from KiboEngage'
      logger.serverLog(message, `${TAG}: exports.policyEnforcementWebhook`, {}, {payload}, 'error')
    })
}
