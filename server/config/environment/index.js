/**
 * Created by sojharo on 20/07/2017.
 */

const path = require('path')
const _ = require('lodash')

const all = {

  env: process.env.NODE_ENV,

  // Project root path
  root: path.normalize(`${__dirname}/../../..`),

  // pubsubhubbub port
  pubsub_port: process.env.PUBSUB_PORT || 1337,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: process.env.SESSION_SECRET || 'f83b0cd6ccb20142185616dsf54dsf4'
  },

  ip: process.env.OPENSHIFT_NODEJS_IP ||
  process.env.IP ||
  undefined,

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
    consumer_key: process.env.TWITTER_CONSUMER_KEY || '593k5gKrh5iJZ9Yfj7DwMhD6P',
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET || 'FiAaaa3z6ZPSQd1A954UaErHYkk0h51LoYNJpYCd9JQH5UEPjG',
    consumer_token: process.env.TWITTER_TOKEN || '1059331127113080832-7BRFuE18tyLXmdUZORbW2z3Xu1SC6S',
    consumer_token_secret: process.env.TWITTER_TOKEN_SECRET || 'HvdJuX3jZ4bWIURLJvNNETvY8AVvmSwtFE8hn6251XUp3',
    callbackUrl: 'https://swebhooks.cloudkibo.com/api/twitter'
  },

  demoSSAPageIds: ['382154169188869', '350372502408394'],

  telcoPageId: ['975622025980854']
}

module.exports = _.merge(
  all,
  require(`./${process.env.NODE_ENV}.js`) || {})
