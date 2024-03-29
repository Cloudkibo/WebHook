const needle = require('needle')

exports.getRefreshedPageAccessToken = (pageId, accessToken) => {
  return new Promise((resolve, reject) => {
    needle.get(
      `https://graph.facebook.com/v6.0/${pageId}?fields=access_token&access_token=${accessToken}`,
      (err, resp) => {
        if (err) {
          reject(err)
        } else if (resp.body.error) {
          reject(resp.body.error)
        } else {
          resolve(resp.body.access_token)
        }
      })
  })
}

exports.sendSuccessResponse = (statusCode, data, res) => {
  return res.status(statusCode).json({status: 'success', payload: data})
}

exports.sendErrorResponse = (statusCode, errorMessage, res) => {
  return res.status(statusCode).json({status: 'success', description: errorMessage})
}
