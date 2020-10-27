exports.messageReceivedSchema = {
  type: 'object',
  properties: {
    To: {
      type: 'string',
      pattern: '^whatsapp:',
      required: true
    },
    From: {
      type: 'string',
      pattern: '^whatsapp:',
      required: true
    },
    Body: {
      type: 'string',
      required: true
    }
  }
}
