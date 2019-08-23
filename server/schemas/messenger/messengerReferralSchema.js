exports.messengerReferralSchema = {
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
                    'referral': {
                      'type': 'object',
                      'properties': {
                        'ref': {
                          'type': 'string'
                        },
                        'source': {
                          'type': 'string',
                          'enum': ['SHORTLINK']
                        },
                        'type': {
                          'type': 'string',
                          'enum': ['OPEN_THREAD']
                        }
                      },
                      'required': [
                        'ref', 'source', 'type'
                      ]
                    }
                  },
                  'required': [
                    'sender',
                    'recipient',
                    'referral'
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
