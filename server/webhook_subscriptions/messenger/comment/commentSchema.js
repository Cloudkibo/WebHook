exports.commentSchema = {
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
                        'item': {'type': 'string'},
                        'comment_id': {'type': 'string'},
                        'sender_id': {'type': 'string'},
                        'post_id': {'type': 'string'},
                      },
                      'required': ['item', 'comment_id', 'sender_id', 'post_id']
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
