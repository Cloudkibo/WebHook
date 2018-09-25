/**
 * JSON Schema Creator: https://www.liquid-technologies.com/online-json-to-schema-converter
 *
 */

exports.publishPost = {
  'type': 'object',
  'properties': {
    'ID': {'type': 'string'},
    'comment_count': {'type': 'string'},
    'comment_status': {'type': 'string'},
    'guid': {'type': 'string'},
    'menu_order': {'type': 'string'},
    'ping_status': {'type': 'string'},
    'pinged': {'type': 'string'},
    'post_author': {'type': 'string'},
    'post_category': {'type': 'string'},
    'post_content': {'type': 'string'},
    'post_content_filtered': {'type': 'string'},
    'post_date': {'type': 'string'},
    'post_date_gmt': {'type': 'string'},
    'post_excerpt': {'type': 'string'},
    'post_mime_type': {'type': 'string'},
    'post_modified': {'type': 'string'},
    'post_modified_gmt': {'type': 'string'},
    'post_name': {'type': 'string'},
    'post_parent': {'type': 'string'},
    'post_password': {'type': 'string'},
    'post_status': {'type': 'string'},
    'post_title': {'type': 'string'},
    'post_type': {'type': 'string'},
    'post_url': {'type': 'string'},
    'to_ping': {'type': 'string'}
  },
  'required': ['guid', 'post_title']
}
