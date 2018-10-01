/**
 * JSON Schema Creator: https://www.liquid-technologies.com/online-json-to-schema-converter
 *
 */

exports.testSchema = {
  'type': 'object',
  'properties': {
    'name': {'type': 'string'},
    'votes': {'type': 'integer', 'minimum': 1},
    'user': {
      'type': 'object',
      'properties': {
        'id': {
          'type': 'integer'
        },
        'id_str': {
          'type': 'string'
        },
        'name': {
          'type': 'string'
        },
        'screen_name': {
          'type': 'string'
        }
      },
      'required': ['id']
    },
    'required': ['votes']
  }
}

exports.testSchema1 = {
  'type': 'object',
  'properties': {
    'name': {'type': 'string'},
    'votes': {'type': 'integer', 'minimum': 1},
    'user': {
      'type': 'object',
      'properties': {
        'id': {
          'type': 'integer'
        },
        'id2': {
          'type': 'integer'
        },
        'id_str': {
          'type': 'string'
        },
        'name': {
          'type': 'string'
        },
        'screen_name': {
          'type': 'string'
        }
      },
      'required': ['id', 'id2']
    },
    'required': ['votes']
  }
}
