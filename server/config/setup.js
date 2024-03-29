/**
 * Created by sojharo on 03/08/2017.
 */

const http = require('http')
const https = require('https')
const fs = require('fs')
const logger = require('./../components/logger')

const TAG = 'config/setup.js'

module.exports = function (app, httpapp, config) {
  let options = {
    ca: '',
    key: '',
    cert: ''
  }

  if (config.env === 'production') {
    try {
      options = {
        ca: fs.readFileSync('/root/certs/kibocdn.ca-bundle'),
        key: fs.readFileSync('/root/certs/kibocdn.key'),
        cert: fs.readFileSync('/root/certs/kibocdn.crt')
      }
    } catch (e) {

    }
  }
  if (config.env === 'staging') {
    try {
      options = {
        ca: fs.readFileSync('/root/certs/kibocdn.ca-bundle'),
        key: fs.readFileSync('/root/certs/kibocdn.key'),
        cert: fs.readFileSync('/root/certs/kibocdn.crt')
      }
    } catch (e) {

    }
  }
  const server = http.createServer(httpapp)
  const httpsServer = https.createServer(options, app)

  if (config.env === 'production' || config.env === 'staging') {
    httpapp.get('*', (req, res) => {
      res.redirect(`${config.domain}${req.url}`)
    })
  }

  server.listen(config.port, config.ip, () => {
    logger.serverLog(`KiboPush server STARTED on ${
      config.port} in ${config.env} mode`, TAG, {}, { port: config.port, env: config.env }, 'info')
  })

  httpsServer.listen(config.secure_port, () => {
    logger.serverLog(`KiboPush server STARTED on ${
      config.secure_port} in ${config.env} mode`, TAG, {}, { secure_port: config.secure_port, env: config.env }, 'info')
  })

  if (config.env === 'production' || config.env === 'staging') {
    logger.serverLog(`Webhook server STARTED on ${
      config.secure_port} in ${config.env} mode`, TAG, {}, { port: config.port, env: config.env }, 'info')
  }
}
