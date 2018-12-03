exports.CodeSchema = {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'type': 'object',
  'properties': {
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
    'timestamp': {
      'type': 'integer'
    },
    'referral': {
      'type': 'object',
      'properties': {
        'ref': {
          'type': 'string'
        },
        'source': {
          'type': 'string'
        },
        'type': {
          'type': 'string'
        }
      },
      'required': [
        'ref',
        'source',
        'type'
      ]
    }
  },
  'required': [
    'sender',
    'recipient',
    'timestamp',
    'referral'
  ]
}
