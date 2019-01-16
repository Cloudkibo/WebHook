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
    'postback': {
      'type': 'object',
      'properties': {
        'payload': {
          'type': 'string'
        },
        'title': {
          'type': 'string'
        }
      },
      'required': [
        'payload',
        'title'
      ]
    }
  },
  'required': [
    'sender',
    'recipient',
    'timestamp',
    'postback'
  ]
}
