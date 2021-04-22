exports.messageDeliverySchema = {
  type: 'object',
  properties: {
    type: { type: 'string', enum: ['message-delivered'] },
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
        tag: { type: 'string' },
        applicationId: { type: 'string' },
        media: { type: 'array' }
      }
    }
  }
}
