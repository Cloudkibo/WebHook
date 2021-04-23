exports.orderStatusSchema = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      required: true
    },
    subscriptionId: {
      type: 'string',
      required: true
    },
    message: {
      type: 'string',
      required: true
    },
    orderId: {
      type: 'string',
      required: true
    },
    orderType: {
      type: 'string',
      required: true
    },
    completedTelephoneNumbers: {
      type: 'object',
      required: true,
      properties: {
        telephoneNumber: {
          type: 'string',
          required: true
        }
      }
    }
  }
}
