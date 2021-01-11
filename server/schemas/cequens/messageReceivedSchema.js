exports.messageReceivedSchema = {
  'type': 'object',
  'properties': {
    'contacts': {
      'type': 'array',
      'items': [
        {
          'type': 'object',
          'properties': {
            'profile': {
              'type': 'object',
              'properties': {
                'name': {
                  'type': 'string'
                }
              },
              'required': [
                'name'
              ]
            },
            'wa_id': {
              'type': 'string'
            }
          },
          'required': [
            'profile',
            'wa_id'
          ]
        }
      ]
    },
    'messages': {
      'type': 'array',
      'items': [
        {
          'type': 'object',
          'properties': {
            'from': {
              'type': 'string'
            },
            'id': {
              'type': 'string'
            },
            'timestamp': {
              'type': 'string'
            },
            'type': {
              'type': 'string'
            }
          },
          'required': [
            'from',
            'id',
            'timestamp',
            'type'
          ]
        }
      ]
    }
  },
  'required': [
    'contacts',
    'messages'
  ]
}
