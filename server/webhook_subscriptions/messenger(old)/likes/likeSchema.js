exports.likeSchema = {
  '$schema': 'http://json-schema.org/draft-04/schema#',
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
                    'field': {
                      'type': 'string'
                    },
                    'value': {
                      'type': 'object',
                      'properties': {
                        'parent_id': {
                          'type': 'string'
                        },
                        'sender_name': {
                          'type': 'string'
                        },
                        'sender_id': {
                          'type': 'string'
                        },
                        'post_id': {
                          'type': 'string'
                        },
                        'verb': {
                          'type': 'string',
                          'enum': ['add', 'remove']
                        },
                        'item': {
                          'type': 'string',
                          'enum': ['like']
                        },
                        'created_time': {
                          'type': 'integer'
                        }
                      },
                      'required': [
                        'sender_id',
                        'post_id',
                        'verb',
                        'item'
                      ]
                    }
                  },
                  'required': [
                    'field',
                    'value'
                  ]
                }
              ]
            },
            'id': {
              'type': 'string'
            },
            'time': {
              'type': 'integer'
            }
          },
          'required': [
            'changes'
          ]
        }
      ]
    },
    'object': {
      'type': 'string'
    }
  },
  'required': [
    'entry'
  ]
}
