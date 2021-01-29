exports.messageStatusSchema = {
  'type': 'object',
  'properties': {
    'statuses': {
      'type': 'array',
      'items': [
        {
          'type': 'object',
          'properties': {
            'id': {
              'type': 'string'
            },
            'recipient_id': {
              'type': 'string'
            },
            'status': {
              'type': 'string'
            },
            'timestamp': {
              'type': 'string'
            }
          },
          'required': [
            'id',
            'recipient_id',
            'status',
            'timestamp'
          ]
        }
      ]
    },
    'businessNumber': {
      'type': 'string'
    }
  },
  'required': [
    'statuses',
    'businessNumber'
  ]
}
