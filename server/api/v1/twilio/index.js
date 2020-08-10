const express = require('express')
const router = express.Router()

const smsController = require('./sms.controller')
const twilioController = require('./twilio.controller')
const validate = require('express-jsonschema').validate
const validationSchema = require('./validationSchema')

//  SMS
router.post('/trackDelivery/:id', smsController.trackDelivery)
router.post('/receiveSms',
  validate({ body: validationSchema.payload }),
  smsController.receiveSms)

//  WhatsApp
router.post('/', twilioController.webhook)
// router.post('/trackDeliveryWhatsApp/:id', whatsAppController.trackDeliveryWhatsApp)
// router.post('/trackStatusWhatsAppChat/:id', whatsAppController.trackStatusWhatsAppChat)
// router.post('/receiveWhatsApp',
//   validate({body: validationSchema.payload}),
//   whatsAppController.receiveWhatsApp)

module.exports = router
