exports.postEditSchema = {
  'type': 'object',
  'properties': {
    'entry': {
      'type': 'array',
      'items': [
        {
          'type': 'object',
          'properties': {
            'changes': {
              'type': 'array',
              'items': [
                {
                  'type': 'object',
                  'properties': {
                    'value': {
                      'type': 'object',
                      'properties': {
                        'item': {
                          'type': 'string',
                          'enum': ['status']
                        },
                        'verb': {
                          'type': 'string',
                          'enum': ['edited']
                        },
                        'post_id': {'type': 'string'}
                      },
                      'required': ['item', 'verb', 'post_id']
                    }
                  },
                  'required': ['value']
                }
              ]
            }
          },
          'required': ['changes']
        }
      ]
    }
  },
  'required': ['entry']
}
