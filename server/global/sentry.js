const Sentry = require('@sentry/node')

exports.sendAlert = function (message, path, data, otherInfo, level) {
  Sentry.withScope(scope => {
    scope.setExtra('path', path)
    scope.setExtra('data', JSON.stringify(data))
    scope.setExtra('otherInfo', JSON.stringify(otherInfo))
    scope.setLevel('level', level)
    Sentry.captureException(message)
  })
}
