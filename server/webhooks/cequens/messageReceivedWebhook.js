const { callApi } = require('../../utility/api.caller.service')

exports.messageReceivedWebhook = (payload) => {
  let data = {
    provider: 'cequens',
    event: payload
  }
  callApi('whatsAppEvents/messageReceived', 'post', data, 'kibochat')
}
