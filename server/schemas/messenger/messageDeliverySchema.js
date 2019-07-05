exports.messageDeliverySchema = {
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
                    'delivery': {
                      'type': 'object',
                      'properties': {
                        'mids': {
                          'type': 'array',
                          'items': [
                            {
                              'type': 'string'
                            }
                          ]
                        },
                        'watermark': {
                          'type': 'integer'
                        },
                        'seq': {
                          'type': 'integer'
                        }
                      },
                      'required': [
                        'watermark'
                      ]
                    }
                  },
                  'required': [
                    'sender',
                    'recipient',
                    'timestamp',
                    'delivery'
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
