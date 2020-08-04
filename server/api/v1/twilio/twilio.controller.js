const init = require('./initWebhooks')
const Validator = require('jsonschema').Validator
const _cloneDeep = require('lodash/cloneDeep')
const validator = new Validator()
const logger = require('../../../components/logger')
const TAG = '/server/api/v1/twilio/twilio.controller.js'
// const { sendSuccessResponse, sendErrorResponse } = require('../../../global/global.js')
const { sendResponseToTwilio } = require('../../global/twilio')

exports.webhook = function (req, res) {
  console.log('twilio event received', JSON.stringify(req.body))
  let webhookCalled = false
  sendResponseToTwilio(res)
  try {
    webhookCalled = webhookHandler(req.body)
    let responseMessage = webhookCalled ? 'Webhook event received successfully' : 'No webhook for the given request schema'
    logger.serverLog(TAG, `${responseMessage}`, 'info')
    // sendSuccessResponse(200, responseMessage, res)
  } catch (e) {
    logger.serverLog(TAG, `Error on Webhook ${e}`, 'error')
    // sendErrorResponse(500, e, res)
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
