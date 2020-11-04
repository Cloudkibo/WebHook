const TAG = 'webhooks/messenger/changePageNameWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')

exports.changePageNameWebhook = (payload) => {
  // logger.serverLog(TAG, `in changePageNameWebhook ${JSON.stringify(payload)}`, 'debug')
  callApi('facebookEvents/changePageName', 'post', payload, 'kiboengage')
    .then((response) => {
      logger.serverLog('Response from KiboEngage', `${TAG}: exports.changePageNameWebhook`, {}, {response, payload}, 'debug')
    })
    .catch((err) => {
      const message = err || 'Error from KiboEngage'
      logger.serverLog(message, `${TAG}: exports.changePageNameWebhook`, {}, {payload}, 'error')
    })
}
