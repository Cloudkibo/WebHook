const callApi = require('../../../utility/api.caller.service')

exports.trackDelivery = function (req, res) {
  if (req.body.MessageStatus === 'delivered') {
    let query = {
      purpose: 'updateOne',
      match: {_id: req.params.id},
      updated: {$inc: { sent: 1 }}
    }
    callApi.callApi(`smsBroadcasts`, 'put', query, 'engageDbLayer')
      .then(updated => {
      })
    .catch(err => {
      return res.status(500).json({
        status: 'failed',
        description: `Internal server error in updating plan usage ${err}`
      })
    })
  }
  return res.status(200).json({ status: 'success' })
}
exports.trackDeliveryWhatsApp = function (req, res) {
  let query = {}
  if (req.body.SmsStatus === 'delivered' && req.body.EventType === 'DELIVERED') {
    query = {
      purpose: 'updateOne',
      match: {_id: req.params.id},
      updated: {$inc: { sent: 1 }}
    }
  } else if (req.body.SmsStatus === 'delivered' && req.body.EventType === 'READ') {
    query = {
      purpose: 'updateOne',
      match: {_id: req.params.id},
      updated: {$inc: { seen: 1 }}
    }
  }
  if (query !== {}) {
    callApi.callApi(`whatsAppBroadcasts`, 'put', query, 'engageDbLayer')
      .then(updated => {
      })
    .catch(err => {
      return res.status(500).json({
        status: 'failed',
        description: `Internal server error in updating plan usage ${err}`
      })
    })
  }
  return res.status(200).json({ status: 'success' })
}

exports.trackStatusWhatsAppChat = function (req, res) {
  console.log('trackStatusWhatsAppChat', req.body)
  let query = {}
  if (req.body.SmsStatus === 'delivered' && req.body.EventType && req.body.EventType === 'READ') {
    console.log('going to update')
    query = {
      purpose: 'updateOne',
      match: {_id: req.params.id},
      updated: {status: 'seen', seenDateTime: Date.now}
    }
    callApi.callApi(`whatsAppChat`, 'put', query, 'chatDbLayer')
      .then(updated => {
      })
    .catch(err => {
      return res.status(500).json({
        status: 'failed',
        description: `Internal server error in updating plan usage ${err}`
      })
    })
  }
  return res.status(200).json({ status: 'success' })
}

exports.receiveSms = function (req, res) {
  callApi.callApi('twilioEvents', 'post', req.body, 'kibochat')
  return res.status(200).json({ status: 'success' })
}
exports.receiveWhatsApp = function (req, res) {
  callApi.callApi('twilioEvents/whatsApp', 'post', req.body, 'kibochat')
  return res.status(200).json({ status: 'success' })
}