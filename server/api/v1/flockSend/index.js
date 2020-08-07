const express = require('express')
const router = express.Router()

const controller = require('./flockSend.controller')

router.post('/', controller.webhook)

module.exports = router
