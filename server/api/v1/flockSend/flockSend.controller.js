const {callApi} = require('../../../utility/api.caller.service')
const logger = require('../../../components/logger')
const TAG = 'flockSend.controller.js'

exports.index = function (req, res) {
  return res.status(200).json({status: 'success'})
}
exports.messageStatus = function (req, res) {
  res.status(200).json({status: 'success'})
  callApi('flockSendEvents/messageStatus', 'post', req.body, 'kiboengage')
}
exports.messageReceived = function (req, res) {
  res.status(200).json({status: 'success'})
  createContact(req.body)
  .then(result => {
    callApi('flockSendEvents/messageReceived', 'post', req.body, 'kibochat')
  })
  .catch(error => {
    logger.serverLog(TAG, `Failed to save contact ${error}`, 'error')
  })
}
function createContact (body) {
  let number = `+${body.phone_number}`
  let query = [
    {$match: {'flockSendWhatsApp.accessToken': body.user_id}}
  ]
  return new Promise((resolve, reject) => {
    callApi(`companyprofile/aggregate`, 'post', query, 'accounts')
      .then(companies => {
        if (companies && companies.length > 0) {
          companies.forEach((company, index) => {
            callApi(`whatsAppContacts/query`, 'post', {number: number, companyId: company._id}, 'accounts')
              .then(contact => {
                contact = contact[0]
                if (!contact) {
                  callApi(`whatsAppContacts`, 'post', {
                    name: number,
                    number: number,
                    companyId: company._id}, 'accounts')
                    .then(contact => {
                      if (index === companies.length - 1) {
                        resolve()
                      }
                    })
                }
                if (index === companies.length - 1) {
                  resolve()
                }
              })
              .catch(error => {
                reject(error)
              })
          })
        } else {
          reject(new Error())
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}
