const express = require('express')

const router = express.Router()

const controller = require('./wordpress.controller')

// NOTE: Code inside this might need to change
router.post('/webhook', controller.postPublish)

module.exports = router
