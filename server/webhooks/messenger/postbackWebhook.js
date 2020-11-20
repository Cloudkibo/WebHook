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
  console.log(`postbackWebhook ${JSON.stringify(payload)}`)
  if (resp[0]) {
    for (let i = 0; i < resp.length; i++) {
      payload.entry[0].messaging[0].postback.payload = JSON.stringify(resp[i])
      if (resp[i].action && (resp[i].action === 'subscribe' || resp[i].action === 'subscribe_to_sequence')) {
        callApi('messengerEvents/subscribeToSequence', 'post', payload, 'kiboengage')
          .then((response) => {
            logger.serverLog('Response from KiboEngage', `${TAG}: exports.postbackWebhook`, {}, {payload, response}, 'debug')
          })
          .catch((err) => {
            const message = err || 'Error response from KiboEngage'
            logger.serverLog(message, `${TAG}: exports.postbackWebhook`, {}, {payload}, 'error')
          })
      } else if (resp[i].action && (resp[i].action === 'unsubscribe' || resp[i].action === 'unsubscribe_from_sequence')) {
        callApi('messengerEvents/unsubscribeFromSequence', 'post', payload, 'kiboengage')
          .then((response) => {
            logger.serverLog('Response from KiboEngage', `${TAG}: exports.postbackWebhook`, {}, {payload, response}, 'debug')
          })
          .catch((err) => {
            const message = err || 'Error response from KiboEngage'
            logger.serverLog(message, `${TAG}: exports.postbackWebhook`, {}, {payload}, 'error')
          })
      } else if (resp[i].action && resp[i].action === 'set_custom_field') {
        callApi('messengerEvents/setCustomField', 'post', payload, 'kiboengage')
          .then((response) => {
            logger.serverLog('Response from KiboEngage', `${TAG}: exports.postbackWebhook`, {}, {payload, response}, 'debug')
          })
          .catch((err) => {
            const message = err || 'Error response from KiboEngage'
            logger.serverLog(message, `${TAG}: exports.postbackWebhook`, {}, {payload}, 'error')
          })
      } else if (resp[i].action && resp[i].action === 'google_sheets') {
        callApi('messengerEvents/googleSheets', 'post', payload, 'kiboengage')
          .then((response) => {
            logger.serverLog('Response from KiboEngage', `${TAG}: exports.postbackWebhook`, {}, {payload, response}, 'debug')
          })
          .catch((err) => {
            const message = err || 'Error response from KiboEngage'
            logger.serverLog(message, `${TAG}: exports.postbackWebhook`, {}, {payload}, 'error')
          })
      } else if (resp[i].action && resp[i].action === 'hubspot') {
        callApi('messengerEvents/hubspot', 'post', payload, 'kiboengage')
          .then((response) => {
            logger.serverLog('Response from KiboEngage', `${TAG}: exports.postbackWebhook`, {}, {payload, response}, 'debug')
          })
          .catch((err) => {
            const message = err || 'Error response from KiboEngage'
            logger.serverLog(message, `${TAG}: exports.postbackWebhook`, {}, {payload}, 'error')
          })
      } else if (resp[i].action && resp[i].action === 'send_sequence_message') {
        callApi('messengerEvents/sendSequenceMessage', 'post', payload, 'kiboengage')
          .then((response) => {
            logger.serverLog('Response from KiboEngage', `${TAG}: exports.postbackWebhook`, {}, {payload, response}, 'debug')
          })
          .catch((err) => {
            const message = err || 'Error response from KiboEngage'
            logger.serverLog(message, `${TAG}: exports.postbackWebhook`, {}, {payload}, 'error')
          })
      } else if (resp[i].action && resp[i].action === 'send_message_block') {
        callApi('messengerEvents/sendMessageBlock', 'post', payload, 'kiboengage')
          .then((response) => {
            logger.serverLog('Response from KiboEngage', `${TAG}: exports.postbackWebhook`, {}, {payload, response}, 'debug')
          })
          .catch((err) => {
            const message = err || 'Error response from KiboEngage'
            logger.serverLog(message, `${TAG}: exports.postbackWebhook`, {}, {payload}, 'error')
          })
      } else if (resp[i].componentType) {
        callApi('messengerEvents/menuReply', 'post', payload, 'kiboengage')
          .then((response) => {
            logger.serverLog('Response from KiboEngage', `${TAG}: exports.postbackWebhook`, {}, {payload, response}, 'debug')
          })
          .catch((err) => {
            const message = err || 'Error response from KiboEngage'
            logger.serverLog(message, `${TAG}: exports.postbackWebhook`, {}, {payload}, 'error')
          })
      } else if (resp[i].action === '_chatbot') {
        callApi('messengerEvents/postback', 'post', payload, 'kibochat')
        .then((response) => {
          logger.serverLog(TAG, `response recieved from KiboChat: ${response}`, 'debug')
        })
        .catch((err) => {
          logger.serverLog(TAG, `error from KiboChat: ${err}`, 'error')
        })
      }
    }
  } else if (!resp[0]) {
    if (resp.survey_id) {
      callApi('messengerEvents/surveyResponse', 'post', payload, 'kiboengage')
        .then((response) => {
          logger.serverLog('Response from KiboEngage', `${TAG}: exports.postbackWebhook`, {}, {payload, response}, 'debug')
        })
        .catch((err) => {
          const message = err || 'Error response from KiboEngage'
          logger.serverLog(message, `${TAG}: exports.postbackWebhook`, {}, {payload}, 'error')
        })
    } else if (resp.unsubscribe) {
      handleUnsubscribe(resp, payload.entry[0].messaging[0])
    } else if (resp.action === 'subscribe' || resp.action === 'subscribe_to_sequence') {
      callApi('messengerEvents/subscribeToSequence', 'post', payload, 'kiboengage')
        .then((response) => {
          logger.serverLog('Response from KiboEngage', `${TAG}: exports.postbackWebhook`, {}, {payload, response}, 'debug')
        })
        .catch((err) => {
          const message = err || 'Error response from KiboEngage'
          logger.serverLog(message, `${TAG}: exports.postbackWebhook`, {}, {payload}, 'error')
        })
    } else if (resp.action === 'unsubscribe' || resp.action === 'unsubscribe_from_sequence') {
      callApi('messengerEvents/unsubscribeFromSequence', 'post', payload, 'kiboengage')
        .then((response) => {
          logger.serverLog('Response from KiboEngage', `${TAG}: exports.postbackWebhook`, {}, {payload, response}, 'debug')
        })
        .catch((err) => {
          const message = err || 'Error response from KiboEngage'
          logger.serverLog(message, `${TAG}: exports.postbackWebhook`, {}, {payload}, 'error')
        })
    } else if (resp.action === 'set_custom_field') {
      callApi('messengerEvents/setCustomField', 'post', payload, 'kiboengage')
        .then((response) => {
          logger.serverLog('Response from KiboEngage', `${TAG}: exports.postbackWebhook`, {}, {payload, response}, 'debug')
        })
        .catch((err) => {
          const message = err || 'Error response from KiboEngage'
          logger.serverLog(message, `${TAG}: exports.postbackWebhook`, {}, {payload}, 'error')
        })
    } else if (resp.action === 'google_sheets') {
      callApi('messengerEvents/googleSheets', 'post', payload, 'kiboengage')
        .then((response) => {
          logger.serverLog('Response from KiboEngage', `${TAG}: exports.postbackWebhook`, {}, {payload, response}, 'debug')
        })
        .catch((err) => {
          const message = err || 'Error response from KiboEngage'
          logger.serverLog(message, `${TAG}: exports.postbackWebhook`, {}, {payload}, 'error')
        })
    } else if (resp.action === 'hubspot') {
      callApi('messengerEvents/hubspot', 'post', payload, 'kiboengage')
        .then((response) => {
          logger.serverLog('Response from KiboEngage', `${TAG}: exports.postbackWebhook`, {}, {payload, response}, 'debug')
        })
        .catch((err) => {
          const message = err || 'Error response from KiboEngage'
          logger.serverLog(message, `${TAG}: exports.postbackWebhook`, {}, {payload}, 'error')
        })
    } else if (resp.action === 'send_sequence_message') {
      callApi('messengerEvents/sendSequenceMessage', 'post', payload, 'kiboengage')
        .then((response) => {
          logger.serverLog('Response from KiboEngage', `${TAG}: exports.postbackWebhook`, {}, {payload, response}, 'debug')
        })
        .catch((err) => {
          const message = err || 'Error response from KiboEngage'
          logger.serverLog(message, `${TAG}: exports.postbackWebhook`, {}, {payload}, 'error')
        })
    } else if (resp.action === 'send_message_block') {
      callApi('messengerEvents/sendMessageBlock', 'post', payload, 'kiboengage')
        .then((response) => {
          logger.serverLog('Response from KiboEngage', `${TAG}: exports.postbackWebhook`, {}, {payload, response}, 'debug')
        })
        .catch((err) => {
          const message = err || 'Error response from KiboEngage'
          logger.serverLog(message, `${TAG}: exports.postbackWebhook`, {}, {payload}, 'error')
        })
    } else if (resp.action === 'unsubscribe_from_rssFeed') {
      callApi('messengerEvents/rssFeeds/changeSubscription', 'post', payload, 'kiboengage')
        .then((response) => {
          logger.serverLog('Response from KiboEngage', `${TAG}: exports.postbackWebhook`, {}, {payload, response}, 'debug')
        })
        .catch((err) => {
          const message = err || 'Error response from KiboEngage'
          logger.serverLog(message, `${TAG}: exports.postbackWebhook`, {}, {payload}, 'error')
        })
    } else if (resp.action === 'subscribe_to_rssFeed') {
      callApi('messengerEvents/rssFeeds/changeSubscription', 'post', payload, 'kiboengage')
        .then((response) => {
          logger.serverLog('Response from KiboEngage', `${TAG}: exports.postbackWebhook`, {}, {payload, response}, 'debug')
        })
        .catch((err) => {
          const message = err || 'Error response from KiboEngage'
          logger.serverLog(message, `${TAG}: exports.postbackWebhook`, {}, {payload}, 'error')
        })
    } else if (resp.action === 'show_more_topics') {
      callApi('messengerEvents/rssFeeds/showMoreTopics', 'post', payload, 'kiboengage')
        .then((response) => {
          logger.serverLog('Response from KiboEngage', `${TAG}: exports.postbackWebhook`, {}, {payload, response}, 'debug')
        })
        .catch((err) => {
          const message = err || 'Error response from KiboEngage'
          logger.serverLog(message, `${TAG}: exports.postbackWebhook`, {}, {payload}, 'error')
        })
    } else if (resp.action === 'send_menu_reply') {
      callApi('messengerEvents/menuReply', 'post', payload, 'kiboengage')
        .then((response) => {
          logger.serverLog('Response from KiboEngage', `${TAG}: exports.postbackWebhook`, {}, {payload, response}, 'debug')
        })
        .catch((err) => {
          const message = err || 'Error response from KiboEngage'
          logger.serverLog(message, `${TAG}: exports.postbackWebhook`, {}, {payload}, 'error')
        })
    } else if ((resp.action === 'send_tweet' || resp.action === 'do_not_send_tweet') && resp.autopostingId && resp.tweetId) {
      callApi('autoposting/handleTweetModeration', 'post', payload, 'kiboengage')
        .then((response) => {
          logger.serverLog('Response from KiboEngage', `${TAG}: exports.postbackWebhook`, {}, {payload, response}, 'debug')
        })
        .catch((err) => {
          const message = err || 'Error response from KiboEngage'
          logger.serverLog(message, `${TAG}: exports.postbackWebhook`, {}, {payload}, 'error')
        })
    } else if (resp.type === 'DYNAMIC' || resp.type === 'STATIC') {
      callApi('messengerEvents/postback', 'post', payload, 'kibochat')
        .then((response) => {
          logger.serverLog('Response from KiboChat', `${TAG}: exports.postbackWebhook`, {}, {payload, response}, 'debug')
        })
        .catch((err) => {
          const message = err || 'Error response from KiboChat'
          logger.serverLog(message, `${TAG}: exports.postbackWebhook`, {}, {payload}, 'error')
        })
    }
  } else if (jsonAdPayload && jsonAdPayload.length > 0 && jsonAdPayload[0] === 'JSONAD') {
    var jsonMessageId = jsonAdPayload[1]
    subscribeIncomingUser(payload, jsonMessageId)
  }
}

function handleUnsubscribe (resp, req) {
  let messageData = {}
  if (resp.action === 'yes') {
    messageData = {
      text: 'You have unsubscribed from our broadcasts. Send "start" to subscribe again.',
      'metadata': 'This is a meta data'
    }
    callApi(`pages/query`, 'post', { pageId: req.recipient.id, connected: true }, 'accounts')
      .then(pages => {
        let page = pages[0]
        if (page) {
          callApi(`subscribers/update`, 'put', { query: { senderId: req.sender.id, pageId: page._id }, newPayload: { isSubscribed: false }, options: {} }, 'accounts')
            .then(updated => {
              // logger.serverLog(TAG, `updated subscriber: ${JSON.stringify(updated)}`, 'debug')
              callApi(`subscribers/query`, 'post', { senderId: req.sender.id, pageId: page._id }, 'accounts')
                .then(subscribers => {
                  let subscriber = subscribers[0]
                  if (subscriber) {
                    handleNewsSubscription(subscriber)
                    callApi('featureUsage/updateCompany', 'put', { query: { companyId: subscriber.companyId }, newPayload: { $inc: { subscribers: -1 } }, options: {} }, 'accounts')
                      .then(updated => {
                        logger.serverLog('Company Usage updated successfully', `${TAG}: function::handleUnsubscribe`, {}, {companyId: subscriber.companyId}, 'debug')
                      })
                      .catch(err => {
                        const message = err || 'Failed to update company usage'
                        logger.serverLog(message, `${TAG}: function::handleUnsubscribe`, {}, {companyId: subscriber.companyId}, 'error')
                      })
                  }
                })
                .catch(err => {
                  const message = err || 'Failed to fetch subscriber'
                  logger.serverLog(message, `${TAG}: function::handleUnsubscribe`, {}, {response: resp, request: req}, 'error')
                })
            })
            .catch(err => {
              const message = err || 'Failed to update subscriber'
              logger.serverLog(message, `${TAG}: function::handleUnsubscribe`, {}, {response: resp, request: req}, 'error')
            })
        }
      })
      .catch(err => {
        const message = err || 'Failed to fetch page'
        logger.serverLog(message, `${TAG}: function::handleUnsubscribe`, {}, {response: resp, request: req}, 'error')
      })
  } else {
    messageData = {
      text: 'You can unsubscribe anytime by saying stop.'
    }
  }
  needle.get(
    `https://graph.facebook.com/v6.0/${req.recipient.id}?fields=access_token&access_token=${resp.userToken}`,
    (err3, response) => {
      if (err3) {
        const message = err3 || 'Page Token error from graph API'
        logger.serverLog(message, `${TAG}: function::handleUnsubscribe`, {}, {response: response}, 'error')
      }
      const data = {
        messaging_type: 'RESPONSE',
        recipient: JSON.stringify({ id: req.sender.id }), // this is the subscriber id
        message: messageData
      }
      needle.post(
        `https://graph.facebook.com/v6.0/me/messages?access_token=${response.body.access_token}`,
        data, (err4, respp) => {
          // logger.serverLog(TAG, `ressp.body ${JSON.stringify(respp.body)}`, 'debug')
          logger.serverLog('Sending unsubscribe confirmation response to subscriber', `${TAG}: exports.postbackWebhook`, {}, {data, responseBody: respp.body}, 'debug')
        })
    })
}

function handleNewsSubscription (subscriber) {
  let defaultQuery = {
    purpose: 'findAll',
    match: { defaultFeed: true, companyId: subscriber.companyId }
  }
  let subscriptionQuery = {
    purpose: 'findAll',
    match: { 'subscriberId._id': subscriber._id }
  }
  callApi(`newsSections/query`, 'post', defaultQuery, 'engageDbLayer')
    .then(defaultNewsSections => {
      callApi(`newsSubscriptions/query`, 'post', subscriptionQuery, 'engageDbLayer')
        .then(newsSubscriptions => {
          if (newsSubscriptions.length > 0) {
            let subscriptionIds = newsSubscriptions.filter(n => n.subscription === true).map(s => s._id)
            let newsIds = newsSubscriptions.filter(a => a.subscription === true).map(n => n.newsSectionId)
            updateSubscription({ _id: { $in: subscriptionIds } })
            updateSubscriptionCount({ _id: { $in: newsIds } })
            let defaultSubscriptions = []
            let defaultNewsSectionIds = defaultNewsSections.map(a => a._id)
            let newsSubscriptionsIds = newsSubscriptions.map(n => n.newsSectionId)
            defaultSubscriptions = defaultNewsSectionIds.filter((item) => !newsSubscriptionsIds.includes(item))
            if (defaultSubscriptions.length > 0) {
              updateSubscriptionCount({ _id: { $in: defaultSubscriptions } })
            }
          } else {
            updateSubscriptionCount({ defaultFeed: true, companyId: subscriber.companyId })
          }
        })
        .catch(err => {
          const message = err || 'Failed to fetch subscriptions'
          logger.serverLog(message, `${TAG}: function::handleNewsSubscription`, {}, {subscriber}, 'error')
        })
    })
    .catch(err => {
      const message = err || 'Failed to fetch default feeds'
      logger.serverLog(message, `${TAG}: function::handleNewsSubscription`, {}, {subscriber}, 'error')
    })
}

function updateSubscriptionCount (query) {
  let updateQuery = {
    purpose: 'updateAll',
    match: query,
    updated: { $inc: { subscriptions: -1 } }
  }
  callApi(`newsSections`, 'put', updateQuery, 'engageDbLayer')
    .then(updated => {
    })
    .catch(err => {
      const message = err || 'Failed to update suscription count for default'
      logger.serverLog(message, `${TAG}: function::updateSubscriptionCount`, {}, {query}, 'error')
    })
}

function updateSubscription (query) {
  let updateQuery = {
    purpose: 'updateAll',
    match: query,
    updated: { subscription: false }
  }
  callApi(`newsSubscriptions`, 'put', updateQuery, 'engageDbLayer')
    .then(updated => {
    })
    .catch(err => {
      const message = err || 'Failed to update subscriptions'
      logger.serverLog(message, `${TAG}: function::updateSubscriptionCount`, {}, {query}, 'error')
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
                'uri': 'https://graph.facebook.com/v6.0/me/messages?access_token=' +
                  accessToken
              },
              (err, res) => {
                if (err) {
                  const message = err || 'Error  send message jsonAd response'
                  logger.serverLog(message, `${TAG}: function::sendResponseMessage`, {}, {page, senderId}, 'error')
                } else {
                  if (res.statusCode !== 200) {
                    const message = res.body && res.body.error ? res.body.error.message : 'Error send message jsonAd response'
                    logger.serverLog(message, `${TAG}: function::sendResponseMessage`, {}, {page, senderId, error: res.body.error}, 'error')
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
          const message = err || 'Error from account getting all json messages'
          logger.serverLog(message, `${TAG}: function::getResponseMessage`, {}, {page, senderId}, 'error')
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
                `https://graph.facebook.com/v6.0/${page.pageId}?fields=access_token&access_token=${page.accessToken}`,
                (err, resp2) => {
                  if (err) {
                    const message = err || 'Error from facebook'
                    logger.serverLog(message, `${TAG}: function::subscribeIncomingUser`, {}, {payload, jsonMessageId}, 'error')
                  }
                  // logger.serverLog(TAG, `page access token: ${JSON.stringify(resp2.body)}`, 'debug')
                  let pageAccessToken = resp2.body.access_token
                  const options = {
                    url: `https://graph.facebook.com/v6.0/${sender}?fields=gender,first_name,last_name,locale,profile_pic,timezone&access_token=${pageAccessToken}`,
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
            const message = err || 'Failed to fetch subscriber'
            logger.serverLog(message, `${TAG}: function::subscribeIncomingUser`, {}, {payload, jsonMessageId}, 'error')
          })
      }
    })
    .catch(err => {
      const message = err || 'Failed to fetch page'
      logger.serverLog(message, `${TAG}: function::subscribeIncomingUser`, {}, {payload, jsonMessageId}, 'error')
    })
}
