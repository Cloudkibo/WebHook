const express = require('express')
const router = express.Router()

const controller = require('./twilio.controller')
const validate = require('express-jsonschema').validate
const validationSchema = require('./validationSchema')

//  SMS
router.post('/trackDelivery/:id', controller.trackDelivery)
router.post('/receiveSms',
  validate({body: validationSchema.payload}),
  controller.receiveSms)

//  WhatsApp
router.post('/trackDeliveryWhatsApp/:id', controller.trackDeliveryWhatsApp)
router.post('/trackStatusWhatsAppChat/:id', controller.trackStatusWhatsAppChat)
router.post('/receiveWhatsApp',
  validate({body: validationSchema.payload}),
  controller.receiveWhatsApp)

module.exports = router
