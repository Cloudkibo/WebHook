exports.checkboxPluginSchema = {
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
                    'prior_message': {
                      'type': 'object',
                      'properties': {
                        'source': {
                          'type': 'string',
                          'enum': ['checkbox_plugin']
                        }
                      },
                      'required': [
                        'source'
                      ]
                    }
                  },
                  'required': [
                    'sender',
                    'recipient',
                    'prior_message'
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
