exports.changePageNameSchema = {
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
            }
          },
          'required': [
            'changes',
            'id'
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
