const express = require('express')
const router = express.Router()

const controller = require('./twilio.controller')

router.post('/trackDelivery/:id', controller.trackDelivery)

module.exports = router
