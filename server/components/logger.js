const config = require('../config/environment/index')
const sentry = require('../global/sentry')
const papertrail = require('../global/papertrail')

exports.serverLog = function (message, path, data, otherInfo, level = 'info') {
  const namespace = `Webhook:${path}`
  const debug = require('debug')(namespace)
  if (config.env === 'development' || config.env === 'test') {
    debug(data)
    console.log(`${namespace} - ${data} - ${message}`)
  } else {
    papertrail.sendLog(message, path, data, otherInfo, level)
    if (level === 'error') {
      sentry.sendAlert(message, path, data, otherInfo, level)
    }
  }
}
