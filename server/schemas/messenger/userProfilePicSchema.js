exports.userProfilePicSchema = {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'type': 'object',
  'properties': {
    'entry': {
      'type': 'array',
      'items': [
        {
          'type': 'object',
          'properties': {
            'time': {
              'type': 'integer'
            },
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
                      'type': 'string'
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
            'uid': {
              'type': 'string'
            }
          },
          'required': [
            'time',
            'changes',
            'id',
            'uid'
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
