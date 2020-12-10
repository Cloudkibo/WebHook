const {callApi} = require('../../../utility/api.caller.service')
const {sendResponseToTwilio} = require('../../global/twilio')

exports.trackDelivery = function (req, res) {
  callApi(`twilioEvents/trackDeliverySms/${req.params.id}`, 'post', req.body, 'kiboengage')
  sendResponseToTwilio(res)
}

exports.receiveSms = function (req, res) {
  callApi('twilioEvents', 'post', req.body, 'kibochat')
  sendResponseToTwilio(res)
}
