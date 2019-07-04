
exports.customerMatchingSchema = {
  'type': 'object',
  'properties': {
    'entry': {
      'type': 'array',
      'items': [
        {
          'type': 'object',
          'properties': {
            'id': {
              'type': 'string'
            },
            'messaging': {
              'type': 'array',
              'items': [
                {
                  'type': 'object',
                  'properties': {
                    'recipient': {
                      'type': 'object',
                      'properties': {
                        'id': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'id'
                      ]
                    },
                    'sender': {
                      'type': 'object',
                      'properties': {
                        'id': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'id'
                      ]
                    },
                    'message': {
                      'type': 'object',
                      'properties': {
                        'text': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'text'
                      ]
                    },
                    'prior_message': {
                      'type': 'object',
                      'properties': {
                        'source': {
                          'type': 'string'
                        },
                        'identifier': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'source',
                        'identifier'
                      ]
                    }
                  },
                  'required': [
                    'prior_message'
                  ]
                }
              ]
            }
          },
          'required': [
            'messaging'
          ]
        }
      ]
    }
  },
  'required': [
    'entry'
  ]
}
