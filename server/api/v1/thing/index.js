'use strict'

const express = require('express')

const router = express.Router()

// const logger = require('../../components/logger')
// const TAG = 'api/thing/index'

router.get('/', (req, res) => {
  res.status(200).json({status: 'success', payload: []})
})
