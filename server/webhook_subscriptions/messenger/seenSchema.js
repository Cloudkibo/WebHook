exports.seenSchema = {
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
                    'read': {
                      'type': 'object',
                      'properties': {
                        'watermark': {
                          'type': 'integer'
                        },
                        'seq': {
                          'type': 'integer'
                        }
                      },
                      'required': [
                        'watermark',
                        'seq'
                      ]
                    }
                  },
                  'required': [
                    'sender',
                    'recipient',
                    'timestamp',
                    'read'
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
