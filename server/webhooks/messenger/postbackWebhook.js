const TAG = 'webhooks/messenger/getStartedWebhook.js'
const logger = require('../../components/logger')
const { callApi } = require('../../utility/api.caller.service')
const request = require('request')
const needle = require('needle')
const logicLayer = require('../logicLayer/postback.logiclayer.js')
const { newSubscriberWebhook } = require('./newSubscriberWebhook.js')

exports.postbackWebhook = (payload) => {
  let resp = ''
  if (logicLayer.isJsonString(payload.entry[0].messaging[0].postback.payload)) {
    resp = JSON.parse(payload.entry[0].messaging[0].postback.payload)
  } else {
    resp = payload.entry[0].messaging[0].postback.payload
    var jsonAdPayload = resp.split('-')
  }
  console.log('resp value', resp)
  console.log('resp.action', resp.action)
  console.log('resp[0]', resp[0])
  if (!resp[0] && resp.survey_id) {
    callApi('messengerEvents/surveyResponse', 'post', payload, 'kiboengage')
      .then((response) => {
        logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
      })
      .catch((err) => {
        logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
      })
  } else if (!resp[0] && resp.unsubscribe) {
    handleUnsubscribe(resp, payload.entry[0].messaging[0])
  } else if (!resp[0] && resp.action === 'subscribe') {
    callApi('messengerEvents/subscribeToSequence', 'post', payload, 'kiboengage')
      .then((response) => {
        logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
      })
      .catch((err) => {
        logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
      })
  } else if (!resp[0] && resp.action === 'unsubscribe') {
    callApi('messengerEvents/unsubscribeFromSequence', 'post', payload, 'kiboengage')
      .then((response) => {
        logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
      })
      .catch((err) => {
        logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
      })
  } else if (!resp[0] && resp.action === 'set_custom_field') {
    callApi('messengerEvents/setCustomField', 'post', payload, 'kiboengage')
      .then((response) => {
        logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
      })
      .catch((err) => {
        logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
      })
  } else if (!resp[0] && resp.action === 'google_sheets') {
    console.log('sending request to googleSheet')
    callApi('messengerEvents/googleSheets', 'post', payload, 'kiboengage')
      .then((response) => {
        console.log('send successfully googlesheet')
        logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
      })
      .catch((err) => {
        console.log('not send successfully googlesheet')
        logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
      })
  } else if (!resp[0] && resp.action === 'hubspot') {
    callApi('messengerEvents/hubspot', 'post', payload, 'kiboengage')
      .then((response) => {
        logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
      })
      .catch((err) => {
        logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
      })
  } else if ((resp.action === 'send_tweet' || resp.action === 'do_not_send_tweet') && resp.autopostingId && resp.tweetId) {
    callApi('autoposting/handleTweetModeration', 'post', payload, 'kiboengage')
      .then((response) => {
        logger.serverLog(TAG, `response recieved from KiboEngage: ${response}`, 'debug')
      })
      .catch((err) => {
        logger.serverLog(TAG, `error from KiboEngage: ${err}`, 'error')
      })
  } else if (!resp[0] && resp.action === 'send_sequence_message') {
    callApi('messengerEvents/sendSequenceMessage', 'post', payload, 'kiboengage')
      .then((response) => {
        logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
      })
      .catch((err) => {
        logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
      })
  } else if (!resp[0] && resp.action === 'send_message_block') {
    callApi('messengerEvents/sendMessageBlock', 'post', payload, 'kiboengage')
      .then((response) => {
        logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
      })
      .catch((err) => {
        logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
      })
  } else if (!resp[0] && resp.action === 'unsubscribe_from_rssFeed') {
    callApi('messengerEvents/rssFeeds/changeSubscription', 'post', payload, 'kiboengage')
      .then((response) => {
        logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
      })
      .catch((err) => {
        logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
      })
  } else if (!resp[0] && resp.action === 'subscribe_to_rssFeed') {
    callApi('messengerEvents/rssFeeds/changeSubscription', 'post', payload, 'kiboengage')
      .then((response) => {
        logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
      })
      .catch((err) => {
        logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
      })
  } else if (!resp[0] && resp.action === 'show_more_topics') {
    callApi('messengerEvents/rssFeeds/showMoreTopics', 'post', payload, 'kiboengage')
      .then((response) => {
        logger.serverLog(TAG, `response recieved from KiboPush: ${response}`, 'debug')
      })
      .catch((err) => {
        logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
      })
  } else if (jsonAdPayload && jsonAdPayload.length > 0 && jsonAdPayload[0] === 'JSONAD') {
    var jsonMessageId = jsonAdPayload[1]
    subscribeIncomingUser(payload, jsonMessageId)
  } else {
      if(payload.entry[0].messaging[0].postback && resp[0].componentType) {
      callApi('messengerEvents/menuReply', 'post', payload, 'kiboengage')
      .then((response) => {
        console.log(TAG, `response recieved from KiboPush: ${response}`)

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
    callApi(`subscribers/update`, 'put', {query: { senderId: req.sender.id }, newPayload: { isSubscribed: false }, options: {}}, 'accounts')
      .then(updated => {
        // logger.serverLog(TAG, `updated subscriber: ${JSON.stringify(updated)}`, 'debug')
        callApi(`subscribers/query`, 'post', { senderId: req.sender.id }, 'accounts')
          .then(subscribers => {
            let subscriber = subscribers[0]
            callApi(`pages/query`, 'post', { _id: subscriber.pageId._id }, 'accounts')
              .then(pages => {
                let page = pages[0]
                callApi(`tags/query`, 'post', { tag: `_${page.pageId}_unsubscribe`, defaultTag: true, companyId: page.companyId }, 'accounts')
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
            callApi('featureUsage/updateCompany', 'put', {query: {companyId: subscriber.companyId}, newPayload: { $inc: { subscribers: -1 } }, options: {}}, 'accounts')
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
          // logger.serverLog(TAG, `ressp.body ${JSON.stringify(respp.body)}`, 'debug')
          logger.serverLog(TAG,
            `Sending unsubscribe confirmation response to subscriber  ${JSON.stringify(
              respp.body)}`, 'debug')
        })
    })
}

function sendResponseMessage (page, senderId, firstName, lastName, accessToken, response, jsonAdMessages) {
  if (page) {
    if (response.messageContent) {
      for (let i = 0; i < response.messageContent.length; i++) {
        logicLayer.prepareSendAPIPayload(senderId, response.messageContent[i], firstName, lastName, true, jsonAdMessages)
        .then(result => {
          request(
            {
              'method': 'POST',
              'json': true,
              'formData': result.payload,
              'uri': 'https://graph.facebook.com/v2.6/me/messages?access_token=' +
                accessToken
            },
            (err, res) => {
              if (err) {
                logger.serverLog(TAG,
                  `At send message jsonAd response ${JSON.stringify(err)}`, 'error')
              } else {
                if (res.statusCode !== 200) {
                  logger.serverLog(TAG,
                    `At send message jsonAd response ${JSON.stringify(
                      res.body.error)}`, 'error')
                }
              }
            })
        })
      }
    }
  }
}

function getResponseMessage (page, senderId, firstName, lastName, accessToken, jsonMessageId) {
  callApi(`jsonAd/jsonAdResponse/${jsonMessageId}`, 'get', {}, 'accounts')
    .then((response) => {
      callApi(`jsonAd/${response.jsonAdId}`, 'get', {}, 'accounts')
        .then((jsonAd) => {
          // logger.serverLog(TAG, `jsonAd: ${jsonAd}`, 'debug')
          sendResponseMessage(page, senderId, firstName, lastName, accessToken, response, jsonAd.jsonAdMessages)
        })
        .catch(err => {
          logger.serverLog(TAG, `error from accounts getting all json messages: ${err}`, 'error')
        })
    })
}

function subscribeIncomingUser (payload, jsonMessageId) {
  const sender = payload.entry[0].messaging[0].sender.id
  const pageId = payload.entry[0].messaging[0].recipient.id
  callApi(`pages/query`, 'post', { pageId: pageId, connected: true }, 'accounts')
    .then(page => {
      page = page[0]
      if (page) {
        callApi(`subscribers/query`, 'post', { pageId: page._id, senderId: sender }, 'accounts')
          .then(subscriber => {
            subscriber = subscriber[0]
            if (subscriber) {
              getResponseMessage(page, subscriber.senderId, subscriber.firstName, subscriber.lastName, subscriber.pageId.accessToken, jsonMessageId)
            } else {
              newSubscriberWebhook(logicLayer.prepareSubscriberPayload(sender, pageId))
              needle.get(
                `https://graph.facebook.com/v2.10/${page.pageId}?fields=access_token&access_token=${page.accessToken}`,
                (err, resp2) => {
                  if (err) {
                    logger.serverLog(TAG, `ERROR ${JSON.stringify(err)}`, 'error')
                  }
                  // logger.serverLog(TAG, `page access token: ${JSON.stringify(resp2.body)}`, 'debug')
                  let pageAccessToken = resp2.body.access_token
                  const options = {
                    url: `https://graph.facebook.com/v2.10/${sender}?fields=gender,first_name,last_name,locale,profile_pic,timezone&access_token=${pageAccessToken}`,
                    qs: { access_token: page.accessToken },
                    method: 'GET'

                  }
                  // logger.serverLog(TAG, `options: ${JSON.stringify(options)}`, 'debug')
                  needle.get(options.url, options, (error, response) => {
                    if (error) {
                      // TODO remove this and use logger utility
                      // console.log('error', error)
                    } else {
                      getResponseMessage(page, sender, response.body.first_name, response.body.last_name, pageAccessToken, jsonMessageId)
                    }
                  })
                })
            }
          })
          .catch(err => {
            logger.serverLog(TAG, `Failed to fetch subscriber ${JSON.stringify(err)}`, 'error')
          })
      }
    })
    .catch(err => {
      logger.serverLog(TAG, `Failed to fetch page ${JSON.stringify(err)}`, 'error')
    })
}
