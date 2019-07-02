exports.quickRepliesSchema = {
  'type': 'object',
  'properties': {
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
                    'message': {
                      'type': 'object',
                      'properties': {
                        'quick_reply': {
                          'type': 'object',
                          'properties': {
                            'payload': {
                              'type': 'string'
                            }
                          },
                          'required': [
                            'payload'
                          ]
                        }
                      },
                      'required': [
                        'quick_reply'
                      ]
                    }
                  },
                  'required': [
                    'sender',
                    'recipient',
                    'timestamp',
                    'message'
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
