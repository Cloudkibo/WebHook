const fs = require('fs')
const path = require('path')
const config = require('../../../config/environment/index')
let request = require('request')

function prepareSendAPIPayload (subscriberId, body, fname, lname, isResponse, jsonAdMessages) {
  return new Promise(function (resolve, reject) {
    let messageType = isResponse ? 'RESPONSE' : 'UPDATE'
    let payload = {}
    let text = body.text
    var buttonPayload = []
    var button = {}
    if (jsonAdMessages && body.buttons && body.buttons.length > 0) {
      for (var i = 0; i < body.buttons.length; i++) {
        button = body.buttons[i]
        var jsonAdMessageId
        if (button.payload && button.type === 'postback') {
          for (var j = 0; j < jsonAdMessages.length; j++) {
            if ((button.payload).toString() === (jsonAdMessages[j].jsonAdMessageId).toString()) {
              jsonAdMessageId = jsonAdMessages[j]._id
              break
            }
          }
          button.payload = 'JSONAD-' + jsonAdMessageId
        }
        buttonPayload.push(button)
      }
    } else {
      buttonPayload = body.buttons
    }
    if (body.componentType === 'text' && !body.buttons) {
      if (body.text.includes('{{user_full_name}}') || body.text.includes('[Username]')) {
        text = text.replace(
          '{{user_full_name}}', fname + ' ' + lname)
      }
      if (body.text.includes('{{user_first_name}}')) {
        text = text.replace(
          '{{user_first_name}}', fname)
      }
      if (body.text.includes('{{user_last_name}}')) {
        text = text.replace(
          '{{user_last_name}}', lname)
      }
      payload = {
        'messaging_type': messageType,
        'recipient': JSON.stringify({
          'id': subscriberId
        }),
        'message': JSON.stringify({
          'text': text,
          'metadata': 'This is a meta data'
        })
      }
      resolve({payload})
    } else if (body.componentType === 'text' && body.buttons) {
      if (body.text.includes('{{user_full_name}}') || body.text.includes('[Username]')) {
        text = text.replace(
          '{{user_full_name}}', fname + ' ' + lname)
      }
      if (body.text.includes('{{user_first_name}}')) {
        text = text.replace(
          '{{user_first_name}}', fname)
      }
      if (body.text.includes('{{user_last_name}}')) {
        text = text.replace(
          '{{user_last_name}}', lname)
      }
      payload = {
        'messaging_type': messageType,
        'recipient': JSON.stringify({
          'id': subscriberId
        }),
        'message': JSON.stringify({
          'attachment': {
            'type': 'template',
            'payload': {
              'template_type': 'button',
              'text': text,
              'buttons': buttonPayload
            }
          }
        })
      }
      resolve({payload})
    } else if (['image', 'audio', 'file', 'video'].indexOf(
      body.componentType) > -1) {
      // let dir = path.resolve(__dirname, '../../../../broadcastFiles/')
      // let fileToStore = ''
      // if (body.componentType === 'file') {
      //   fileToStore = dir + '/userfiles/' + body.fileurl.name
      // } else {
      //   fileToStore = dir + '/userfiles/' + body.fileurl.id
      // }
      // var stream = request(`${config.ACCOUNTS_URL}files/download/${body.fileurl.id}`).pipe(fs.createWriteStream(fileToStore))
      // stream.on('finish', function () {
      //   console.log('finished')
      //   let fileReaderStream = fs.createReadStream(fileToStore)
      //   stream.on('close', function () {
      //     console.log('finished reading')
      payload = {
        'messaging_type': messageType,
        'recipient': JSON.stringify({
          'id': subscriberId
        }),
        'message': JSON.stringify({
          'attachment': {
            'type': body.componentType,
            'payload': {
              'url': body.fileurl.url,
              'is_reusable': true
            }
          }
        })
      }
      //     console.log('in filedata', payload)
      //     fs.unlink(fileToStore)
      //     resolve({payload})
      //   })
      // })
      // todo test this one. we are not removing as we need to keep it for live chat
      // if (!isForLiveChat) deleteFile(body.fileurl)
      resolve({payload})
    } else if (['gif', 'sticker', 'thumbsUp'].indexOf(
      body.componentType) > -1) {
      payload = {
        'messaging_type': messageType,
        'recipient': JSON.stringify({
          'id': subscriberId
        }),
        'message': JSON.stringify({
          'attachment': {
            'type': 'image',
            'payload': {
              'url': body.fileurl
            }
          }
        })
      }
      resolve({payload})
    } else if (body.componentType === 'card') {
      payload = {
        'messaging_type': messageType,
        'recipient': JSON.stringify({
          'id': subscriberId
        }),
        'message': JSON.stringify({
          'attachment': {
            'type': 'template',
            'payload': {
              'template_type': 'generic',
              'elements': [
                {
                  'title': body.title,
                  'image_url': body.image_url,
                  'subtitle': body.description,
                  'buttons': buttonPayload
                }
              ]
            }
          }
        })
      }
      resolve({payload})
    } else if (body.componentType === 'gallery') {
      payload = {
        'messaging_type': messageType,
        'recipient': JSON.stringify({
          'id': subscriberId
        }),
        'message': JSON.stringify({
          'attachment': {
            'type': 'template',
            'payload': {
              'template_type': 'generic',
              'elements': body.cards
            }
          }
        })
      }
      resolve({payload})
    } else if (body.componentType === 'list') {
      payload = {
        'messaging_type': messageType,
        'recipient': JSON.stringify({
          'id': subscriberId
        }),
        'message': JSON.stringify({
          'attachment': {
            'type': 'template',
            'payload': {
              'template_type': 'list',
              'top_element_style': body.topElementStyle,
              'elements': body.listItems,
              'buttons': buttonPayload
            }
          }
        })
      }
      resolve({payload})
    }
  })
}

function isJsonString (str) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

function prepareSubscriberPayload (senderId, pageId) {
  let data = {
    entry: [{
      messaging: [{
        sender: {id: senderId},
        recipient: {id: pageId},
        message: {text: 'Get Started'}
      }]
    }]
  }
  return data
}
exports.prepareSendAPIPayload = prepareSendAPIPayload
exports.isJsonString = isJsonString
exports.prepareSubscriberPayload = prepareSubscriberPayload
