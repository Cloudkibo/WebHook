/**
 * JSON Schema Creator: https://www.liquid-technologies.com/online-json-to-schema-converter
 *
 */

exports.publishPost = {
  'type': 'object',
  'properties': {
    'guid': {'type': 'string'},
    'post_title': {'type': 'string'}
  },
  'required': ['guid', 'post_title']
}
