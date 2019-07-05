const needle = require('needle')
const { callApi } = require('../../utility/api.caller.service')
const TAG = 'LogicLayer/createNewSubscriber.logiclayer.js'
const logger = require('../../components/logger')

exports.getSubscriberInfoFromFB = (sender, pageAccessToken, page) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `https://graph.facebook.com/v2.10/${sender}?fields=gender,first_name,last_name,locale,profile_pic,timezone&access_token=${pageAccessToken}`,
      qs: { access_token: page.accessToken },
      method: 'GET'
    }
    needle.get(options.url, options, (error, response) => {
      logger.serverLog(TAG, `Subscriber response git from facebook: ${JSON.stringify(response.body)}`, 'debug')
      if (error) {
        reject(error)
      } else {
        resolve(response)
      }
    })
  })
}

exports.prepareNewSubscriberPayload = (subscriber, page, subscriberSource, phoneNumber, senderId, ref) => {
  let payload = {
    firstName: subscriber.first_name,
    lastName: subscriber.last_name,
    locale: subscriber.locale,
    gender: subscriber.gender,
    timezone: subscriber.timezone,
    profilePic: subscriber.profile_pic,
    companyId: page.companyId,
    pageScopedId: '',
    email: '',
    senderId: senderId,
    pageId: page._id,
    isSubscribed: true
  }
  if (subscriberSource === 'customer_matching') {
    payload.phoneNumber = phoneNumber
    payload.source = 'customer_matching'
  } else if (subscriberSource === 'chat_plugin') {
    payload.source = 'chat_plugin'
  } else if (subscriberSource === 'messaging_referrals') {
    payload.source = `https://m.me/${page._id}?ref=${ref}`
  } else if (subscriberSource === 'landing_page') {
    payload.source = 'landing_page'
  } else if (subscriberSource === 'checkbox_plugin') {
    payload.source = 'checkbox_plugin'
  }
  return payload
}

exports.incrementSubscriberForCompany = (companyId) => {
  callApi(`featureUsage/updateCompany`, 'put', {query: {companyId: companyId}, newPayload: { $inc: { subscribers: 1 } }, options: {}}, 'accounts')
    .then(updated => {
      logger.serverLog(TAG, `company usage incremented successfully`, 'debug')
    })
    .catch(err => {
      logger.serverLog(TAG, `Failed to update company usage ${JSON.stringify(err)}`, 'error')
    })
}

exports.assignDefaultTags = (page, subscriber) => {
  let subscribersData = [
    {$match: {pageId: page._id}},
    {$group: {_id: null, count: {$sum: 1}}}
  ]
  callApi('subscribers/aggregate', 'post', subscribersData, 'accounts')
    .then(subscribersCount => {
      console.log('subscribersCount' , subscribersCount)
      let value = (subscribersCount[0].count - 1) % 10000
      let count = Math.floor(subscribersCount[0].count / 10000)
      if (value === 0 && subscribersCount[0].count > 10000) {
        createTag(page, subscriber, `_${page.pageId}_${count + 1}`)
      } else {
        console.log('Assign tag in else condition')
        assignTag(page, subscriber, `_${page.pageId}_${count + 1}`, count)
      }
      assignTag(page, subscriber, subscriber.gender, count)
      assignTag(page, subscriber, subscriber.locale, count)
    })
    .catch(err => logger.serverLog(TAG, `Failed to get subscribers count ${err}`, 'error'))
}

const assignTag = (page, subscriber, tag, count) => {
  callApi('tags/query', 'post', {tag: tag, pageId: page._id, companyId: page.companyId}, 'accounts')
    .then(tags => {
      if (tags.length === 0) {
        createTag(page, subscriber, `_${page.pageId}_${count + 1}`)
      } else {
        let tag = tags[0]
        needle('post', `https://graph.facebook.com/v2.11/${tag.labelFbId}/label?access_token=${page.accessToken}`, {'user': subscriber.senderId})
          .then(assignedLabel => {
            console.log('assigned label', assignedLabel)
            if (assignedLabel.error) logger.serverLog(TAG, `Error at save tag ${assignedLabel.error}`, 'error')
            let subscriberTagsPayload = {
              tagId: tag._id,
              subscriberId: subscriber._id,
              companyId: page.companyId
            }
            callApi(`tags_subscriber/`, 'post', subscriberTagsPayload, 'accounts')
              .then(newRecord => {
                logger.serverLog(TAG, `label associated successfully!`)
              })
              .catch(err => logger.serverLog(TAG, `Error at save tag ${err}`, 'error'))
          })
          .catch(err => logger.serverLog(TAG, `Error at save tag ${err}`, 'error'))
      }
    })
    .catch(err => {
      logger.serverLog(TAG, `Error at save tag ${err}`, 'error')
    })
}

const createTag = (page, subscriber, tag) => {
  needle('post', `https://graph.facebook.com/v2.11/me/custom_labels?accessToken=${page.accessToken}`)
    .then(label => {
      if (label.id) {
        let tagData = {
          tag: tag,
          userId: page.userId,
          companyId: page.companyId,
          pageId: page._id,
          labelFbId: label.id,
          defaultTag: true
        }
        callApi('tags', 'post', tagData, 'accounts')
          .then(created => {
            assignTag(page, subscriber, tag)
            logger.serverLog(TAG, `default tag created successfully!`)
          })
          .catch(err => {
            logger.serverLog(TAG, `Error at save tag ${err}`, 'error')
          })
      } else {
        logger.serverLog(TAG, `Error at create tag on Facebook ${label.error}`, 'error')
      }
    })
    .catch(err => {
      logger.serverLog(TAG, `Error at create tag on Facebook ${err}`, 'error')
    })
}

exports.updatePhoneNumberCustomerMatching = (identifier, pageId, companyId) => {
  callApi(`phone/update`, 'post', {query: {number: identifier, pageId: pageId, companyId: companyId}, newPayload: {hasSubscribed: true}, options: {}}, 'accounts')
    .then(phonenumberupdated => {
      logger.serverLog(TAG, `phone number updated successfully ${JSON.stringify(phonenumberupdated)}`, 'debug')
    })
    .catch(err => {
      logger.serverLog(TAG, `Failed to update phone number ${JSON.stringify(err)}`, 'error')
    })
}

exports.sendWebhookForNewSubscriber = (pageId, companyId, identifier, subscriber, _id) => {
  callApi('webhooks/query', 'post', {companyId: companyId, pageId: pageId}, 'accounts')
  .then(webhook => {
    webhook = webhook[0]
    if (webhook && webhook.isEnabled) {
      needle.get(webhook.webhook_url, (err, r) => {
        if (err) {
          logger.serverLog(TAG, err, 'error')
        } else if (r.statusCode === 200) {
          if (webhook && webhook.optIn.NEW_SUBSCRIBER) {
            var data = {
              subscription_type: 'NEW_SUBSCRIBER',
              payload: JSON.stringify({
                subscriberRefId: identifier,
                payload: {
                  firstName: subscriber.first_name,
                  lastName: subscriber.last_name,
                  locale: subscriber.locale,
                  gender: subscriber.gender,
                  timezone: subscriber.timezone,
                  profilePic: subscriber.profile_pic,
                  subscriberSenderId: _id
                }})
            }
            needle.post(webhook.webhook_url, data, {json: true},
              (error, response) => {
                if (error) logger.serverLog(TAG, err, 'error')
              })
          }
        } else {
          // webhookUtility.saveNotification(webhook)
        }
      })
    }
  })
  .catch((err) => {
    logger.serverLog(TAG, `error from KiboPush on Fetching Webhooks: ${err}`, 'error')
  })
}

exports.informGrowthTools = (subscriberSource, recipientId, senderId, companyId, referral) => {
  if (subscriberSource === 'messaging_referrals') {
    informMessengerRefUrlOfSubscriber(
      recipientId,
      senderId,
      referral
    )
  }
  if (subscriberSource === 'landing_page') {
    informLandingPageOfSubscriber(
      recipientId,
      senderId,
      companyId
    )
  }
}

const informMessengerRefUrlOfSubscriber = (recipientId, senderId, referral) => {
  callApi('messengerEvents/messagingReferrals', 'post', {
    pageId: recipientId,
    senderId: senderId,
    referral: referral }, 'kiboengage')
  .then((response) => {
    logger.serverLog(TAG, `response recieved from KiboEngage: ${response}`, 'debug')
  })
  .catch((err) => {
    logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
  })
}

const informLandingPageOfSubscriber = (recipientId, senderId, companyId) => {
  callApi('messengerEvents/landingPage', 'post', {
    pageId: recipientId,
    senderId: senderId,
    companyId: companyId
  }, 'kiboengage')
  .then((response) => {
    logger.serverLog(TAG, `response recieved from KiboEngage: ${response}`, 'debug')
  })
  .catch((err) => {
    logger.serverLog(TAG, `error from KiboPush: ${err}`, 'error')
  })
}

exports.updateList = (phoneNumber, sender, page) => {
  callApi(`phone/query`, 'post', {number: phoneNumber, hasSubscribed: true, pageId: page, companyId: page.companyId}, 'accounts')
    .then(number => {
      if (number.length > 0) {
        let subscriberFindCriteria = {
          source: 'customer_matching',
          senderId: sender,
          isSubscribed: true,
          phoneNumber: phoneNumber,
          pageId: page._id
        }
        callApi(`subscribers/query`, 'post', subscriberFindCriteria, 'accounts')
          .then(subscribers => {
            let temp = []
            for (let i = 0; i < subscribers.length; i++) {
              temp.push(subscribers[i]._id)
            }
            callApi(`lists/update`, 'put', {query: { listName: number[0].fileName, companyId: page.companyId }, newPayload: {content: temp}, options: {}}, 'accounts')
              .then(savedList => {
                logger.serverLog(TAG, `list updated successfully ${JSON.stringify(savedList)}`, 'debug')
              })
              .catch(err => {
                logger.serverLog(TAG, `Failed to update list ${JSON.stringify(err)}`, 'error')
              })
          })
          .catch(err => {
            logger.serverLog(TAG, `Failed to update update subscriber ${JSON.stringify(err)}`, 'error')
          })
      }
    })
}

exports.handleSubscribeAgain = (sender, page, subscriberFound) => {
  callApi(`subscribers/update`, 'put', {query: { senderId: sender }, newPayload: {isSubscribed: true, isEnabledByPage: true}, options: {}}, 'accounts')
    .then(subscriber => {
      logger.serverLog(TAG, subscriber, 'debug')
      callApi(`tags/query`, 'post', {tag: `_${page.pageId}_unsubscribe`, defaultTag: true, companyId: page.companyId}, 'accounts')
        .then(unsubscribeTag => {
          unsubscribeTag = unsubscribeTag[0]
          needle('delete', `https://graph.facebook.com/v2.11/${unsubscribeTag.labelFbId}/label?user=${subscriberFound.senderId}&access_token=${page.accessToken}`)
            .then(response => {
              if (response.body.error) {
                logger.serverLog(TAG, `failed to unassigned unsubscribe tag: ${JSON.stringify(response.body.error)}`, 'error')
              } else {
                logger.serverLog(TAG, `unsubscribe tag unassigned successfully!`)
              }
            })
            .catch((err) => {
              logger.serverLog(TAG, `failed to unassigned unsubscribe tag: ${JSON.stringify(err)}`, 'error')
            })
        })
        .catch((err) => {
          logger.serverLog(TAG, `failed to fetch unsubscribe tag: ${err}`, 'error')
        })
    })
    .catch((err) => {
      logger.serverLog(TAG, `failed to update subscriber: ${err}`, 'error')
    })
}
