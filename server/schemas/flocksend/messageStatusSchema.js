exports.messageStatusSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      required: true
    },
    status: {
      type: 'string',
      required: true
    }
  }
}
