const requestPromise = require('request-promise')
const config = require('../../../config/environment/index')
const logger = require('../../../components/logger')
const TAG = 'api/v1/utility/index.js'
const util = require('util')

exports.callApi = (endpoint, method = 'get', body, type = 'kibopush') => {
  let headers = {
    'content-type': 'application/json',
    'is_kibo_product': true
  }
  let uri
  if (type === 'accounts') {
    uri = `${config.ACCOUNTS_URL}${endpoint}`
  } else if (type === 'kibopush') {
    uri = `${config.API_URL}${endpoint}`
  } else if (type === 'kibochat') {
    uri = `${config.CHAT_URL}${endpoint}`
  } else if (type === 'kiboengage') {
    uri = `${config.ENGAGE_URL}${endpoint}`
  }
  let options = {
    method: method.toUpperCase(),
    uri: uri,
    headers,
    body,
    json: true
  }
  logger.serverLog(TAG, `requestPromise body ${util.inspect(body)}`)
  return requestPromise(options).then(response => {
    logger.serverLog(TAG, `response from accounts ${util.inspect(response)}`)
    return new Promise((resolve, reject) => {
      if (response.status === 'success') {
        resolve(response.payload)
      } else {
        reject(response.payload)
      }
    })
  })
}
