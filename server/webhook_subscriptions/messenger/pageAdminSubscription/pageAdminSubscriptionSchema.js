exports.pageAdminSubscriptionSchema = {
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
            'messaging': {
              'type': 'array',
              'items': [
                {
                  'type': 'object',
                  'properties': {
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
                    'optin': {
                      'type': 'object',
                      'properties': {
                        'ref': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'ref'
                      ]
                    }
                  },
                  'required': [
                    'recipient',
                    'sender',
                    'optin'
                  ]
                }
              ]
            }
          },
          'required': [
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
