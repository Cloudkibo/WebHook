const {callApi} = require('../../../utility/api.caller.service')
const logger = require('../../../components/logger')
const TAG = 'flockSend.controller.js'

exports.index = function (req, res) {
  return res.status(200).json({status: 'success'})
}
exports.messageReceived = function (req, res) {
  res.status(200).json({status: 'success'})
  let query = [
    {$match: {'flockSendWhatsApp.token': req.body.user_id}}
  ]
  let number = `+${req.body.phone_number}`
  callApi(`companyprofile/aggregate`, 'post', query, 'accounts')
    .then(companies => {
      companies.forEach((company) => {
        callApi(`whatsAppContacts/query`, 'post', {number: number, companyId: company._id}, 'accounts')
          .then(contact => {
            contact = contact[0]
            if (contact) {
              callApi('flockSendEvents/messageReceived', 'post', req.body, 'kibochat')
            } else {
              callApi(`whatsAppContacts`, 'post', {
                name: number,
                number: number,
                companyId: company._id}, 'accounts')
                .then(contact => {
                  callApi('flockSendEvents/messageReceived', 'post', req.body, 'kibochat')
                })
            }
          })
          .catch(error => {
            logger.serverLog(TAG, `Failed to fetch contact ${JSON.stringify(error)}`, 'error')
          })
      })
    })
    .catch(error => {
      logger.serverLog(TAG, `Failed to company profile ${JSON.stringify(error)}`, 'error')
    })
}
