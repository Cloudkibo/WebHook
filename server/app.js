/**
 * Created by sojharo on 20/07/2017.
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'development' // production

const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/environment/index')

const app = express()
const httpApp = express()

const appObj = (config.env === 'production' || config.env === 'staging') ? app : httpApp

// NOTE: Uncomment from following as per requirement
// and take their code from KiboPush if already not
// available here.
require('./config/express')(appObj)
require('./config/setup')(app, httpApp, config)
// require('./config/integrations/pubsubhubbub')()
//  require('./webhook_subscriptions/twitter/twitter.controller').connect()

require('./webhook_subscriptions/messenger/registerWebhooks').registeryInit()
require('./webhook_subscriptions/twitter/registerWebhooks').registeryInit()
require('./webhook_subscriptions/wordpress/registerWebhooks').registeryInit()
require('./routes')(appObj)
