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

const logger = require('../components/logger')

const TAG = 'auth/auth.service.js'

// NOTE: Modify this for your work
// eslint-disable-next-line no-unused-vars
function isAuthorizedWebHookTrigger () {
  return compose().use((req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress ||
      req.socket.remoteAddress || req.connection.socket.remoteAddress
    logger.serverLog(TAG, req.ip)
    logger.serverLog(TAG, ip)
    logger.serverLog(TAG, 'This is middleware')
    logger.serverLog(TAG, req.body)
    if (ip === '162.243.215.177') next()
    else res.send(403)
  })
}

exports.isAuthorizedWebHookTrigger = isAuthorizedWebHookTrigger
