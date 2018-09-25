exports.surveyResponseSchema = {
  'type': 'object',
  'properties': {
    'object': {
      'type': 'string'
    },
    'entry': {
      'type': 'array',
      'items': [
        {
          'type': 'object',
          'properties': {
            'id': {
              'type': 'string'
            },
            'time': {
              'type': 'integer'
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
                    'timestamp': {
                      'type': 'integer'
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
                    'postback': {
                      'type': 'object',
                      'properties': {
                        'payload': {
                          'type': 'string'
                        },
                        'title': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'payload',
                        'title'
                      ]
                    }
                  },
                  'required': [
                    'recipient',
                    'timestamp',
                    'sender',
                    'postback'
                  ]
                }
              ]
            }
          },
          'required': [
            'id',
            'time',
            'messaging'
          ]
        }
      ]
    }
  },
  'required': [
    'object',
    'entry'
  ]
}
