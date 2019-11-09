exports.chatPluginSchema = {
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
                    'postback': {
                      'type': 'object',
                      'properties': {
                        'referral': {
                          'type': 'object',
                          'properties': {
                            'ref': {
                              'type': 'string'
                            },
                            'source': {
                              'type': 'string',
                              'enum': ['CUSTOMER_CHAT_PLUGIN']
                            }
                          },
                          'required': ['source', 'ref']
                        },
                        'payload': {
                          'type': 'string'
                        },
                        'title': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'referral',
                        'payload',
                        'title'
                      ]
                    }
                  },
                  'required': [
                    'recipient',
                    'sender',
                    'postback'
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
    'object',
    'entry'
  ]
}