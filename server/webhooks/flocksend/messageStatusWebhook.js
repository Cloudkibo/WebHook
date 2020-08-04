const { callApi } = require('../../../utility/api.caller.service')

exports.messageStatusWebhook = (payload) => {
  callApi('whatsAppEvents/messageStatus', 'post', payload, 'kiboengage')
  callApi('whatsAppEvents/messageStatus', 'post', payload, 'kibochat')
}
