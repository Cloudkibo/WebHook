const TAG = 'webhooks/zoom/uninstallAppWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')

exports.uninstallAppWebhook = (payload) => {
  logger.serverLog(TAG, `someone uninstalled zoom app ${JSON.stringify(payload)}`)
  callApi('zoomEvents/uninstallApp', 'post', payload, 'kibochat')
    .then((response) => {
      logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
    })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
    })
}
