/**
* Created by sojharo on 14/11/2017.
*/
'use strict'

// Development specific configuration
// ==================================
module.exports = {

  // Server port
  port: process.env.PORT || 3000,

  // Secure Server port
  secure_port: process.env.SECURE_PORT || 8444,

  kibo_ip: process.env.KIBOPUSH_IP || 'http://localhost:3000',

  domain: `${process.env.DOMAIN || 'https://swebhook.cloudkibo.com'}`,

  facebook: {
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: `${process.env.DOMAIN}/auth/facebook/callback`
  },

  API_URL: 'https://staging.kibopush.com/api/',

  ACCOUNTS_URL: 'https://saccounts.cloudkibo.com/api/v1/',

  CHAT_URL: 'https://skibochat.cloudkibo.com/api/',

  ENGAGE_URL: 'https://skiboengage.cloudkibo.com/api/',

  DEMOSSA_URL: 'https://www.synaps3webrtc.com/',

  ENGAGE_DBLAYER: `http://159.89.46.75/api/v1/`,

  CHAT_DBLAYER: `http://165.227.65.154/api/v1/`,

  papertrail_log_levels: process.env.PAPERTRAIL_LOG_LEVELS || 'error'
}
