exports.postCommentSchema = {
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
                          'enum': ['comment']
                        },
                        'verb': {
                          'type': 'string',
                          'enum': ['add', 'remove', 'delete']
                        },
                        'comment_id': {'type': 'string'},
                        'sender_id': {'type': 'string'},
                        'post_id': {'type': 'string'}
                      },
                      'required': ['item', 'verb', 'comment_id', 'post_id']
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
