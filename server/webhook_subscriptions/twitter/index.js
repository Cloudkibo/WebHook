const express = require('express')
const router = express.Router()

const controller = require('./twitter.controller')

router.get('/restart', controller.restart)

router.get('/', controller.verifyHook)
router.post('/', controller.webhook)

module.exports = router
