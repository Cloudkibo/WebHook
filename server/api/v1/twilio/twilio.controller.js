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
    logger.serverLog('Error on Twilio Webhook', `${TAG}: exports.webhook`, req.body, {responseMessage: responseMessage}, 'info')
  } catch (e) {
    const message = e || 'Error on Twilio Webhook'
    logger.serverLog(message, `${TAG}: exports.webhook`, req.body, {}, 'error')
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
