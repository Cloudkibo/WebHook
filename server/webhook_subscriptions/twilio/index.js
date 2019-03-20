const express = require('express')
const router = express.Router()

const controller = require('./twilio.controller')
const validate = require('express-jsonschema').validate
const validationSchema = require('./validationSchema')

router.post('/trackDelivery/:id', controller.trackDelivery)
router.post('/receiveSms',
  validate({body: validationSchema.payload}),
  controller.receiveSms)

module.exports = router
