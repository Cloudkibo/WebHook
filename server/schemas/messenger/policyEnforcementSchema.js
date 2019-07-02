exports.policyEnforcementSchema = {
  '$schema': 'http://json-schema.org/draft-04/schema#',
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
    'timestamp': {
      'type': 'integer'
    },
    'policy-enforcement': {
      'type': 'object',
      'properties': {
        'action': {
          'type': 'string'
        },
        'reason': {
          'type': 'string'
        }
      },
      'required': [
        'action',
        'reason'
      ]
    }
  },
  'required': [
    'recipient',
    'timestamp',
    'policy-enforcement'
  ]
}
