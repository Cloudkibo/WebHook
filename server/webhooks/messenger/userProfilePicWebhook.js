const TAG = 'webhooks/messenger/profilePicWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')

exports.userProfilePicWebhook = (payload) => {
  // logger.serverLog(TAG, `in profilePicWebhook ${JSON.stringify(payload)}`)
  let data = {senderId: payload.entry[0].uid, profilePic: payload.entry[0].changes[0].value}
  callApi('messengerEvents/updateProfilePic', 'post', data, 'kiboengage')
    .then((response) => {
      logger.serverLog('Response from KiboEngage', `${TAG}: exports.userProfilePicWebhook`, {}, {payload, response}, 'debug')
    })
    .catch((err) => {
      const message = err || 'Response from KiboEngage'
      logger.serverLog(message, `${TAG}: exports.userProfilePicWebhook`, {}, {payload}, 'error')
    })
}
