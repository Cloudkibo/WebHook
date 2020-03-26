const init = require('./initWebhooks')
const Validator = require('jsonschema').Validator
const _cloneDeep = require('lodash/cloneDeep')
const validator = new Validator()
const logger = require('../../../components/logger')
const TAG = '/server/api/v1/webhooks/webhooks.controller.js'
const { callApi } = require('../../../utility/api.caller.service')
const config = require('../../../config/environment')
const { sendSuccessResponse, sendErrorResponse } = require('../../../global/global.js')

exports.verifyHook = function (req, res) {
  if (req.query['hub.verify_token'] === 'VERIFY_ME') {
    res.send(req.query['hub.challenge'])
  } else {
    res.send('Error, wrong token')
  }
}

exports.webhook = function (req, res) {
  // logger.serverLog(TAG, `something received from facebook ${JSON.stringify(req.body)}`)
  console.log(TAG, `something received from facebook ${JSON.stringify(req.body)}`)
  const event = (req.body.entry && req.body.entry[0] && req.body.entry[0].messaging) ? req.body.entry[0].messaging[0] : ''
  const pageId = event !== '' ? event.recipient.id : ''
  let data = req.body
  data.fromKiboPush = true
  let webhookCalled = false
  try {
    if (pageId && config.demoSSAPageIds.indexOf(pageId) > -1) {
      callApi('fbPost', 'post', data, 'demossa')
    } else if (pageId && config.telcoPageId.indexOf(pageId) > -1) {
      callApi('fbPost', 'post', data, 'telco')
    } else {
      // doing deliberatly so that we also save subscribers from these bots - sojharo
      if (pageId && config.covid19PageId.indexOf(pageId) > -1) {
        callApi('fbPost', 'post', data, 'demossa')
      }
      // health alert me - getting chatbot of covidalert
      if (pageId && config.healthAlertMePageId.indexOf(pageId) > -1) {
        callApi('fbPost', 'post', data, 'demossa')
      }
      if (pageId && config.covid19PkPageId.indexOf(pageId) > -1){
        callApi('fbPost', 'post', data, 'demossa')
      }
      webhookCalled = webhookHandler(req.body)
    }

    //logger.serverLog(TAG, `webhookCalled: ${webhookCalled}`, 'debug')
    //console.log(TAG, `webhookCalled: ${webhookCalled}`)

    let responseMessage = webhookCalled ? 'Webhook event received successfully' : 'No webhook for the given request schema'
    sendSuccessResponse(200, responseMessage, res)
  } catch (e) {
    logger.serverLog(TAG, `Error on Webhook ${e}`, 'error')
    //console.log('Error on webhook', e)
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
