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

exports.referralSchema = {
  '$schema': 'http://json-schema.org/draft-04/schema#',
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
    'referral': {
      'type': 'object',
      'properties': {
        'ref': {
          'type': 'string'
        },
        'source': {
          'type': 'string',
          'enum': ['MESSENGER_CODE']
        },
        'type': {
          'type': 'string'
        }
      },
      'required': [
        'ref',
        'source',
        'type'
      ]
    }
  },
  'required': [
    'sender',
    'recipient',
    'timestamp',
    'referral'
  ]
}
