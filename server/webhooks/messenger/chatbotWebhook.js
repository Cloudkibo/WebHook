const TAG = 'webhooks/messenger/chatbotWebhook'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')
const LogicLayer = require('./../logicLayer/createNewSubscriber.logiclayer')
const Global = require('./../../global/global')

exports.chatbotWebhook = (payload) => {
  // Note: we are fetching subscriber info from facebook so that
  // we can get subscriber info of admin, to use his first name
  // and last name in messenger message
  const pageId = payload.entry[0].messaging[0].recipient.id
  const senderId = payload.entry[0].messaging[0].sender.id
  callApi(`pages/query`, 'post', { pageId: pageId, connected: true }, 'accounts')
    .then(pages => {
      let page = pages[0]
      if (page) {
        Global.getRefreshedPageAccessToken(page.pageId, page.accessToken)
          .then(pageAccessToken => {
            return LogicLayer.getSubscriberInfoFromFB(senderId, pageAccessToken, page)
          })
          .then(subscriberInfo => {
            subscriberInfo = subscriberInfo.body
            subscriberInfo.firstName = subscriberInfo.first_name
            subscriberInfo.lastName = subscriberInfo.last_name
            payload.subscriberInfo = subscriberInfo
            callApi('messengerEvents/chatbotOptin', 'post', payload, 'kibochat')
              .then((response) => {
                logger.serverLog('Response from KiboChat', `${TAG}: exports.chatbotWebhook`, {}, {payload, response}, 'error')
              })
              .catch((err) => {
                const message = err || 'Error from KiboChat'
                logger.serverLog(message, `${TAG}: exports.chatbotWebhook`, {}, {payload}, 'error')
              })
          })
          .catch(err => {
            const message = err || 'Error from Get Refresh Access Token'
            logger.serverLog(message, `${TAG}: exports.chatbotWebhook`, {}, {payload}, 'error')
          })
      }
    })
}
