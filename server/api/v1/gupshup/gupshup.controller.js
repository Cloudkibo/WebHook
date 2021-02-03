const init = require('./initWebhooks')
const Validator = require('jsonschema').Validator
const _cloneDeep = require('lodash/cloneDeep')
const validator = new Validator()
const logger = require('../../../components/logger')
const TAG = '/server/api/v1/webhooks/webhooks.controller.js'

exports.webhook = function (req, res) {
  logger.serverLog('gupshup event received', `${TAG}: exports.webhook`, JSON.stringify(req.body), {}, 'debug')
  let webhookCalled = false
  try {
    webhookCalled = webhookHandler(req.body)
    let responseMessage = webhookCalled ? 'Webhook event received successfully' : 'No webhook for the given request schema'
    logger.serverLog(responseMessage, `${TAG}: exports.webhook`, req.body, {}, 'debug')
    return res.status(200)
  } catch (e) {
    let message = e || 'Error on Gupshup Webhook'
    logger.serverLog(message, `${TAG}: exports.webhook`, req.body, {}, 'error')
    return res.status(500)
  }
}

function webhookHandler (body) {
  let webhookCalled = false
  init.getRegistry().map((entry) => {
    if (validator.validate(body, entry.schema).valid && !webhookCalled) {
      entry.callback(_cloneDeep(body))
      webhookCalled = true
    }
  })
  return webhookCalled
}

exports.webhookHandler = webhookHandler
