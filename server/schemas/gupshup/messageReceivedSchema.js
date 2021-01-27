exports.messageReceivedSchema = {
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
        'source': {
          'type': 'string'
        },
        'type': {
          'type': 'type'
        },
        'payload': {
          'type': 'object'
        },
        'sender': {
          'type': 'object',
          'properties': {
            'phone': {
              'type': 'string'
            },
            'name': {
              'type': 'string'
            }
          },
          'required': [
            'phone',
            'name'
          ]
        }
      },
      'required': [
        'id',
        'source',
        'type',
        'payload',
        'sender'
      ]
    }
  },
  'required': [
    'app',
    'timestamp',
    'type',
    'payload'
  ]
}
