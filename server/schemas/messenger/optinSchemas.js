exports.shopifySchema = {
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
                    'optin': {
                      'type': 'object',
                      'properties': {
                        'ref': {
                          'type': 'string',
                          'enum': ['SHOPIFY']
                        }
                      },
                      'required': [
                        'ref'
                      ]
                    }
                  },
                  'required': [
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

exports.optinSchema = {
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
