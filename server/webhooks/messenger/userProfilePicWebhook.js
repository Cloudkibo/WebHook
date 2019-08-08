const TAG = 'webhooks/messenger/profilePicWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')

exports.userProfilePicWebhook = (payload) => {
  // logger.serverLog(TAG, `in profilePicWebhook ${JSON.stringify(payload)}`)
  let data = {senderId: payload.entry[0].uid, profilePic: payload.entry[0].changes[0].value}
  callApi('messengerEvents/updateProfilePic', 'post', data, 'kiboengage')
    .then((response) => {
      logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
    })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
    })
}
