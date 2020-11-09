const Sentry = require('@sentry/node')

exports.sendAlert = function (message, path, data, otherInfo, level) {
  Sentry.configureScope(scope => {
    scope.setExtra('path', path)
    scope.setExtra('data', data)
    scope.setExtra('otherInfo', otherInfo)
    scope.setLevel('level', level)
  })
  Sentry.captureException(new Error(message))
}
