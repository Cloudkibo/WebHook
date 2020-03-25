const {callApi} = require('../../../utility/api.caller.service')
const {sendResponseToTwilio} = require('../../global/twilio')

exports.trackDelivery = function (req, res) {
  if (req.body.MessageStatus === 'delivered') {
    let query = {
      purpose: 'updateOne',
      match: {_id: req.params.id},
      updated: {$inc: { sent: 1 }}
    }
    callApi(`smsBroadcasts`, 'put', query, 'engageDbLayer')
      .then(updated => {
      })
    .catch(err => {
      return res.status(500).json({
        status: 'failed',
        description: `Internal server error in updating plan usage ${err}`
      })
    })
  }
  sendResponseToTwilio(res)
}

exports.receiveSms = function (req, res) {
  callApi('twilioEvents', 'post', req.body, 'kibochat')
  sendResponseToTwilio(res)
}
