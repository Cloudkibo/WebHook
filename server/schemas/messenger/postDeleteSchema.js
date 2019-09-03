exports.postDeleteSchema = {
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
                            'enum': ['post']
                          },
                          'verb': {
                            'type': 'string',
                            'enum': ['add', 'remove', 'delete']
                          },
                          'sender_id': {'type': 'string'},
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
  