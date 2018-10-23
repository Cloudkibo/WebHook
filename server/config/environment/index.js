/**
 * Created by sojharo on 20/07/2017.
 */

const path = require('path')
const _ = require('lodash')

const all = {

  env: process.env.NODE_ENV,

  // Project root path
  root: path.normalize(`${__dirname}/../../..`),

  // Server port
  port: process.env.PORT || 3000,

  // Secure Server port
  secure_port: process.env.SECURE_PORT || 8443,

  // pubsubhubbub port
  pubsub_port: process.env.PUBSUB_PORT || 1337,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: process.env.SESSION_SECRET || 'f83b0cd6ccb20142185616dsf54dsf4'
  },

  ip: process.env.OPENSHIFT_NODEJS_IP ||
  process.env.IP ||
  undefined,

  kibo_ip: process.env.KIBOPUSH_IP || 'http://localhost:3000',

  domain: `${process.env.DOMAIN || 'https://webhook.cloudkibo.com'}`,

  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  pubsubhubbub: {
    secret: process.env.SESSION_SECRET || 'f83b0cd6ccb20142185616dsf54dsf4',
    callbackUrl: `${process.env.DOMAIN || 'https://webhook.cloudkibo.com'}/api/autoposting/pubsub/webhook`
  },

  twitter: {
    consumer_key: process.env.TWITTER_CONSUMER_KEY || 'f83b0cd6ccb20142185616dsf54dsf4',
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET || 'f83b0cd6ccb20142185616dsf54dsf4',
    consumer_token: process.env.TWITTER_TOKEN || 'f83b0cd6ccb20142185616dsf54dsf4',
    consumer_token_secret: process.env.TWITTER_TOKEN_SECRET || 'f83b0cd6ccb20142185616dsf54dsf4',
    callbackUrl: `${process.env.DOMAIN || 'https://staging.kibopush.com'}/api/autoposting/twitter`
  },

  API_URL: process.env.NODE_ENV === 'production' ? 'https://app.kibopush.com/api/' : process.env.NODE_ENV === 'staging' ? 'https://staging.kibopush.com/api/' : 'http://localhost:3000/api/',

  ACCOUNTS_URL: process.env.NODE_ENV === 'production' ? 'https://accounts.cloudkibo.com/api/v1/' : process.env.NODE_ENV === 'staging' ? 'https://saccounts.cloudkibo.com/api/v1/' : 'http://localhost:3000/api/v1/',

  CHAT_URL: process.env.NODE_ENV === 'production' ? 'https://kibochat.cloudkibo.com/api/' : process.env.NODE_ENV === 'staging' ? 'https://skibochat.cloudkibo.com/api/' : 'http://localhost:3000/api/',

  ENGAGE_URL: process.env.NODE_ENV === 'production' ? 'https://kiboengage.cloudkibo.com/api/' : process.env.NODE_ENV === 'staging' ? 'https://skiboengage.cloudkibo.com/api/' : 'http://localhost:3000/api/'
}

module.exports = _.merge(
  all,
  require(`./${process.env.NODE_ENV}.js`) || {})
