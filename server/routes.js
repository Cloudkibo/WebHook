/**
 * Main application routes
 */
'use strict'

const config = require('./config/environment/index')
// const Raven = require('raven')
const Sentry = require('@sentry/node')
const logger = require('../server/components/logger')
const TAG = 'server/routes.js'

module.exports = function (app) {
  // NOTE: uncomment or add more here according to
  // requirement. Discuss with me. Sojharo

  // app.use('/api/v1/things', require('./api/v1/thing'))
  app.use('/webhooks/messenger', require('./api/v1/messenger'))
  app.use('/api/twitter', require('./webhook_subscriptions/twitter'))
  app.use('/webhooks/wordpress', require('./webhook_subscriptions/wordpress'))
  app.use('/webhooks/twilio', require('./api/v1/twilio'))
  app.use('/webhooks/zoom', require('./api/v1/zoom'))
  app.use('/webhooks/flockSend', require('./api/v1/flockSend'))

  app.route('/:url(api|auth)/*').get((req, res) => {
    res.status(404).send({url: `${req.originalUrl} not found`})
  }).post((req, res) => {
    res.status(404).send({url: `${req.originalUrl} not found`})
  })

  app.route('/*').get((req, res) => {
    res.status(404).send({url: `${req.originalUrl} not found`})
  }).post((req, res) => {
    res.status(404).send({url: `${req.originalUrl} not found`})
  })
  app.use(function (err, req, res, next) {
    // This console.log is for production error trace
    // which doesn't get to papertrail.
    // This will be removed once we install sentry for this
    // project.
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

    /*
    Setup a general error handler for JsonSchemaValidation errors.
  */
  app.use(function (err, req, res, next) {
    if (err.name === 'JsonSchemaValidation') {
      const responseData = {
        statusText: 'Bad Request',
        jsonSchemaValidation: true,
        validations: err.validations
      }

      const message = err || `JsonSchemaValidation error`
      logger.serverLog(message, `${TAG}: ${req.path ? req.path : req.originalUrl}`, req.body, {responseData}, 'error')

      res.status(400).json(responseData)
    } else {
  // pass error to next error middleware handler
      next(err)
    }
  })

  if (config.env === 'production' || config.env === 'staging') {
    app.use(Sentry.Handlers.requestHandler())
    app.use(Sentry.Handlers.errorHandler())
  }
}
