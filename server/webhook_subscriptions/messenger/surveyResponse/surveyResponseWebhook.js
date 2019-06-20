const TAG = 'webhook_subscriptions/messenger/surveyResponseWebhook.js'
const logger = require('../../../components/logger')
const callApi = require('../../../utility/api.caller.service')
const needle = require('needle')

exports.surveyResponseWebhook = (payload) => {
  if (payload.entry[0].messaging[0].postback.payload !== '<GET_STARTED_PAYLOAD>') {
    logger.serverLog(TAG,
      `in surveyResponseWebhook ${JSON.stringify(payload)}`)
    let resp = JSON.parse(payload.entry[0].messaging[0].postback.payload)
    if (resp.survey_id) {
      callApi.callApi('messengerEvents/surveyResponse', 'post', payload, 'kiboengage')
            .then((response) => {
              logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
            })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
    })
    } else if (resp.unsubscribe) {
      handleUnsubscribe(resp, payload.entry[0].messaging[0])
    } else if (resp.action === 'subscribe') {
      callApi.callApi('messengerEvents/subscribeToSequence', 'post', payload, 'kiboengage')
      .then((response) => {
        logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
      })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
    })
    } else if (resp.action === 'unsubscribe') {
      callApi.callApi('messengerEvents/unsubscribeFromSequence', 'post', payload, 'kiboengage')
      .then((response) => {
        logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
      })
      .catch((err) => {
        logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
      })
    } else if ((resp.action === 'send_tweet' || resp.action === 'do_not_send_tweet') && resp.autopostingId && resp.tweetId) {
      callApi.callApi('autoposting/handleTweetModeration', 'post', payload, 'kiboengage')
        .then((response) => {
          logger.serverLog(TAG, `response recieved from KiboEngage: ${response}`, 'debug')
        })
        .catch((err) => {
          logger.serverLog(TAG, `error from KiboEngage: ${err}`, 'error')
        })
    } else {
      callApi.callApi('messengerEvents/menu', 'post', payload, 'accounts')
      .then((response) => {
        logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
      })
    .catch((err) => {
      logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
    })
    }
  }
}

function handleUnsubscribe (resp, req) {
  let messageData = {}
  if (resp.action === 'yes') {
    messageData = {
      text: 'You have unsubscribed from our broadcasts. Send "start" to subscribe again.'
    }
    callApi.callApi(`subscribers/update`, 'put', {query: { senderId: req.sender.id }, newPayload: { isSubscribed: false }, options: {}}, 'accounts')
      .then(updated => {
        logger.serverLog(TAG, `updated subscriber: ${JSON.stringify(updated)}`, 'debug')
        callApi.callApi(`subscribers/query`, 'post', { senderId: req.sender.id }, 'accounts')
          .then(subscribers => {
            let subscriber = subscribers[0]
            callApi.callApi(`pages/query`, 'post', { _id: subscriber.pageId._id }, 'accounts')
              .then(pages => {
                let page = pages[0]
                callApi.callApi(`tags/query`, 'post', { tag: `_${page.pageId}_unsubscribe`, defaultTag: true }, 'accounts')
                  .then(unsubscribeTag => {
                    unsubscribeTag = unsubscribeTag[0]
                    // assign tag
                    needle('post', `https://graph.facebook.com/v2.11/${unsubscribeTag.labelFbId}/label?access_token=${page.accessToken}`, {'user': req.sender.id})
                      .then(response => {
                        if (response.body.error) {
                          logger.serverLog(TAG, `Failed to assign unsubscribeTag ${JSON.stringify(response.body.error)}`, 'error')
                        } else {
                          logger.serverLog(TAG, 'unsubscribeTag assigned succssfully!')
                        }
                      })
                      .catch(err => {
                        logger.serverLog(TAG, `Failed to assign unsubscribeTag ${JSON.stringify(err)}`, 'error')
                      })
                  })
                  .catch(err => {
                    logger.serverLog(TAG, `Failed to fetch default tag ${JSON.stringify(err)}`, 'error')
                  })
              })
              .catch(err => {
                logger.serverLog(TAG, `Failed to fetch page ${JSON.stringify(err)}`, 'error')
              })
            logger.serverLog(TAG, `subscriber fetched ${JSON.stringify(subscriber)}`, 'debug')
            callApi.callApi('featureUsage/updatePlanUsage', 'put', {query: {companyId: subscriber.companyId}, newPayload: { $inc: { subscribers: -1 } }, options: {}}, 'accounts')
              .then(updated => {
                logger.serverLog(TAG, `company usage incremented succssfully ${JSON.stringify(updated)}`, 'debug')
              })
              .catch(err => {
                logger.serverLog(TAG, `Failed to update company usage ${JSON.stringify(err)}`, 'error')
              })
          })
          .catch(err => {
            logger.serverLog(TAG, `Failed to fetch subscriber ${JSON.stringify(err)}`, 'error')
          })
      })
      .catch(err => {
        logger.serverLog(TAG, `Failed to update subscriber ${JSON.stringify(err)}`, 'error')
      })
  } else {
    messageData = {
      text: 'You can unsubscribe anytime by saying stop.'
    }
  }
  needle.get(
    `https://graph.facebook.com/v2.10/${req.recipient.id}?fields=access_token&access_token=${resp.userToken}`,
    (err3, response) => {
      if (err3) {
        logger.serverLog(TAG,
          `Page token error from graph api ${JSON.stringify(err3)}`, 'error')
      }
      const data = {
        messaging_type: 'RESPONSE',
        recipient: JSON.stringify({ id: req.sender.id }), // this is the subscriber id
        message: messageData
      }
      needle.post(
        `https://graph.facebook.com/v2.6/me/messages?access_token=${response.body.access_token}`,
        data, (err4, respp) => {
          logger.serverLog(TAG, `ressp.body ${JSON.stringify(respp.body)}`, 'debug')
          logger.serverLog(TAG,
            `Sending unsubscribe confirmation response to subscriber  ${JSON.stringify(
              respp.body)}`, 'debug')
        })
    })
}
