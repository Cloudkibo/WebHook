const express = require('express')
const router = express.Router()

const controller = require('./zoom.controller')

router.post('/', controller.webhook)

module.exports = router
