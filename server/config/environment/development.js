/**
 * Created by sojharo on 24/07/2017.
 */
'use strict'

// Development specific configuration
// ==================================
module.exports = {
  // Server port
  port: 3020,

  // Secure Server port
  secure_port: 8440,

  kibo_ip: 'http://localhost:3000',

  domain: 'http://localhost:3020',

  facebook: {
    clientID: process.env.FACEBOOK_ID || '159385484629940',
    clientSecret: process.env.FACEBOOK_SECRET || '67527aa04570a034b6ff67335d95e91c',
    callbackURL: `${process.env.DOMAIN || 'https://kibopush-sojharo.ngrok.io'}/auth/facebook/callback`
  },

  API_URL: 'http://localhost:3000/api/',

  ACCOUNTS_URL: 'http://localhost:3024/api/v1/',

  CHAT_URL: 'http://localhost:3022/api/',

  ENGAGE_URL: 'http://localhost:3021/api/'
}
