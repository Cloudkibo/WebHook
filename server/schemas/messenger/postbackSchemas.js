exports.getStartedSchema = {
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
                        'payload': {
                          'type': 'string',
                          'enum': ['<GET_STARTED_PAYLOAD>']
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

exports.postbackSchema = {
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
