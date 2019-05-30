const needle = require('needle')

exports.getRefreshedPageAccessToken = (pageId, accessToken) => {
  return new Promise((resolve, reject) => {
    needle.get(
      `https://graph.facebook.com/v2.10/${pageId}?fields=access_token&access_token=${accessToken}`,
      (err, resp) => {
        if (err) {
          reject(err)
        } else {
          resolve(resp.body.access_token)
        }
      })
  })
}
