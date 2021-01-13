const express = require('express')
const router = express.Router()

const controller = require('./cequens.controller')

router.post('/:number', controller.webhook)

module.exports = router
