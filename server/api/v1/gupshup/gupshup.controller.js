const init = require('./initWebhooks')
const Validator = require('jsonschema').Validator
const _cloneDeep = require('lodash/cloneDeep')
const validator = new Validator()
const logger = require('../../../components/logger')
const TAG = '/server/api/v1/webhooks/webhooks.controller.js'
const { sendSuccessResponse, sendErrorResponse } = require('../../../global/global.js')

exports.webhook = function (req, res) {
  logger.serverLog('gupshup event received', `${TAG}: exports.webhook`, JSON.stringify(req.body), {}, 'debug')
  let webhookCalled = false
  req.body.businessNumber = req.params.number
  try {
    webhookCalled = webhookHandler(req.body)
    let responseMessage = webhookCalled ? 'Webhook event received successfully' : 'No webhook for the given request schema'
    sendSuccessResponse(200, responseMessage, res)
  } catch (e) {
    let message = e || 'Error on Gupshup Webhook'
    logger.serverLog(message, `${TAG}: exports.webhook`, req.body, {}, 'error')
    sendErrorResponse(500, e, res)
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
