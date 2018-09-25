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
                    'message': {
                      'type': 'object',
                      'properties': {
                        'tags': {
                          'type': 'object',
                          'properties': {
                            'source': {
                              'type': 'string'
                            }
                          },
                          'required': [
                            'source'
                          ]
                        }
                      },
                      'required': [
                        'tags'
                      ]
                    }
                  },
                  'required': [
                    'sender',
                    'recipient',
                    'message'
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
