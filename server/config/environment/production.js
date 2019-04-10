/**
 * Created by sojharo on 24/07/2017.
 */

// Production specific configuration
// ==================================
module.exports = {

  // Server port
  port: process.env.PORT || 3000,

  // Secure Server port
  secure_port: process.env.SECURE_PORT || 8443,

  kibo_ip: process.env.KIBOPUSH_IP || 'http://localhost:3000',

  domain: `${process.env.DOMAIN || 'https://webhook.cloudkibo.com'}`,

  facebook: {
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: `${process.env.DOMAIN}/auth/facebook/callback`
  },

  API_URL: 'https://app.kibopush.com/api/',

  ACCOUNTS_URL: 'https://accounts.cloudkibo.com/api/v1/',

  CHAT_URL: 'https://kibochat.cloudkibo.com/api/',

  ENGAGE_URL: 'https://kiboengage.cloudkibo.com/api/',

  DEMOSSA_URL: 'https://www.synaps3webrtc.com/',

  ENGAGE_DBLAYER: `http://142.93.179.77/api/v1/`,

  CHAT_DBLAYER: `http://104.248.240.146/api/v1/`

}
