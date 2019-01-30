const TAG = 'webhook_subscriptions/messenger/profilePicWebhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')

exports.profilePicWebhook = (payload) => {
  logger.serverLog(TAG,
    `in profilePicWebhook ${JSON.stringify(payload)}`)
  let data = {senderId: payload.entry[0].uid, profilePic: payload.entry[0].changes[0].value}
  callApi.callApi('messengerEvents/updateProfilePic', 'post', data, 'kiboengage')
  .then((response) => {
    logger.serverLog(TAG, `response recieved from KiboPush: ${response}`)
  })
  .catch((err) => {
    logger.serverLog(TAG, `error from KiboPush: ${err}`)
  })
}
