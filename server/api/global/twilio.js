const MessagingResponse = require('twilio').twiml.MessagingResponse

exports.sendResponseToTwilio = (res) => {
  const twiml = new MessagingResponse()
  twiml.message('Thanks')

  res.writeHead(200, { 'Content-Type': 'text/xml' })
  res.end(twiml.toString())
}
