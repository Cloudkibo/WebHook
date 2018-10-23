const fetch = require('isomorphic-fetch')
const logger = require('../components/logger')
const config = require('../config/environment/index')

exports.callApi = (endpoint, method = 'get', body, apiUrl) => {
  console.log('endpoint', endpoint)
  let headers = {
    'content-type': 'application/json'
  }
  var redirectUrl = getRedirectUrl(apiUrl)
  if (redirectUrl === '') {
    logger.serverLog('Empty apiUrl parameter')
    return
  }
  return fetch(`${redirectUrl}/${endpoint}`, {
    headers,
    method,
    body: JSON.stringify(body)
  }).then(response => {
    return response
  }).then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      return json
    })
    .then(
      response => response,
      error => error
    )
}

function getRedirectUrl (apiUrl) {
  var redirectUrl = ''
  if (apiUrl === 'kibochat') {
    redirectUrl = config.API_URL_KIBOCHAT
  } else if (apiUrl === 'kiboengage') {
    redirectUrl = config.API_URL_KIBOENGAGE
  } else if (apiUrl === 'accounts') {
    redirectUrl = config.API_URL_ACCOUNTS
  }
  return redirectUrl
}
