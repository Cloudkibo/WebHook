const TAG = 'webhook_subscriptions/jsonAd/jsonAdWebhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')
const logicLayer = require('../getStarted/logiclayer')
const request = require('request')

exports.jsonAdWebhook = (payload) => {
  logger.serverLog(TAG, `in  ${JSON.stringify(payload)}`)
  var postback = payload.entry[0].messaging[0].postback
  if (postback.payload) {
    var jsonAdPayload = postback.payload.split('-')
    if (jsonAdPayload.length > 1) {
      var jsonMessageId = jsonAdPayload[1]
      callApi.callApi(`jsonAd/jsonAdResponse/${jsonMessageId}`, 'get', {}, 'accounts')
        .then((response) => {
          sendResponseMessage(response)
        })
        .catch(err => {
          logger.serverLog(TAG, `error from accounts jsonAdResponse: ${err}`)
        })
    }
  }
}

function sendResponseMessage (payload, response) {
  const sender = payload.entry[0].messaging[0].sender.id
  const pageId = payload.entry[0].messaging[0].recipient.id
  callApi.callApi(`pages/query`, 'post', { pageId: pageId, connected: true }, 'accounts')
    .then(page => {
      page = page[0]
      console.log('page Found', page)
      callApi.callApi(`subscribers/query`, 'post', { pageId: page._id, senderId: sender }, 'accounts')
        .then(subscriber => {
          subscriber = subscriber[0]
          console.log('page._id', page._id)
          if (response.messageContent) {
            for (let i = 0; i < response.messageContent.length; i++) {
              let messageData = logicLayer.prepareSendAPIPayload(subscriber.senderId, response.messageContent[i], subscriber.firstName, subscriber.lastName, true)
              console.log('messageData', messageData)
              request(
                {
                  'method': 'POST',
                  'json': true,
                  'formData': messageData,
                  'uri': 'https://graph.facebook.com/v2.6/me/messages?access_token=' +
                    subscriber.pageId.accessToken
                },
                (err, res) => {
                  if (err) {
                    console.log(`At send jsonAd response ${JSON.stringify(err)}`)
                  } else {
                    console.log('res', res.body)
                    if (res.statusCode !== 200) {
                      logger.serverLog(TAG,
                        `At send message jsonAd response ${JSON.stringify(
                          res.body.error)}`)
                    }
                  }
                })
            }
          }
        })
        .catch(err => {
          logger.serverLog(TAG, `Failed to fetch subscriber ${JSON.stringify(err)}`)
        })
    })
    .catch(err => {
      logger.serverLog(TAG, `Failed to fetch page ${JSON.stringify(err)}`)
    })
}
