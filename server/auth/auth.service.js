/**
 * Created by sojharo on 24/07/2017.
 */
'use strict'

// const config = require('../config/environment')
// const jwt = require('jsonwebtoken')
// const expressJwt = require('express-jwt')
const compose = require('composable-middleware')
// const validateJwt = expressJwt({secret: config.secrets.session})
// const _ = require('lodash')
const config = require('../config/environment')

// NOTE: Modify this for your work
// eslint-disable-next-line no-unused-vars
function isAuthorizedWebHookTrigger () {
  return compose().use((req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress ||
      req.socket.remoteAddress || req.connection.socket.remoteAddress
    // logger.serverLog(TAG, req.ip, 'debug')
    // logger.serverLog(TAG, ip, 'debug')
    // logger.serverLog(TAG, 'This is middleware', 'debug')
    // logger.serverLog(TAG, req.body, 'debug')
    if (ip === '::ffff:' + config.kibo_ip) next()
    else res.send(403)
  })
}

exports.isAuthorizedWebHookTrigger = isAuthorizedWebHookTrigger
