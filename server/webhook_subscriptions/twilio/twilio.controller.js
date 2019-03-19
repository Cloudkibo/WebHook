const callApi = require('../../utility/api.caller.service')

exports.trackDelivery = function (req, res) {
  if (req.body.MessageStatus === 'delivered') {
    let query = {
      purpose: 'updateOne',
      match: {_id: req.params.id},
      updated: {$inc: { sent: 1 }}
    }
    callApi.callApi(`smsBroadcasts`, 'put', query, 'engageDbLayer')
      .then(updated => {
        console.log('updated', updated)
      })
    .catch(err => {
      return res.status(500).json({
        status: 'failed',
        description: `Internal server error in updating plan usage ${err}`
      })
    })
  }
  return res.status(200).json({ status: 'success' })
}
exports.receiveSms = function (req, res) {
  callApi.callApi('twilioEvents', 'post', req.body, 'kibochat')
  return res.status(200).json({ status: 'success' })
}
