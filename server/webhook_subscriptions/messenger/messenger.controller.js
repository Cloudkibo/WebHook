const init = require('./initWebhooks')
const Validator = require('jsonschema').Validator
const _cloneDeep = require('lodash/cloneDeep')
const validator = new Validator()
const logger = require('./../../components/logger')
const TAG = '/server/api/v1/webhooks/webhooks.controller.js'
const callApi = require('../../utility/api.caller.service')

exports.verifyHook = function (req, res) {
  if (req.query['hub.verify_token'] === 'VERIFY_ME') {
    res.send(req.query['hub.challenge'])
  } else {
    res.send('Error, wrong token')
  }
}

exports.webhook = function (req, res) {
  logger.serverLog(TAG, `something received from facebook ${JSON.stringify(req.body)}`)
  console.log('something received from facebook', JSON.stringify(req.body))
  callApi.callApi('fbPost', 'post', req.body, 'demossa')
  try {
    let webhookCalled = webhookHandler(req.body)

    logger.serverLog(TAG, `webhookCalled: ${webhookCalled}`)

    // @TODO : Need to fix the response mechanism
    return res.status(200).json({status: webhookCalled ? 'Success' : 'No webhook for the given request schema'})
  } catch (e) {
    logger.serverLog(TAG, `Error on Webhook ${e}`)
    return res.status(500).json({status: 'failed', err: e})
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
