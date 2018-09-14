/**
 * Created by sojharo on 14/11/2017.
 */
 'use strict'

 // Development specific configuration
 // ==================================
 module.exports = {
   facebook: {
     clientID: process.env.FACEBOOK_ID,
     clientSecret: process.env.FACEBOOK_SECRET,
     callbackURL: `${process.env.DOMAIN}/auth/facebook/callback`
   }
 }
