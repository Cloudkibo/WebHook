/**
 * JSON Schema Creator: https://www.liquid-technologies.com/online-json-to-schema-converter
 *
 */

exports.simpleTweet = {
  'type': 'object',
  'properties': {
    'id': {
      'type': 'string'
    },
    'text': {
      'type': 'string'
    },
    'user': {
      'type': 'object',
      'properties': {
        'screen_name': {
          'type': 'string'
        }
      },
      'required': [
        'screen_name'
      ]
    }
  },
  'required': [
    'id',
    'text'
  ]
}

exports.mediaTweet = {
  'type': 'object',
  'properties': {
    'id': {
      'type': 'integer'
    },
    'text': {
      'type': 'string'
    },
    'user': {
      'type': 'object',
      'properties': {
        'screen_name': {
          'type': 'string'
        }
      },
      'required': [
        'screen_name'
      ]
    },
    'entities': {
      'type': 'object',
      'properties': {
        'hashtags': {
          'type': 'array',
          'items': {}
        },
        'media': {
          'type': 'array',
          'items': [
            {
              'type': 'object',
              'properties': {
                'media_url': {
                  'type': 'string'
                },
                'url': {
                  'type': 'string'
                }
              },
              'required': [
                'media_url',
                'url'
              ]
            }
          ]
        }
      },
      'required': [
        'media'
      ]
    }
  },
  'required': [
    'id',
    'text'
  ]
}
