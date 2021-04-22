exports.incomingMessageSchema = {
  type: 'object',
  properties: {
    type: { type: 'string', enum: 'message-received' },
    time: { type: 'string' },
    description: { type: 'string' },
    to: { type: 'string' },
    message: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        owner: { type: 'string' },
        time: { type: 'string' },
        direction: { type: 'string' },
        from: { type: 'string' },
        text: { type: 'string' },
        applicationId: { type: 'string' },
        media: { type: 'array' }
      }
    }
  }
}
