const { createNewSubscriber } = require('../logicLayer/createNewSubscriber.js')

exports.messengerReferralWebhook = (payload) => {
  // logger.serverLog(TAG, `in newSubscriberWebhook ${JSON.stringify(payload)}`, 'debug')
  const event = payload.entry[0].messaging[0]
  const senderId = event.message && event.message.is_echo ? event.recipient.id : event.sender.id
  const pageId = event.message && event.message.is_echo ? event.sender.id : event.recipient.id
  createNewSubscriber(pageId, senderId, 'messaging_referrals', '', null, event)
}
