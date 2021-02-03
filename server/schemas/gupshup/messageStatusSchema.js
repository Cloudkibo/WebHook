exports.messageStatusSchema = {
  'type': 'object',
  'properties': {
    'app': {
      'type': 'string'
    },
    'timestamp': {
      'type': 'integer'
    },
    'version': {
      'type': 'integer'
    },
    'type': {
      'type': 'string'
    },
    'payload': {
      'type': 'object',
      'properties': {
        'id': {
          'type': 'string'
        },
        'gsId': {
          'type': 'string'
        },
        'type': {
          'type': 'string'
        },
        'destination': {
          'type': 'string'
        },
        'payload': {
          'type': 'object'
        }
      },
      'required': [
        'id',
        'type',
        'destination',
        'payload'
      ]
    }
  },
  'required': [
    'app',
    'type',
    'payload'
  ]
}
