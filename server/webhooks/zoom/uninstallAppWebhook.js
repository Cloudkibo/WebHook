const TAG = 'webhooks/zoom/uninstallAppWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')

exports.uninstallAppWebhook = (payload) => {
  logger.serverLog('Someone uninstalled zoom app', `${TAG}: exports.uninstallAppWebhook`, {}, {payload}, 'debug')
  callApi('zoomEvents/uninstallApp', 'post', payload, 'kibochat')
    .then((response) => {
      logger.serverLog('Response from Kibochat', `${TAG}: exports.uninstallAppWebhook`, {}, {payload, response}, 'error')
    })
    .catch((err) => {
      const message = err || 'Error from KiboChat'
      logger.serverLog(message, `${TAG}: exports.uninstallAppWebhook`, {}, {payload}, 'error')
    })
}
