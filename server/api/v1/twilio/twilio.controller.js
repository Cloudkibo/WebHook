const {callApi} = require('../../../utility/api.caller.service')
const TAG = 'twilio.controller.js'
const logger = require('../../../components/logger')

exports.trackDelivery = function (req, res) {
  if (req.body.MessageStatus === 'delivered') {
    let query = {
      purpose: 'updateOne',
      match: {_id: req.params.id},
      updated: {$inc: { sent: 1 }}
    }
    callApi(`smsBroadcasts`, 'put', query, 'engageDbLayer')
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
  res.status(200).json({ status: 'success' })
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
    callApi(`whatsAppBroadcasts`, 'put', query, 'engageDbLayer')
      .then(updated => {
      })
    .catch(err => {
      return res.status(500).json({
        status: 'failed',
        description: `Internal server error in updating plan usage ${err}`
      })
    })
  }
}

exports.trackStatusWhatsAppChat = function (req, res) {
  let query = {}
  if (req.body.SmsStatus === 'delivered' && req.body.EventType && req.body.EventType === 'READ') {
    query = {
      purpose: 'updateOne',
      match: {_id: req.params.id},
      updated: {status: 'seen', seenDateTime: Date.now}
    }
    callApi(`whatsAppChat`, 'put', query, 'chatDbLayer')
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


exports.receiveWhatsApp = function (req, res) {
  res.status(200).json({ status: 'success' })
  let from = req.body.From.substring(9)
  callApi(`companyprofile/query`, 'post', {'twilioWhatsApp.accountSID': req.body.AccountSid}, 'accounts')
    .then(company => {
      callApi(`whatsAppContacts/query`, 'post', {number: from, companyId: company._id}, 'accounts')
        .then(contact => {
          if (contact.length > 0) {
            callApi('twilioEvents/whatsAppMessage', 'post', req.body, 'kibochat')
          } else {
            callApi(`whatsAppContacts`, 'post', {
              name: from,
              number: from,
              companyId: company._id}, 'accounts')
              .then(contact => {
                callApi('twilioEvents/whatsAppMessage', 'post', req.body, 'kibochat')
              })
          }
        })
        .catch(error => {
          logger.serverLog(TAG, `Failed to fetch contact ${JSON.stringify(error)}`, 'error')
        })
    })
    .catch(error => {
      logger.serverLog(TAG, `Failed to company profile ${JSON.stringify(error)}`, 'error')
    })
}
