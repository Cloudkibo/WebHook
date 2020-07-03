const express = require('express')
const router = express.Router()

const controller = require('./flockSend.controller')
const validate = require('express-jsonschema').validate
const validationSchema = require('./validationSchema')

router.get('/', controller.index)
router.post('/',
  validate({body: validationSchema.payload}),
  controller.messageReceived)

module.exports = router
