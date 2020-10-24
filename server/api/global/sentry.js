let config = require('../../config/environment')

exports.sendAlert = function (errObj, codePart, pageId, userId, companyId, event) {
  if (config.env === 'production') {
    const Raven = require('raven')
    try {
      throw new Error(errObj.message)
    } catch (e) {
      Raven.captureException(e, {
        extra: {codePart: codePart, pageId: pageId, userId: userId, companyId: companyId, event: event}, // Any other data you'd specify with setContext
        level: 'error' // Event level
      })
    }
  }
}
