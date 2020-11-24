/**
 * Created by sojharo on 20/07/2017.
*/
process.env.NODE_ENV = process.env.NODE_ENV || 'development' // production

const express = require('express')
const config = require('./config/environment/index')
const Sentry = require('@sentry/node')

const app = express()
const httpApp = express()

const appObj = (config.env === 'production' || config.env === 'staging') ? app : httpApp

if (config.env === 'production' || config.env === 'staging') {
  Sentry.init({
    dsn: 'https://6c7958e0570f455381d6f17122fbd117@o132281.ingest.sentry.io/292307',
    release: `Webhook${config.env}@1.0.0`,
    debug: true,
    environment: config.env,
    serverName: 'Webhook',
    sendDefaultPii: true
  })
}

// NOTE: Uncomment from following as per requirement
// and take their code from KiboPush if already not
// available here.
require('./config/express')(appObj)
require('./config/setup')(app, httpApp, config)
// require('./config/integrations/pubsubhubbub')()
require('./webhook_subscriptions/twitter/twitter.controller').connect()

require('./api/v1/messenger/registerWebhooks').registeryInit()
require('./webhook_subscriptions/twitter/registerWebhooks').registeryInit()
require('./webhook_subscriptions/wordpress/registerWebhooks').registeryInit()
require('./api/v1/zoom/registerWebhooks').registeryInit()
require('./api/v1/twilio/registerWebhooks').registeryInit()
require('./api/v1/flockSend/registerWebhooks').registeryInit()
require('./routes')(appObj)
