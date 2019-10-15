const {callApi} = require('../../../utility/api.caller.service')
const TAG = 'twilio.controller.js'
const logger = require('../../../components/logger')

exports.trackDeliveryWhatsApp = function (req, res) {
  callApi(`twilioEvents/trackDeliveryWhatsApp/${req.params.id}`, 'post', req.body, 'kiboengage')
  return res.status(200).json({ status: 'success' })
}

exports.trackStatusWhatsAppChat = function (req, res) {
  console.log('trackStatusWhatsAppChat', req.body)
  callApi(`twilioEvents/trackStatusWhatsAppChat/${req.params.id}`, 'post', req.body, 'kibochat')
  return res.status(200).json({ status: 'success' })
}

exports.receiveWhatsApp = function (req, res) {
  console.log('req.body', req.body)
  res.status(200).json({ status: 'success' })
  let from = req.body.From.substring(9)
  callApi(`companyprofile/query`, 'post', {'twilioWhatsApp.accountSID': req.body.AccountSid}, 'accounts')
    .then(company => {
      callApi(`whatsAppContacts/query`, 'post', {number: from, companyId: company._id}, 'accounts')
        .then(contact => {
          contact = contact[0]
          if (contact) {
            callApi('twilioEvents/whatsAppMessage', 'post', {contactId: contact._id, payload: req.body}, 'kibochat')
          } else {
            callApi(`whatsAppContacts`, 'post', {
              name: from,
              number: from,
              companyId: company._id}, 'accounts')
              .then(contact => {
                callApi('twilioEvents/whatsAppMessage', 'post', {contactId: contact._id, payload: req.body}, 'kibochat')
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
