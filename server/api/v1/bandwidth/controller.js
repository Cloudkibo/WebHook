const init = require('./initWebhooks')
const Validator = require('jsonschema').Validator
const _cloneDeep = require('lodash/cloneDeep')
const validator = new Validator()
const logger = require('../../../components/logger')
const TAG = '/server/api/v1/bandwidth/controller.js'
const async = require('async')

exports.webhook = function (req, res) {
  res.status(200).json({status: 'success', description: 'Event received successfully'})

  async.each(req.body, async function (event, cb) {
    let response = webhookHandler(event)
    cb()
  }, function (err) {
    if (err) {
      const message = err || 'Error on Bandwidth Webhook'
      logger.serverLog(message, `${TAG}: exports.webhook`, req.body, {}, 'error')
    }
  })
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
