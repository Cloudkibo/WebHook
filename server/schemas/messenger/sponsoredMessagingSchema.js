exports.sponsoredMessagingSchema = {
  'type': 'object',
  'properties': {
    'object': {
      'type': 'string',
      'enum': ['ad_account']
    },
    'entry': {
      'type': 'array',
      'items': [
        {
          'changes': {
            'type': 'array',
            'items': [
              {
                'type': 'object',
                'properties': {
                  'field': {
                    'type': 'string',
                    'enum': ['disapproved_ad_objects', 'in_process_ad_objects', 'with_issues_ad_objects']
                  },
                  'value': {
                    'type': 'object'
                  }
                },
                'required': [
                  'field',
                  'value'
                ]
              }
            ]
          }
        }
      ]
    }
  },
  'required': [
    'object',
    'entry'
  ]
}
  