const { callApi } = require('../../utility/api.caller.service')

exports.messageStatusWebhook = function (payload) {
  let data = {
    provider: 'twilio',
    event: payload
  }
  callApi(`whatsAppEvents/messageStatus`, 'post', data, 'kiboengage')
  callApi(`whatsAppEvents/messageStatus`, 'post', data, 'kibochat')
}

// exports.trackDeliveryWhatsApp = function (req, res) {
//   callApi(`twilioEvents/trackDeliveryWhatsApp/${req.params.id}`, 'post', req.body, 'kiboengage')
//   sendResponseToTwilio(res)
// }

// exports.trackStatusWhatsAppChat = function (req, res) {
//   callApi(`twilioEvents/trackStatusWhatsAppChat/${req.params.id}`, 'post', req.body, 'kibochat')
//   sendResponseToTwilio(res)
// }
