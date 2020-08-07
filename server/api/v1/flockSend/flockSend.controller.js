const init = require('./initWebhooks')
const Validator = require('jsonschema').Validator
const _cloneDeep = require('lodash/cloneDeep')
const validator = new Validator()
const logger = require('../../../components/logger')
const TAG = '/server/api/v1/webhooks/webhooks.controller.js'
const { sendSuccessResponse, sendErrorResponse } = require('../../../global/global.js')

exports.webhook = function (req, res) {
  console.log('flocksend event received', JSON.stringify(req.body))
  let webhookCalled = false
  try {
    webhookCalled = webhookHandler(req.body)
    let responseMessage = webhookCalled ? 'Webhook event received successfully' : 'No webhook for the given request schema'
    sendSuccessResponse(200, responseMessage, res)
  } catch (e) {
    logger.serverLog(TAG, `Error on Webhook ${e}`, 'error')
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
