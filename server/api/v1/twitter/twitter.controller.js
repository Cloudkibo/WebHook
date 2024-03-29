/**
 * Created by sojharo on 23/10/2017.
 */

let Twit = require('twit')
const config = require('../../../config/environment')

const logger = require('../../../components/logger')
const TAG = 'config/integrations/twitter.js'

const callApi = require('../../../utility/api.caller.service')

// test twitter ids : [2616186000, 1430793200]

let twitterClient = new Twit({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token: config.twitter.consumer_token,
  access_token_secret: config.twitter.consumer_token_secret,
  timeout_ms: 60 * 1000
})

const init = require('./initWebhooks')
const Validator = require('jsonschema').Validator
const _cloneDeep = require('lodash/cloneDeep')
const validator = new Validator()

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
    const message = e || 'Error on Twitter Webhook'
    logger.serverLog(message, `${TAG}: exports.webhook`, req.body, {}, 'error')
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
  if (webhookCalled) {
  //  logger.serverLog(TAG, `webhook called`)

  } else {
    logger.serverLog('No webhook for the given request schema', `${TAG}: function::whebhookHandler`, body, {}, 'error')
  }
  return webhookCalled
}

let stream

function connect () {
 // logger.serverLog(TAG, `connect functio called`)
  callApi.callApi('twitterEvents/findAutoposting', 'get', {}, 'kiboengage').then((response) => {
    let autoposting = response
    if (autoposting.length > 0) {
      let arrUsers = []
      for (let i = 0; i < autoposting.length; i++) {
        arrUsers.push(autoposting[i].payload.id)
      }
    //  logger.serverLog(TAG, `Twitter Ids to listen: ${arrUsers}`, 'debug')
      stream = twitterClient.stream('statuses/filter',
        {follow: arrUsers})

      stream.on('tweet', tweet => {
     //   logger.serverLog(TAG, `received new tweet`)
        if (tweet.in_reply_to_status_id !== null || tweet.in_reply_to_user_id !== null || tweet.in_reply_to_screen_name !== null) {
          return
        }
        webhookHandler(tweet)
      })
      stream.on('error', error => {
        const message = error || 'Stream Error Twitter'
        logger.serverLog(message, `${TAG}: function::connect`, {}, {}, 'error')
      })
    }
  })
  .catch(error => {
    const message = error || 'Error in fetching autoposting'
    logger.serverLog(message, `${TAG}: function::connect`, {}, {}, 'error')
  })
}

function restart () {
  logger.serverLog('KiboPush called me', `${TAG}: function::restart`, {}, {}, 'debug')
  if (stream) stream.stop()
  connect()
}

exports.connect = connect
exports.restart = restart
