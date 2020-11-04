const {callApi} = require('../../../utility/api.caller.service')
const TAG = 'whatsApp.controller.js'
const logger = require('../../../components/logger')
const {sendResponseToTwilio} = require('../../global/twilio')

exports.trackDeliveryWhatsApp = function (req, res) {
  callApi(`twilioEvents/trackDeliveryWhatsApp/${req.params.id}`, 'post', req.body, 'kiboengage')
  sendResponseToTwilio(res)
}

exports.trackStatusWhatsAppChat = function (req, res) {
  callApi(`twilioEvents/trackStatusWhatsAppChat/${req.params.id}`, 'post', req.body, 'kibochat')
  sendResponseToTwilio(res)
}

exports.receiveWhatsApp = function (req, res) {
  console.log('req.body', req.body)
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
          const message = error || 'Failed to fetch contact'
          logger.serverLog(message, `${TAG}: exports.receiveWhatsApp`, req.body, {companyId: company._id}, 'error')
        })
    })
    .catch(error => {
      const message = error || 'Failed to fetch company profile'
      logger.serverLog(message, `${TAG}: exports.receiveWhatsApp`, req.body, {}, 'error')
    })
  sendResponseToTwilio(res)
}
