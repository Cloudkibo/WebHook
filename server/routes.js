/**
 * Main application routes
 */
const config = require('./config/environment/index')
const Raven = require('raven')

'use strict'

module.exports = function (app) {
  // NOTE: uncomment or add more here according to
  // requirement. Discuss with me. Sojharo

  // app.use('/api/v1/things', require('./api/v1/thing'))
  app.use('/webhooks/messenger', require('./webhook_subscriptions/messenger'))

  app.use('/api/twitter', require('./webhook_subscriptions/twitter'))

  app.use('/webhooks/wordpress', require('./webhook_subscriptions/wordpress'))

  app.use('/webhooks/twilio', require('./webhook_subscriptions/twilio'))

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

  if (config.env === 'production' || config.env === 'staging') {
    app.use(Raven.errorHandler())
  }
}
