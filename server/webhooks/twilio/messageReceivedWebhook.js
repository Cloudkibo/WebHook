const { callApi } = require('../../utility/api.caller.service')
// const TAG = 'twilio.controller.js'
// const logger = require('../../../components/logger')

exports.messageReceivedWebhook = function (payload) {
  callApi(`whatsAppEvents/messageReceived`, 'post', payload, 'kibochat')
  //   console.log('Twilio receiveWhatsApp', req.body)
  //   let from = req.body.From.substring(9)
  //   callApi(`companyprofile/query`, 'post', {'twilioWhatsApp.accountSID': req.body.AccountSid}, 'accounts')
  //     .then(company => {
  //       callApi(`whatsAppContacts/query`, 'post', {number: from, companyId: company._id}, 'accounts')
  //         .then(contact => {
  //           contact = contact[0]
  //           if (contact) {
  //             callApi('twilioEvents/whatsAppMessage', 'post', {contactId: contact._id, payload: req.body}, 'kibochat')
  //           } else {
  //             callApi(`whatsAppContacts`, 'post', {
  //               name: from,
  //               number: from,
  //               companyId: company._id}, 'accounts')
  //               .then(contact => {
  //                 callApi('twilioEvents/whatsAppMessage', 'post', {contactId: contact._id, payload: req.body}, 'kibochat')
  //               })
  //           }
  //         })
  //         .catch(error => {
  //           logger.serverLog(TAG, `Failed to fetch contact ${JSON.stringify(error)}`, 'error')
  //         })
  //     })
  //     .catch(error => {
  //       logger.serverLog(TAG, `Failed to company profile ${JSON.stringify(error)}`, 'error')
  //     })
}
