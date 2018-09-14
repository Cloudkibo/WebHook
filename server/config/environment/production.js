/**
 * Created by sojharo on 24/07/2017.
 */

// Production specific configuration
// ==================================
module.exports = {
  facebook: {
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: `${process.env.DOMAIN}/auth/facebook/callback`
  }
}
