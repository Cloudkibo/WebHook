exports.autopostingSchema = {
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
                        'share_id': {
                          'type': 'string'
                        },
                        'item': {
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
                          'type': 'string'
                        },
                        'link': {
                          'type': 'string'
                        },
                        'published': {
                          'type': 'integer'
                        },
                        'created_time': {
                          'type': 'integer'
                        },
                        'message': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'share_id',
                        'item',
                        'sender_name',
                        'sender_id',
                        'post_id',
                        'verb',
                        'published',
                        'created_time'
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
            'changes',
            'id',
            'time'
          ]
        }
      ]
    },
    'object': {
      'type': 'string'
    }
  },
  'required': [
    'entry',
    'object'
  ]
}
