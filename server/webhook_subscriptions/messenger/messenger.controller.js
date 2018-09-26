const init = require('./initWebhooks')
const Validator = require('jsonschema').Validator
const _cloneDeep = require('lodash/cloneDeep')
const validator = new Validator()
const logger = require('./../../components/logger')
const TAG = '/server/api/v1/webhooks/webhooks.controller.js'

exports.verifyHook = function (req, res) {
  if (req.query['hub.verify_token'] === 'VERIFY_ME') {
    res.send(req.query['hub.challenge'])
  } else {
    res.send('Error, wrong token')
  }
}

exports.webhook = function (req, res) {
  try {
    let webhookCalled = webhookHandler(req.body)
    // @TODO : Need to fix the response mechanism
    return res.status(200).json({status: webhookCalled ? 'Success' : 'No webhook for the given request schema'})
  } catch (e) {
    logger.serverLog(TAG, `Error on Webhook ${JSON.stringify(e)}`)
    return res.status(500).json({status: 'failed', err: e})
  }
}

function webhookHandler (body) {
  let webhookCalled = false
  init.getRegistry().map((entry) => {
    if (validator.validate(body, entry.schema).valid) {
      entry.callback(_cloneDeep(body))
      webhookCalled = true
    }
  })
  return webhookCalled
}

exports.webhookHandler = webhookHandler
