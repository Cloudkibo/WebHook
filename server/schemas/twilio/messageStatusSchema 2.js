exports.messageStatusSchema = {
  type: 'object',
  properties: {
    EventType: {
      type: 'string',
      required: true
    },
    To: {
      type: 'string',
      required: true,
      pattern: '^whatsapp:'
    },
    From: {
      type: 'string',
      required: true,
      pattern: '^whatsapp:'
    }
  }
}
