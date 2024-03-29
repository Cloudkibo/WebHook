const requestPromise = require('request-promise')
const config = require('../config/environment/index')

exports.callApi = (endpoint, method = 'get', body, type = 'kibopush') => {
  let headers = {
    'content-type': 'application/json',
    'is_kibo_product': true
  }
  let uri
  if (type === 'accounts') {
    uri = `${config.ACCOUNTS_URL}${endpoint}`
  } else if (type === 'kibochat') {
    uri = `${config.CHAT_URL}${endpoint}`
  } else if (type === 'kiboengage') {
    uri = `${config.ENGAGE_URL}${endpoint}`
  } else if (type === 'telco') {
    uri = `${config.TELCO_URL}${endpoint}`
  } else if (type === 'engageDbLayer') {
    uri = `${config.ENGAGE_DBLAYER}${endpoint}`
  } else if (type === 'chatDbLayer') {
    uri = `${config.CHAT_DBLAYER}${endpoint}`
  } else {
    uri = `${config.API_URL}${endpoint}`
  }
  let options = {
    method: method.toUpperCase(),
    uri: uri,
    headers,
    body,
    json: true
  }

  return requestPromise(options).then(response => {
    return new Promise((resolve, reject) => {
      if (response.status === 'success') {
        resolve(response.payload)
      } else {
        reject(response.payload)
      }
    })
  })
}
