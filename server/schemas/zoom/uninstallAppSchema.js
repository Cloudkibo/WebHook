exports.uninstallAppSchema = {
  'type': 'object',
  'properties': {
    'event': {
      'type': 'string'
    },
    'payload': {
      'type': 'object',
      'properties': {
        'user_id': {
          'type': 'string'
        },
        'account_id': {
          'type': 'string'
        },
        'client_id': {
          'type': 'string'
        },
        'user_data_retention': {
          'type': 'string',
          'required': true
        },
        'deauthorization_time': {
          'type': 'string'
        },
        'signature': {
          'type': 'string'
        }
      }
    }
  },
  'required': [
    'event',
    'payload'
  ]
}
