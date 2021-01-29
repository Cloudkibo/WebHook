const { callApi } = require('../../utility/api.caller.service')

exports.messageStatusWebhook = (payload) => {
  let data = {
    provider: 'cequens',
    event: payload
  }
  callApi('whatsAppEvents/messageStatus', 'post', data, 'kiboengage')
  callApi('whatsAppEvents/messageStatus', 'post', data, 'kibochat')
}
