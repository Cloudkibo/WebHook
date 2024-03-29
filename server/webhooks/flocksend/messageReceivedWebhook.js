const { callApi } = require('../../utility/api.caller.service')
// const logger = require('../../components/logger')
// const TAG = 'flockSend.controller.js'

exports.messageReceivedWebhook = (payload) => {
  let data = {
    provider: 'flockSend',
    event: payload
  }
  callApi('whatsAppEvents/messageReceived', 'post', data, 'kibochat')
  // createContact(payload)
  //   .then(result => {
  //     callApi('flockSendEvents/messageReceived', 'post', payload, 'kibochat')
  //   })
  //   .catch(error => {
  //     logger.serverLog(TAG, `Failed to save contact ${error}`, 'error')
  //   })
}

// function createContact (body) {
//   let number = `+${body.phone_number}`
//   let query = [
//     { $match: { 'flockSendWhatsApp.accessToken': body.user_id } }
//   ]
//   return new Promise((resolve, reject) => {
//     callApi(`companyprofile/aggregate`, 'post', query, 'accounts')
//       .then(companies => {
//         if (companies && companies.length > 0) {
//           companies.forEach((company, index) => {
//             callApi(`whatsAppContacts/query`, 'post', { number: number, companyId: company._id }, 'accounts')
//               .then(contact => {
//                 contact = contact[0]
//                 if (!contact) {
//                   callApi(`whatsAppContacts`, 'post', {
//                     name: body.wa_user_name && body.wa_user_name !== '' ? body.wa_user_name : number,
//                     number: number,
//                     companyId: company._id
//                   }, 'accounts')
//                     .then(contact => {
//                       if (index === companies.length - 1) {
//                         resolve()
//                       }
//                     })
//                     .catch(() => {
//                       if (index === companies.length - 1) {
//                         resolve()
//                       }
//                     })
//                 } else {
//                   if (contact.name === contact.number && body.wa_user_name && body.wa_user_name !== '') {
//                     callApi(`whatsAppContacts/update`, 'put', {
//                       query: { _id: contact._id },
//                       newPayload: { name: body.wa_user_name },
//                       options: {}
//                     }, 'accounts')
//                       .then(contact => {
//                       })
//                   }
//                   if (index === companies.length - 1) {
//                     resolve()
//                   }
//                 }
//               })
//               .catch(error => {
//                 reject(error)
//               })
//           })
//         } else {
//           reject(new Error())
//         }
//       })
//       .catch(error => {
//         reject(error)
//       })
//   })
// }
