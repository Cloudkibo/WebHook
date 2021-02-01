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
                        'user_ref': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'user_ref'
                      ]
                    },
                    'referral': {
                      'type': 'object',
                      'properties': {
                        'ref': {
                          'anyOf': [
                            { type: 'string' },
                            { type: 'null' }
                          ]
                        },
                        'source': {
                          'type': 'string',
                          'enum': ['CUSTOMER_CHAT_PLUGIN']
                        },
                        'is_guest_user': {
                          'type': 'boolean'
                        }
                      },
                      'required': ['source', 'is_guest_user']
                    }
                  },
                  'required': [
                    'recipient',
                    'sender',
                    'referral'
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

exports.chatPluginWithPostBackSchema = {
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
                        'user_ref': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'user_ref'
                      ]
                    },
                    'postback': {
                      'type': 'object',
                      'properties': {
                        'payload': {
                          'type': 'string'
                        },
                        'referral': {
                          'type': 'object',
                          'properties': {
                            'ref': {
                              'anyOf': [
                                { type: 'string' },
                                { type: 'null' }
                              ]
                            },
                            'source': {
                              'type': 'string',
                              'enum': ['CUSTOMER_CHAT_PLUGIN']
                            },
                            'is_guest_user': {
                              'type': 'boolean'
                            }
                          },
                          'required': ['source', 'is_guest_user']
                        }
                      },
                      'required': [
                        'payload',
                        'referral'
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

