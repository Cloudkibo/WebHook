/**
 * JSON Schema Creator: https://www.liquid-technologies.com/online-json-to-schema-converter
 *
 */

exports.simpleText = {
  'type': 'object',
  'properties': {
    'created_at': {
      'type': 'string'
    },
    'id': {
      'type': 'integer'
    },
    'id_str': {
      'type': 'string'
    },
    'text': {
      'type': 'string'
    },
    'source': {
      'type': 'string'
    },
    'truncated': {
      'type': 'boolean'
    },
    'in_reply_to_status_id': {
      'type': 'null'
    },
    'in_reply_to_status_id_str': {
      'type': 'null'
    },
    'in_reply_to_user_id': {
      'type': 'null'
    },
    'in_reply_to_user_id_str': {
      'type': 'null'
    },
    'in_reply_to_screen_name': {
      'type': 'null'
    },
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
        },
        'location': {
          'type': 'string'
        },
        'url': {
          'type': 'null'
        },
        'description': {
          'type': 'string'
        },
        'translator_type': {
          'type': 'string'
        },
        'protected': {
          'type': 'boolean'
        },
        'verified': {
          'type': 'boolean'
        },
        'followers_count': {
          'type': 'integer'
        },
        'friends_count': {
          'type': 'integer'
        },
        'listed_count': {
          'type': 'integer'
        },
        'favourites_count': {
          'type': 'integer'
        },
        'statuses_count': {
          'type': 'integer'
        },
        'created_at': {
          'type': 'string'
        },
        'utc_offset': {
          'type': 'integer'
        },
        'time_zone': {
          'type': 'string'
        },
        'geo_enabled': {
          'type': 'boolean'
        },
        'lang': {
          'type': 'string'
        },
        'contributors_enabled': {
          'type': 'boolean'
        },
        'is_translator': {
          'type': 'boolean'
        },
        'profile_background_color': {
          'type': 'string'
        },
        'profile_background_image_url': {
          'type': 'string'
        },
        'profile_background_image_url_https': {
          'type': 'string'
        },
        'profile_background_tile': {
          'type': 'boolean'
        },
        'profile_link_color': {
          'type': 'string'
        },
        'profile_sidebar_border_color': {
          'type': 'string'
        },
        'profile_sidebar_fill_color': {
          'type': 'string'
        },
        'profile_text_color': {
          'type': 'string'
        },
        'profile_use_background_image': {
          'type': 'boolean'
        },
        'profile_image_url': {
          'type': 'string'
        },
        'profile_image_url_https': {
          'type': 'string'
        },
        'profile_banner_url': {
          'type': 'string'
        },
        'default_profile': {
          'type': 'boolean'
        },
        'default_profile_image': {
          'type': 'boolean'
        },
        'following': {
          'type': 'null'
        },
        'follow_request_sent': {
          'type': 'null'
        },
        'notifications': {
          'type': 'null'
        }
      },
      'required': [
        'id',
        'id_str',
        'name',
        'screen_name',
        'location',
        'url',
        'description',
        'translator_type',
        'protected',
        'verified',
        'followers_count',
        'friends_count',
        'listed_count',
        'favourites_count',
        'statuses_count',
        'created_at',
        'utc_offset',
        'time_zone',
        'geo_enabled',
        'lang',
        'contributors_enabled',
        'is_translator',
        'profile_background_color',
        'profile_background_image_url',
        'profile_background_image_url_https',
        'profile_background_tile',
        'profile_link_color',
        'profile_sidebar_border_color',
        'profile_sidebar_fill_color',
        'profile_text_color',
        'profile_use_background_image',
        'profile_image_url',
        'profile_image_url_https',
        'profile_banner_url',
        'default_profile',
        'default_profile_image',
        'following',
        'follow_request_sent',
        'notifications'
      ]
    },
    'geo': {
      'type': 'null'
    },
    'coordinates': {
      'type': 'null'
    },
    'place': {
      'type': 'null'
    },
    'contributors': {
      'type': 'null'
    },
    'is_quote_status': {
      'type': 'boolean'
    },
    'quote_count': {
      'type': 'integer'
    },
    'reply_count': {
      'type': 'integer'
    },
    'retweet_count': {
      'type': 'integer'
    },
    'favorite_count': {
      'type': 'integer'
    },
    'entities': {
      'type': 'object',
      'properties': {
        'hashtags': {
          'type': 'array',
          'items': [
            {
              'type': 'object',
              'properties': {
                'text': {
                  'type': 'string'
                },
                'indices': {
                  'type': 'array',
                  'items': [
                    {
                      'type': 'integer'
                    },
                    {
                      'type': 'integer'
                    }
                  ]
                }
              },
              'required': [
                'text',
                'indices'
              ]
            }
          ]
        },
        'urls': {
          'type': 'array',
          'items': {}
        },
        'user_mentions': {
          'type': 'array',
          'items': {}
        },
        'symbols': {
          'type': 'array',
          'items': {}
        }
      },
      'required': [
        'hashtags',
        'urls',
        'user_mentions',
        'symbols'
      ]
    },
    'favorited': {
      'type': 'boolean'
    },
    'retweeted': {
      'type': 'boolean'
    },
    'filter_level': {
      'type': 'string'
    },
    'lang': {
      'type': 'string'
    },
    'timestamp_ms': {
      'type': 'string'
    }
  },
  'required': [
    'created_at',
    'id',
    'id_str',
    'text',
    'source',
    'truncated',
    'in_reply_to_status_id',
    'in_reply_to_status_id_str',
    'in_reply_to_user_id',
    'in_reply_to_user_id_str',
    'in_reply_to_screen_name',
    'user',
    'geo',
    'coordinates',
    'place',
    'contributors',
    'is_quote_status',
    'quote_count',
    'reply_count',
    'retweet_count',
    'favorite_count',
    'entities',
    'favorited',
    'retweeted',
    'filter_level',
    'lang',
    'timestamp_ms'
  ]
}

exports.simpleTweetWithURLandText = {
  'type': 'object',
  'properties': {
    'created_at': {
      'type': 'string'
    },
    'id': {
      'type': 'integer'
    },
    'id_str': {
      'type': 'string'
    },
    'text': {
      'type': 'string'
    },
    'source': {
      'type': 'string'
    },
    'truncated': {
      'type': 'boolean'
    },
    'in_reply_to_status_id': {
      'type': 'null'
    },
    'in_reply_to_status_id_str': {
      'type': 'null'
    },
    'in_reply_to_user_id': {
      'type': 'null'
    },
    'in_reply_to_user_id_str': {
      'type': 'null'
    },
    'in_reply_to_screen_name': {
      'type': 'null'
    },
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
        },
        'location': {
          'type': 'string'
        },
        'url': {
          'type': 'null'
        },
        'description': {
          'type': 'string'
        },
        'translator_type': {
          'type': 'string'
        },
        'protected': {
          'type': 'boolean'
        },
        'verified': {
          'type': 'boolean'
        },
        'followers_count': {
          'type': 'integer'
        },
        'friends_count': {
          'type': 'integer'
        },
        'listed_count': {
          'type': 'integer'
        },
        'favourites_count': {
          'type': 'integer'
        },
        'statuses_count': {
          'type': 'integer'
        },
        'created_at': {
          'type': 'string'
        },
        'utc_offset': {
          'type': 'integer'
        },
        'time_zone': {
          'type': 'string'
        },
        'geo_enabled': {
          'type': 'boolean'
        },
        'lang': {
          'type': 'string'
        },
        'contributors_enabled': {
          'type': 'boolean'
        },
        'is_translator': {
          'type': 'boolean'
        },
        'profile_background_color': {
          'type': 'string'
        },
        'profile_background_image_url': {
          'type': 'string'
        },
        'profile_background_image_url_https': {
          'type': 'string'
        },
        'profile_background_tile': {
          'type': 'boolean'
        },
        'profile_link_color': {
          'type': 'string'
        },
        'profile_sidebar_border_color': {
          'type': 'string'
        },
        'profile_sidebar_fill_color': {
          'type': 'string'
        },
        'profile_text_color': {
          'type': 'string'
        },
        'profile_use_background_image': {
          'type': 'boolean'
        },
        'profile_image_url': {
          'type': 'string'
        },
        'profile_image_url_https': {
          'type': 'string'
        },
        'profile_banner_url': {
          'type': 'string'
        },
        'default_profile': {
          'type': 'boolean'
        },
        'default_profile_image': {
          'type': 'boolean'
        },
        'following': {
          'type': 'null'
        },
        'follow_request_sent': {
          'type': 'null'
        },
        'notifications': {
          'type': 'null'
        }
      },
      'required': [
        'id',
        'id_str',
        'name',
        'screen_name',
        'location',
        'url',
        'description',
        'translator_type',
        'protected',
        'verified',
        'followers_count',
        'friends_count',
        'listed_count',
        'favourites_count',
        'statuses_count',
        'created_at',
        'utc_offset',
        'time_zone',
        'geo_enabled',
        'lang',
        'contributors_enabled',
        'is_translator',
        'profile_background_color',
        'profile_background_image_url',
        'profile_background_image_url_https',
        'profile_background_tile',
        'profile_link_color',
        'profile_sidebar_border_color',
        'profile_sidebar_fill_color',
        'profile_text_color',
        'profile_use_background_image',
        'profile_image_url',
        'profile_image_url_https',
        'profile_banner_url',
        'default_profile',
        'default_profile_image',
        'following',
        'follow_request_sent',
        'notifications'
      ]
    },
    'geo': {
      'type': 'null'
    },
    'coordinates': {
      'type': 'null'
    },
    'place': {
      'type': 'null'
    },
    'contributors': {
      'type': 'null'
    },
    'is_quote_status': {
      'type': 'boolean'
    },
    'quote_count': {
      'type': 'integer'
    },
    'reply_count': {
      'type': 'integer'
    },
    'retweet_count': {
      'type': 'integer'
    },
    'favorite_count': {
      'type': 'integer'
    },
    'entities': {
      'type': 'object',
      'properties': {
        'hashtags': {
          'type': 'array',
          'items': [
            {
              'type': 'object',
              'properties': {
                'text': {
                  'type': 'string'
                },
                'indices': {
                  'type': 'array',
                  'items': [
                    {
                      'type': 'integer'
                    },
                    {
                      'type': 'integer'
                    }
                  ]
                }
              },
              'required': [
                'text',
                'indices'
              ]
            }
          ]
        },
        'urls': {
          'type': 'array',
          'items': [
            {
              'type': 'object',
              'properties': {
                'url': {
                  'type': 'string'
                },
                'expanded_url': {
                  'type': 'string'
                },
                'display_url': {
                  'type': 'string'
                },
                'indices': {
                  'type': 'array',
                  'items': [
                    {
                      'type': 'integer'
                    },
                    {
                      'type': 'integer'
                    }
                  ]
                }
              },
              'required': [
                'url',
                'expanded_url',
                'display_url',
                'indices'
              ]
            }
          ]
        },
        'user_mentions': {
          'type': 'array',
          'items': {}
        },
        'symbols': {
          'type': 'array',
          'items': {}
        }
      },
      'required': [
        'hashtags',
        'urls',
        'user_mentions',
        'symbols'
      ]
    },
    'favorited': {
      'type': 'boolean'
    },
    'retweeted': {
      'type': 'boolean'
    },
    'possibly_sensitive': {
      'type': 'boolean'
    },
    'filter_level': {
      'type': 'string'
    },
    'lang': {
      'type': 'string'
    },
    'timestamp_ms': {
      'type': 'string'
    }
  },
  'required': [
    'created_at',
    'id',
    'id_str',
    'text',
    'source',
    'truncated',
    'in_reply_to_status_id',
    'in_reply_to_status_id_str',
    'in_reply_to_user_id',
    'in_reply_to_user_id_str',
    'in_reply_to_screen_name',
    'user',
    'geo',
    'coordinates',
    'place',
    'contributors',
    'is_quote_status',
    'quote_count',
    'reply_count',
    'retweet_count',
    'favorite_count',
    'entities',
    'favorited',
    'retweeted',
    'possibly_sensitive',
    'filter_level',
    'lang',
    'timestamp_ms'
  ]
}

exports.tweetWithURLOnly = {
  'type': 'object',
  'properties': {
    'created_at': {
      'type': 'string'
    },
    'id': {
      'type': 'integer'
    },
    'id_str': {
      'type': 'string'
    },
    'text': {
      'type': 'string'
    },
    'source': {
      'type': 'string'
    },
    'truncated': {
      'type': 'boolean'
    },
    'in_reply_to_status_id': {
      'type': 'null'
    },
    'in_reply_to_status_id_str': {
      'type': 'null'
    },
    'in_reply_to_user_id': {
      'type': 'null'
    },
    'in_reply_to_user_id_str': {
      'type': 'null'
    },
    'in_reply_to_screen_name': {
      'type': 'null'
    },
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
        },
        'location': {
          'type': 'string'
        },
        'url': {
          'type': 'null'
        },
        'description': {
          'type': 'string'
        },
        'translator_type': {
          'type': 'string'
        },
        'protected': {
          'type': 'boolean'
        },
        'verified': {
          'type': 'boolean'
        },
        'followers_count': {
          'type': 'integer'
        },
        'friends_count': {
          'type': 'integer'
        },
        'listed_count': {
          'type': 'integer'
        },
        'favourites_count': {
          'type': 'integer'
        },
        'statuses_count': {
          'type': 'integer'
        },
        'created_at': {
          'type': 'string'
        },
        'utc_offset': {
          'type': 'integer'
        },
        'time_zone': {
          'type': 'string'
        },
        'geo_enabled': {
          'type': 'boolean'
        },
        'lang': {
          'type': 'string'
        },
        'contributors_enabled': {
          'type': 'boolean'
        },
        'is_translator': {
          'type': 'boolean'
        },
        'profile_background_color': {
          'type': 'string'
        },
        'profile_background_image_url': {
          'type': 'string'
        },
        'profile_background_image_url_https': {
          'type': 'string'
        },
        'profile_background_tile': {
          'type': 'boolean'
        },
        'profile_link_color': {
          'type': 'string'
        },
        'profile_sidebar_border_color': {
          'type': 'string'
        },
        'profile_sidebar_fill_color': {
          'type': 'string'
        },
        'profile_text_color': {
          'type': 'string'
        },
        'profile_use_background_image': {
          'type': 'boolean'
        },
        'profile_image_url': {
          'type': 'string'
        },
        'profile_image_url_https': {
          'type': 'string'
        },
        'profile_banner_url': {
          'type': 'string'
        },
        'default_profile': {
          'type': 'boolean'
        },
        'default_profile_image': {
          'type': 'boolean'
        },
        'following': {
          'type': 'null'
        },
        'follow_request_sent': {
          'type': 'null'
        },
        'notifications': {
          'type': 'null'
        }
      },
      'required': [
        'id',
        'id_str',
        'name',
        'screen_name',
        'location',
        'url',
        'description',
        'translator_type',
        'protected',
        'verified',
        'followers_count',
        'friends_count',
        'listed_count',
        'favourites_count',
        'statuses_count',
        'created_at',
        'utc_offset',
        'time_zone',
        'geo_enabled',
        'lang',
        'contributors_enabled',
        'is_translator',
        'profile_background_color',
        'profile_background_image_url',
        'profile_background_image_url_https',
        'profile_background_tile',
        'profile_link_color',
        'profile_sidebar_border_color',
        'profile_sidebar_fill_color',
        'profile_text_color',
        'profile_use_background_image',
        'profile_image_url',
        'profile_image_url_https',
        'profile_banner_url',
        'default_profile',
        'default_profile_image',
        'following',
        'follow_request_sent',
        'notifications'
      ]
    },
    'geo': {
      'type': 'null'
    },
    'coordinates': {
      'type': 'null'
    },
    'place': {
      'type': 'null'
    },
    'contributors': {
      'type': 'null'
    },
    'is_quote_status': {
      'type': 'boolean'
    },
    'quote_count': {
      'type': 'integer'
    },
    'reply_count': {
      'type': 'integer'
    },
    'retweet_count': {
      'type': 'integer'
    },
    'favorite_count': {
      'type': 'integer'
    },
    'entities': {
      'type': 'object',
      'properties': {
        'hashtags': {
          'type': 'array',
          'items': {}
        },
        'urls': {
          'type': 'array',
          'items': [
            {
              'type': 'object',
              'properties': {
                'url': {
                  'type': 'string'
                },
                'expanded_url': {
                  'type': 'string'
                },
                'display_url': {
                  'type': 'string'
                },
                'indices': {
                  'type': 'array',
                  'items': [
                    {
                      'type': 'integer'
                    },
                    {
                      'type': 'integer'
                    }
                  ]
                }
              },
              'required': [
                'url',
                'expanded_url',
                'display_url',
                'indices'
              ]
            }
          ]
        },
        'user_mentions': {
          'type': 'array',
          'items': {}
        },
        'symbols': {
          'type': 'array',
          'items': {}
        }
      },
      'required': [
        'hashtags',
        'urls',
        'user_mentions',
        'symbols'
      ]
    },
    'favorited': {
      'type': 'boolean'
    },
    'retweeted': {
      'type': 'boolean'
    },
    'possibly_sensitive': {
      'type': 'boolean'
    },
    'filter_level': {
      'type': 'string'
    },
    'lang': {
      'type': 'string'
    },
    'timestamp_ms': {
      'type': 'string'
    }
  },
  'required': [
    'created_at',
    'id',
    'id_str',
    'text',
    'source',
    'truncated',
    'in_reply_to_status_id',
    'in_reply_to_status_id_str',
    'in_reply_to_user_id',
    'in_reply_to_user_id_str',
    'in_reply_to_screen_name',
    'user',
    'geo',
    'coordinates',
    'place',
    'contributors',
    'is_quote_status',
    'quote_count',
    'reply_count',
    'retweet_count',
    'favorite_count',
    'entities',
    'favorited',
    'retweeted',
    'possibly_sensitive',
    'filter_level',
    'lang',
    'timestamp_ms'
  ]
}

exports.tweetwithLinkandTextAndImage = {
  'type': 'object',
  'properties': {
    'created_at': {
      'type': 'string'
    },
    'id': {
      'type': 'integer'
    },
    'id_str': {
      'type': 'string'
    },
    'text': {
      'type': 'string'
    },
    'display_text_range': {
      'type': 'array',
      'items': [
        {
          'type': 'integer'
        },
        {
          'type': 'integer'
        }
      ]
    },
    'source': {
      'type': 'string'
    },
    'truncated': {
      'type': 'boolean'
    },
    'in_reply_to_status_id': {
      'type': 'null'
    },
    'in_reply_to_status_id_str': {
      'type': 'null'
    },
    'in_reply_to_user_id': {
      'type': 'null'
    },
    'in_reply_to_user_id_str': {
      'type': 'null'
    },
    'in_reply_to_screen_name': {
      'type': 'null'
    },
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
        },
        'location': {
          'type': 'string'
        },
        'url': {
          'type': 'null'
        },
        'description': {
          'type': 'string'
        },
        'translator_type': {
          'type': 'string'
        },
        'protected': {
          'type': 'boolean'
        },
        'verified': {
          'type': 'boolean'
        },
        'followers_count': {
          'type': 'integer'
        },
        'friends_count': {
          'type': 'integer'
        },
        'listed_count': {
          'type': 'integer'
        },
        'favourites_count': {
          'type': 'integer'
        },
        'statuses_count': {
          'type': 'integer'
        },
        'created_at': {
          'type': 'string'
        },
        'utc_offset': {
          'type': 'integer'
        },
        'time_zone': {
          'type': 'string'
        },
        'geo_enabled': {
          'type': 'boolean'
        },
        'lang': {
          'type': 'string'
        },
        'contributors_enabled': {
          'type': 'boolean'
        },
        'is_translator': {
          'type': 'boolean'
        },
        'profile_background_color': {
          'type': 'string'
        },
        'profile_background_image_url': {
          'type': 'string'
        },
        'profile_background_image_url_https': {
          'type': 'string'
        },
        'profile_background_tile': {
          'type': 'boolean'
        },
        'profile_link_color': {
          'type': 'string'
        },
        'profile_sidebar_border_color': {
          'type': 'string'
        },
        'profile_sidebar_fill_color': {
          'type': 'string'
        },
        'profile_text_color': {
          'type': 'string'
        },
        'profile_use_background_image': {
          'type': 'boolean'
        },
        'profile_image_url': {
          'type': 'string'
        },
        'profile_image_url_https': {
          'type': 'string'
        },
        'profile_banner_url': {
          'type': 'string'
        },
        'default_profile': {
          'type': 'boolean'
        },
        'default_profile_image': {
          'type': 'boolean'
        },
        'following': {
          'type': 'null'
        },
        'follow_request_sent': {
          'type': 'null'
        },
        'notifications': {
          'type': 'null'
        }
      },
      'required': [
        'id',
        'id_str',
        'name',
        'screen_name',
        'location',
        'url',
        'description',
        'translator_type',
        'protected',
        'verified',
        'followers_count',
        'friends_count',
        'listed_count',
        'favourites_count',
        'statuses_count',
        'created_at',
        'utc_offset',
        'time_zone',
        'geo_enabled',
        'lang',
        'contributors_enabled',
        'is_translator',
        'profile_background_color',
        'profile_background_image_url',
        'profile_background_image_url_https',
        'profile_background_tile',
        'profile_link_color',
        'profile_sidebar_border_color',
        'profile_sidebar_fill_color',
        'profile_text_color',
        'profile_use_background_image',
        'profile_image_url',
        'profile_image_url_https',
        'profile_banner_url',
        'default_profile',
        'default_profile_image',
        'following',
        'follow_request_sent',
        'notifications'
      ]
    },
    'geo': {
      'type': 'null'
    },
    'coordinates': {
      'type': 'null'
    },
    'place': {
      'type': 'null'
    },
    'contributors': {
      'type': 'null'
    },
    'is_quote_status': {
      'type': 'boolean'
    },
    'quote_count': {
      'type': 'integer'
    },
    'reply_count': {
      'type': 'integer'
    },
    'retweet_count': {
      'type': 'integer'
    },
    'favorite_count': {
      'type': 'integer'
    },
    'entities': {
      'type': 'object',
      'properties': {
        'hashtags': {
          'type': 'array',
          'items': {}
        },
        'urls': {
          'type': 'array',
          'items': [
            {
              'type': 'object',
              'properties': {
                'url': {
                  'type': 'string'
                },
                'expanded_url': {
                  'type': 'string'
                },
                'display_url': {
                  'type': 'string'
                },
                'indices': {
                  'type': 'array',
                  'items': [
                    {
                      'type': 'integer'
                    },
                    {
                      'type': 'integer'
                    }
                  ]
                }
              },
              'required': [
                'url',
                'expanded_url',
                'display_url',
                'indices'
              ]
            }
          ]
        },
        'user_mentions': {
          'type': 'array',
          'items': {}
        },
        'symbols': {
          'type': 'array',
          'items': {}
        },
        'media': {
          'type': 'array',
          'items': [
            {
              'type': 'object',
              'properties': {
                'id': {
                  'type': 'integer'
                },
                'id_str': {
                  'type': 'string'
                },
                'indices': {
                  'type': 'array',
                  'items': [
                    {
                      'type': 'integer'
                    },
                    {
                      'type': 'integer'
                    }
                  ]
                },
                'media_url': {
                  'type': 'string'
                },
                'media_url_https': {
                  'type': 'string'
                },
                'url': {
                  'type': 'string'
                },
                'display_url': {
                  'type': 'string'
                },
                'expanded_url': {
                  'type': 'string'
                },
                'type': {
                  'type': 'string'
                },
                'sizes': {
                  'type': 'object',
                  'properties': {
                    'large': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    },
                    'small': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    },
                    'medium': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    },
                    'thumb': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    }
                  },
                  'required': [
                    'large',
                    'small',
                    'medium',
                    'thumb'
                  ]
                }
              },
              'required': [
                'id',
                'id_str',
                'indices',
                'media_url',
                'media_url_https',
                'url',
                'display_url',
                'expanded_url',
                'type',
                'sizes'
              ]
            }
          ]
        }
      },
      'required': [
        'hashtags',
        'urls',
        'user_mentions',
        'symbols',
        'media'
      ]
    },
    'extended_entities': {
      'type': 'object',
      'properties': {
        'media': {
          'type': 'array',
          'items': [
            {
              'type': 'object',
              'properties': {
                'id': {
                  'type': 'integer'
                },
                'id_str': {
                  'type': 'string'
                },
                'indices': {
                  'type': 'array',
                  'items': [
                    {
                      'type': 'integer'
                    },
                    {
                      'type': 'integer'
                    }
                  ]
                },
                'media_url': {
                  'type': 'string'
                },
                'media_url_https': {
                  'type': 'string'
                },
                'url': {
                  'type': 'string'
                },
                'display_url': {
                  'type': 'string'
                },
                'expanded_url': {
                  'type': 'string'
                },
                'type': {
                  'type': 'string'
                },
                'sizes': {
                  'type': 'object',
                  'properties': {
                    'large': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    },
                    'small': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    },
                    'medium': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    },
                    'thumb': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    }
                  },
                  'required': [
                    'large',
                    'small',
                    'medium',
                    'thumb'
                  ]
                }
              },
              'required': [
                'id',
                'id_str',
                'indices',
                'media_url',
                'media_url_https',
                'url',
                'display_url',
                'expanded_url',
                'type',
                'sizes'
              ]
            }
          ]
        }
      },
      'required': [
        'media'
      ]
    },
    'favorited': {
      'type': 'boolean'
    },
    'retweeted': {
      'type': 'boolean'
    },
    'possibly_sensitive': {
      'type': 'boolean'
    },
    'filter_level': {
      'type': 'string'
    },
    'lang': {
      'type': 'string'
    },
    'timestamp_ms': {
      'type': 'string'
    }
  },
  'required': [
    'created_at',
    'id',
    'id_str',
    'text',
    'display_text_range',
    'source',
    'truncated',
    'in_reply_to_status_id',
    'in_reply_to_status_id_str',
    'in_reply_to_user_id',
    'in_reply_to_user_id_str',
    'in_reply_to_screen_name',
    'user',
    'geo',
    'coordinates',
    'place',
    'contributors',
    'is_quote_status',
    'quote_count',
    'reply_count',
    'retweet_count',
    'favorite_count',
    'entities',
    'extended_entities',
    'favorited',
    'retweeted',
    'possibly_sensitive',
    'filter_level',
    'lang',
    'timestamp_ms'
  ]
}

exports.imageOnly = {
  'type': 'object',
  'properties': {
    'created_at': {
      'type': 'string'
    },
    'id': {
      'type': 'integer'
    },
    'id_str': {
      'type': 'string'
    },
    'text': {
      'type': 'string'
    },
    'display_text_range': {
      'type': 'array',
      'items': [
        {
          'type': 'integer'
        },
        {
          'type': 'integer'
        }
      ]
    },
    'source': {
      'type': 'string'
    },
    'truncated': {
      'type': 'boolean'
    },
    'in_reply_to_status_id': {
      'type': 'null'
    },
    'in_reply_to_status_id_str': {
      'type': 'null'
    },
    'in_reply_to_user_id': {
      'type': 'null'
    },
    'in_reply_to_user_id_str': {
      'type': 'null'
    },
    'in_reply_to_screen_name': {
      'type': 'null'
    },
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
        },
        'location': {
          'type': 'string'
        },
        'url': {
          'type': 'null'
        },
        'description': {
          'type': 'string'
        },
        'translator_type': {
          'type': 'string'
        },
        'protected': {
          'type': 'boolean'
        },
        'verified': {
          'type': 'boolean'
        },
        'followers_count': {
          'type': 'integer'
        },
        'friends_count': {
          'type': 'integer'
        },
        'listed_count': {
          'type': 'integer'
        },
        'favourites_count': {
          'type': 'integer'
        },
        'statuses_count': {
          'type': 'integer'
        },
        'created_at': {
          'type': 'string'
        },
        'utc_offset': {
          'type': 'integer'
        },
        'time_zone': {
          'type': 'string'
        },
        'geo_enabled': {
          'type': 'boolean'
        },
        'lang': {
          'type': 'string'
        },
        'contributors_enabled': {
          'type': 'boolean'
        },
        'is_translator': {
          'type': 'boolean'
        },
        'profile_background_color': {
          'type': 'string'
        },
        'profile_background_image_url': {
          'type': 'string'
        },
        'profile_background_image_url_https': {
          'type': 'string'
        },
        'profile_background_tile': {
          'type': 'boolean'
        },
        'profile_link_color': {
          'type': 'string'
        },
        'profile_sidebar_border_color': {
          'type': 'string'
        },
        'profile_sidebar_fill_color': {
          'type': 'string'
        },
        'profile_text_color': {
          'type': 'string'
        },
        'profile_use_background_image': {
          'type': 'boolean'
        },
        'profile_image_url': {
          'type': 'string'
        },
        'profile_image_url_https': {
          'type': 'string'
        },
        'profile_banner_url': {
          'type': 'string'
        },
        'default_profile': {
          'type': 'boolean'
        },
        'default_profile_image': {
          'type': 'boolean'
        },
        'following': {
          'type': 'null'
        },
        'follow_request_sent': {
          'type': 'null'
        },
        'notifications': {
          'type': 'null'
        }
      },
      'required': [
        'id',
        'id_str',
        'name',
        'screen_name',
        'location',
        'url',
        'description',
        'translator_type',
        'protected',
        'verified',
        'followers_count',
        'friends_count',
        'listed_count',
        'favourites_count',
        'statuses_count',
        'created_at',
        'utc_offset',
        'time_zone',
        'geo_enabled',
        'lang',
        'contributors_enabled',
        'is_translator',
        'profile_background_color',
        'profile_background_image_url',
        'profile_background_image_url_https',
        'profile_background_tile',
        'profile_link_color',
        'profile_sidebar_border_color',
        'profile_sidebar_fill_color',
        'profile_text_color',
        'profile_use_background_image',
        'profile_image_url',
        'profile_image_url_https',
        'profile_banner_url',
        'default_profile',
        'default_profile_image',
        'following',
        'follow_request_sent',
        'notifications'
      ]
    },
    'geo': {
      'type': 'null'
    },
    'coordinates': {
      'type': 'null'
    },
    'place': {
      'type': 'null'
    },
    'contributors': {
      'type': 'null'
    },
    'is_quote_status': {
      'type': 'boolean'
    },
    'quote_count': {
      'type': 'integer'
    },
    'reply_count': {
      'type': 'integer'
    },
    'retweet_count': {
      'type': 'integer'
    },
    'favorite_count': {
      'type': 'integer'
    },
    'entities': {
      'type': 'object',
      'properties': {
        'hashtags': {
          'type': 'array',
          'items': {}
        },
        'urls': {
          'type': 'array',
          'items': [
            {
              'type': 'object',
              'properties': {
                'url': {
                  'type': 'string'
                },
                'expanded_url': {
                  'type': 'string'
                },
                'display_url': {
                  'type': 'string'
                },
                'indices': {
                  'type': 'array',
                  'items': [
                    {
                      'type': 'integer'
                    },
                    {
                      'type': 'integer'
                    }
                  ]
                }
              },
              'required': [
                'url',
                'expanded_url',
                'display_url',
                'indices'
              ]
            }
          ]
        },
        'user_mentions': {
          'type': 'array',
          'items': {}
        },
        'symbols': {
          'type': 'array',
          'items': {}
        },
        'media': {
          'type': 'array',
          'items': [
            {
              'type': 'object',
              'properties': {
                'id': {
                  'type': 'integer'
                },
                'id_str': {
                  'type': 'string'
                },
                'indices': {
                  'type': 'array',
                  'items': [
                    {
                      'type': 'integer'
                    },
                    {
                      'type': 'integer'
                    }
                  ]
                },
                'media_url': {
                  'type': 'string'
                },
                'media_url_https': {
                  'type': 'string'
                },
                'url': {
                  'type': 'string'
                },
                'display_url': {
                  'type': 'string'
                },
                'expanded_url': {
                  'type': 'string'
                },
                'type': {
                  'type': 'string'
                },
                'sizes': {
                  'type': 'object',
                  'properties': {
                    'large': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    },
                    'small': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    },
                    'medium': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    },
                    'thumb': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    }
                  },
                  'required': [
                    'large',
                    'small',
                    'medium',
                    'thumb'
                  ]
                }
              },
              'required': [
                'id',
                'id_str',
                'indices',
                'media_url',
                'media_url_https',
                'url',
                'display_url',
                'expanded_url',
                'type',
                'sizes'
              ]
            }
          ]
        }
      },
      'required': [
        'hashtags',
        'urls',
        'user_mentions',
        'symbols',
        'media'
      ]
    },
    'extended_entities': {
      'type': 'object',
      'properties': {
        'media': {
          'type': 'array',
          'items': [
            {
              'type': 'object',
              'properties': {
                'id': {
                  'type': 'integer'
                },
                'id_str': {
                  'type': 'string'
                },
                'indices': {
                  'type': 'array',
                  'items': [
                    {
                      'type': 'integer'
                    },
                    {
                      'type': 'integer'
                    }
                  ]
                },
                'media_url': {
                  'type': 'string'
                },
                'media_url_https': {
                  'type': 'string'
                },
                'url': {
                  'type': 'string'
                },
                'display_url': {
                  'type': 'string'
                },
                'expanded_url': {
                  'type': 'string'
                },
                'type': {
                  'type': 'string'
                },
                'sizes': {
                  'type': 'object',
                  'properties': {
                    'large': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    },
                    'small': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    },
                    'medium': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    },
                    'thumb': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    }
                  },
                  'required': [
                    'large',
                    'small',
                    'medium',
                    'thumb'
                  ]
                }
              },
              'required': [
                'id',
                'id_str',
                'indices',
                'media_url',
                'media_url_https',
                'url',
                'display_url',
                'expanded_url',
                'type',
                'sizes'
              ]
            }
          ]
        }
      },
      'required': [
        'media'
      ]
    },
    'favorited': {
      'type': 'boolean'
    },
    'retweeted': {
      'type': 'boolean'
    },
    'possibly_sensitive': {
      'type': 'boolean'
    },
    'filter_level': {
      'type': 'string'
    },
    'lang': {
      'type': 'string'
    },
    'timestamp_ms': {
      'type': 'string'
    }
  },
  'required': [
    'created_at',
    'id',
    'id_str',
    'text',
    'display_text_range',
    'source',
    'truncated',
    'in_reply_to_status_id',
    'in_reply_to_status_id_str',
    'in_reply_to_user_id',
    'in_reply_to_user_id_str',
    'in_reply_to_screen_name',
    'user',
    'geo',
    'coordinates',
    'place',
    'contributors',
    'is_quote_status',
    'quote_count',
    'reply_count',
    'retweet_count',
    'favorite_count',
    'entities',
    'extended_entities',
    'favorited',
    'retweeted',
    'possibly_sensitive',
    'filter_level',
    'lang',
    'timestamp_ms'
  ]
}

exports.tweetMultipleImages = {
  'type': 'object',
  'properties': {
    'created_at': {
      'type': 'string'
    },
    'id': {
      'type': 'integer'
    },
    'id_str': {
      'type': 'string'
    },
    'text': {
      'type': 'string'
    },
    'display_text_range': {
      'type': 'array',
      'items': [
        {
          'type': 'integer'
        },
        {
          'type': 'integer'
        }
      ]
    },
    'source': {
      'type': 'string'
    },
    'truncated': {
      'type': 'boolean'
    },
    'in_reply_to_status_id': {
      'type': 'null'
    },
    'in_reply_to_status_id_str': {
      'type': 'null'
    },
    'in_reply_to_user_id': {
      'type': 'null'
    },
    'in_reply_to_user_id_str': {
      'type': 'null'
    },
    'in_reply_to_screen_name': {
      'type': 'null'
    },
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
        },
        'location': {
          'type': 'string'
        },
        'url': {
          'type': 'null'
        },
        'description': {
          'type': 'string'
        },
        'translator_type': {
          'type': 'string'
        },
        'protected': {
          'type': 'boolean'
        },
        'verified': {
          'type': 'boolean'
        },
        'followers_count': {
          'type': 'integer'
        },
        'friends_count': {
          'type': 'integer'
        },
        'listed_count': {
          'type': 'integer'
        },
        'favourites_count': {
          'type': 'integer'
        },
        'statuses_count': {
          'type': 'integer'
        },
        'created_at': {
          'type': 'string'
        },
        'utc_offset': {
          'type': 'integer'
        },
        'time_zone': {
          'type': 'string'
        },
        'geo_enabled': {
          'type': 'boolean'
        },
        'lang': {
          'type': 'string'
        },
        'contributors_enabled': {
          'type': 'boolean'
        },
        'is_translator': {
          'type': 'boolean'
        },
        'profile_background_color': {
          'type': 'string'
        },
        'profile_background_image_url': {
          'type': 'string'
        },
        'profile_background_image_url_https': {
          'type': 'string'
        },
        'profile_background_tile': {
          'type': 'boolean'
        },
        'profile_link_color': {
          'type': 'string'
        },
        'profile_sidebar_border_color': {
          'type': 'string'
        },
        'profile_sidebar_fill_color': {
          'type': 'string'
        },
        'profile_text_color': {
          'type': 'string'
        },
        'profile_use_background_image': {
          'type': 'boolean'
        },
        'profile_image_url': {
          'type': 'string'
        },
        'profile_image_url_https': {
          'type': 'string'
        },
        'profile_banner_url': {
          'type': 'string'
        },
        'default_profile': {
          'type': 'boolean'
        },
        'default_profile_image': {
          'type': 'boolean'
        },
        'following': {
          'type': 'null'
        },
        'follow_request_sent': {
          'type': 'null'
        },
        'notifications': {
          'type': 'null'
        }
      },
      'required': [
        'id',
        'id_str',
        'name',
        'screen_name',
        'location',
        'url',
        'description',
        'translator_type',
        'protected',
        'verified',
        'followers_count',
        'friends_count',
        'listed_count',
        'favourites_count',
        'statuses_count',
        'created_at',
        'utc_offset',
        'time_zone',
        'geo_enabled',
        'lang',
        'contributors_enabled',
        'is_translator',
        'profile_background_color',
        'profile_background_image_url',
        'profile_background_image_url_https',
        'profile_background_tile',
        'profile_link_color',
        'profile_sidebar_border_color',
        'profile_sidebar_fill_color',
        'profile_text_color',
        'profile_use_background_image',
        'profile_image_url',
        'profile_image_url_https',
        'profile_banner_url',
        'default_profile',
        'default_profile_image',
        'following',
        'follow_request_sent',
        'notifications'
      ]
    },
    'geo': {
      'type': 'null'
    },
    'coordinates': {
      'type': 'null'
    },
    'place': {
      'type': 'null'
    },
    'contributors': {
      'type': 'null'
    },
    'is_quote_status': {
      'type': 'boolean'
    },
    'quote_count': {
      'type': 'integer'
    },
    'reply_count': {
      'type': 'integer'
    },
    'retweet_count': {
      'type': 'integer'
    },
    'favorite_count': {
      'type': 'integer'
    },
    'entities': {
      'type': 'object',
      'properties': {
        'hashtags': {
          'type': 'array',
          'items': {}
        },
        'urls': {
          'type': 'array',
          'items': {}
        },
        'user_mentions': {
          'type': 'array',
          'items': {}
        },
        'symbols': {
          'type': 'array',
          'items': {}
        },
        'media': {
          'type': 'array',
          'items': [
            {
              'type': 'object',
              'properties': {
                'id': {
                  'type': 'integer'
                },
                'id_str': {
                  'type': 'string'
                },
                'indices': {
                  'type': 'array',
                  'items': [
                    {
                      'type': 'integer'
                    },
                    {
                      'type': 'integer'
                    }
                  ]
                },
                'media_url': {
                  'type': 'string'
                },
                'media_url_https': {
                  'type': 'string'
                },
                'url': {
                  'type': 'string'
                },
                'display_url': {
                  'type': 'string'
                },
                'expanded_url': {
                  'type': 'string'
                },
                'type': {
                  'type': 'string'
                },
                'sizes': {
                  'type': 'object',
                  'properties': {
                    'medium': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    },
                    'large': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    },
                    'small': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    },
                    'thumb': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    }
                  },
                  'required': [
                    'medium',
                    'large',
                    'small',
                    'thumb'
                  ]
                }
              },
              'required': [
                'id',
                'id_str',
                'indices',
                'media_url',
                'media_url_https',
                'url',
                'display_url',
                'expanded_url',
                'type',
                'sizes'
              ]
            }
          ]
        }
      },
      'required': [
        'hashtags',
        'urls',
        'user_mentions',
        'symbols',
        'media'
      ]
    },
    'extended_entities': {
      'type': 'object',
      'properties': {
        'media': {
          'type': 'array',
          'items': [
            {
              'type': 'object',
              'properties': {
                'id': {
                  'type': 'integer'
                },
                'id_str': {
                  'type': 'string'
                },
                'indices': {
                  'type': 'array',
                  'items': [
                    {
                      'type': 'integer'
                    },
                    {
                      'type': 'integer'
                    }
                  ]
                },
                'media_url': {
                  'type': 'string'
                },
                'media_url_https': {
                  'type': 'string'
                },
                'url': {
                  'type': 'string'
                },
                'display_url': {
                  'type': 'string'
                },
                'expanded_url': {
                  'type': 'string'
                },
                'type': {
                  'type': 'string'
                },
                'sizes': {
                  'type': 'object',
                  'properties': {
                    'medium': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    },
                    'large': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    },
                    'small': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    },
                    'thumb': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    }
                  },
                  'required': [
                    'medium',
                    'large',
                    'small',
                    'thumb'
                  ]
                }
              },
              'required': [
                'id',
                'id_str',
                'indices',
                'media_url',
                'media_url_https',
                'url',
                'display_url',
                'expanded_url',
                'type',
                'sizes'
              ]
            },
            {
              'type': 'object',
              'properties': {
                'id': {
                  'type': 'integer'
                },
                'id_str': {
                  'type': 'string'
                },
                'indices': {
                  'type': 'array',
                  'items': [
                    {
                      'type': 'integer'
                    },
                    {
                      'type': 'integer'
                    }
                  ]
                },
                'media_url': {
                  'type': 'string'
                },
                'media_url_https': {
                  'type': 'string'
                },
                'url': {
                  'type': 'string'
                },
                'display_url': {
                  'type': 'string'
                },
                'expanded_url': {
                  'type': 'string'
                },
                'type': {
                  'type': 'string'
                },
                'sizes': {
                  'type': 'object',
                  'properties': {
                    'thumb': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    },
                    'medium': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    },
                    'large': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    },
                    'small': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    }
                  },
                  'required': [
                    'thumb',
                    'medium',
                    'large',
                    'small'
                  ]
                }
              },
              'required': [
                'id',
                'id_str',
                'indices',
                'media_url',
                'media_url_https',
                'url',
                'display_url',
                'expanded_url',
                'type',
                'sizes'
              ]
            }
          ]
        }
      },
      'required': [
        'media'
      ]
    },
    'favorited': {
      'type': 'boolean'
    },
    'retweeted': {
      'type': 'boolean'
    },
    'possibly_sensitive': {
      'type': 'boolean'
    },
    'filter_level': {
      'type': 'string'
    },
    'lang': {
      'type': 'string'
    },
    'timestamp_ms': {
      'type': 'string'
    }
  },
  'required': [
    'created_at',
    'id',
    'id_str',
    'text',
    'display_text_range',
    'source',
    'truncated',
    'in_reply_to_status_id',
    'in_reply_to_status_id_str',
    'in_reply_to_user_id',
    'in_reply_to_user_id_str',
    'in_reply_to_screen_name',
    'user',
    'geo',
    'coordinates',
    'place',
    'contributors',
    'is_quote_status',
    'quote_count',
    'reply_count',
    'retweet_count',
    'favorite_count',
    'entities',
    'extended_entities',
    'favorited',
    'retweeted',
    'possibly_sensitive',
    'filter_level',
    'lang',
    'timestamp_ms'
  ]
}

exports.tweetVideo = {
  'type': 'object',
  'properties': {
    'created_at': {
      'type': 'string'
    },
    'id': {
      'type': 'integer'
    },
    'id_str': {
      'type': 'string'
    },
    'text': {
      'type': 'string'
    },
    'display_text_range': {
      'type': 'array',
      'items': [
        {
          'type': 'integer'
        },
        {
          'type': 'integer'
        }
      ]
    },
    'source': {
      'type': 'string'
    },
    'truncated': {
      'type': 'boolean'
    },
    'in_reply_to_status_id': {
      'type': 'null'
    },
    'in_reply_to_status_id_str': {
      'type': 'null'
    },
    'in_reply_to_user_id': {
      'type': 'null'
    },
    'in_reply_to_user_id_str': {
      'type': 'null'
    },
    'in_reply_to_screen_name': {
      'type': 'null'
    },
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
        },
        'location': {
          'type': 'string'
        },
        'url': {
          'type': 'null'
        },
        'description': {
          'type': 'string'
        },
        'translator_type': {
          'type': 'string'
        },
        'protected': {
          'type': 'boolean'
        },
        'verified': {
          'type': 'boolean'
        },
        'followers_count': {
          'type': 'integer'
        },
        'friends_count': {
          'type': 'integer'
        },
        'listed_count': {
          'type': 'integer'
        },
        'favourites_count': {
          'type': 'integer'
        },
        'statuses_count': {
          'type': 'integer'
        },
        'created_at': {
          'type': 'string'
        },
        'utc_offset': {
          'type': 'integer'
        },
        'time_zone': {
          'type': 'string'
        },
        'geo_enabled': {
          'type': 'boolean'
        },
        'lang': {
          'type': 'string'
        },
        'contributors_enabled': {
          'type': 'boolean'
        },
        'is_translator': {
          'type': 'boolean'
        },
        'profile_background_color': {
          'type': 'string'
        },
        'profile_background_image_url': {
          'type': 'string'
        },
        'profile_background_image_url_https': {
          'type': 'string'
        },
        'profile_background_tile': {
          'type': 'boolean'
        },
        'profile_link_color': {
          'type': 'string'
        },
        'profile_sidebar_border_color': {
          'type': 'string'
        },
        'profile_sidebar_fill_color': {
          'type': 'string'
        },
        'profile_text_color': {
          'type': 'string'
        },
        'profile_use_background_image': {
          'type': 'boolean'
        },
        'profile_image_url': {
          'type': 'string'
        },
        'profile_image_url_https': {
          'type': 'string'
        },
        'profile_banner_url': {
          'type': 'string'
        },
        'default_profile': {
          'type': 'boolean'
        },
        'default_profile_image': {
          'type': 'boolean'
        },
        'following': {
          'type': 'null'
        },
        'follow_request_sent': {
          'type': 'null'
        },
        'notifications': {
          'type': 'null'
        }
      },
      'required': [
        'id',
        'id_str',
        'name',
        'screen_name',
        'location',
        'url',
        'description',
        'translator_type',
        'protected',
        'verified',
        'followers_count',
        'friends_count',
        'listed_count',
        'favourites_count',
        'statuses_count',
        'created_at',
        'utc_offset',
        'time_zone',
        'geo_enabled',
        'lang',
        'contributors_enabled',
        'is_translator',
        'profile_background_color',
        'profile_background_image_url',
        'profile_background_image_url_https',
        'profile_background_tile',
        'profile_link_color',
        'profile_sidebar_border_color',
        'profile_sidebar_fill_color',
        'profile_text_color',
        'profile_use_background_image',
        'profile_image_url',
        'profile_image_url_https',
        'profile_banner_url',
        'default_profile',
        'default_profile_image',
        'following',
        'follow_request_sent',
        'notifications'
      ]
    },
    'geo': {
      'type': 'null'
    },
    'coordinates': {
      'type': 'null'
    },
    'place': {
      'type': 'null'
    },
    'contributors': {
      'type': 'null'
    },
    'is_quote_status': {
      'type': 'boolean'
    },
    'quote_count': {
      'type': 'integer'
    },
    'reply_count': {
      'type': 'integer'
    },
    'retweet_count': {
      'type': 'integer'
    },
    'favorite_count': {
      'type': 'integer'
    },
    'entities': {
      'type': 'object',
      'properties': {
        'hashtags': {
          'type': 'array',
          'items': {}
        },
        'urls': {
          'type': 'array',
          'items': {}
        },
        'user_mentions': {
          'type': 'array',
          'items': {}
        },
        'symbols': {
          'type': 'array',
          'items': {}
        },
        'media': {
          'type': 'array',
          'items': [
            {
              'type': 'object',
              'properties': {
                'id': {
                  'type': 'integer'
                },
                'id_str': {
                  'type': 'string'
                },
                'indices': {
                  'type': 'array',
                  'items': [
                    {
                      'type': 'integer'
                    },
                    {
                      'type': 'integer'
                    }
                  ]
                },
                'media_url': {
                  'type': 'string'
                },
                'media_url_https': {
                  'type': 'string'
                },
                'url': {
                  'type': 'string'
                },
                'display_url': {
                  'type': 'string'
                },
                'expanded_url': {
                  'type': 'string'
                },
                'type': {
                  'type': 'string'
                },
                'sizes': {
                  'type': 'object',
                  'properties': {
                    'large': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    },
                    'thumb': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    },
                    'small': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    },
                    'medium': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    }
                  },
                  'required': [
                    'large',
                    'thumb',
                    'small',
                    'medium'
                  ]
                }
              },
              'required': [
                'id',
                'id_str',
                'indices',
                'media_url',
                'media_url_https',
                'url',
                'display_url',
                'expanded_url',
                'type',
                'sizes'
              ]
            }
          ]
        }
      },
      'required': [
        'hashtags',
        'urls',
        'user_mentions',
        'symbols',
        'media'
      ]
    },
    'extended_entities': {
      'type': 'object',
      'properties': {
        'media': {
          'type': 'array',
          'items': [
            {
              'type': 'object',
              'properties': {
                'id': {
                  'type': 'integer'
                },
                'id_str': {
                  'type': 'string'
                },
                'indices': {
                  'type': 'array',
                  'items': [
                    {
                      'type': 'integer'
                    },
                    {
                      'type': 'integer'
                    }
                  ]
                },
                'media_url': {
                  'type': 'string'
                },
                'media_url_https': {
                  'type': 'string'
                },
                'url': {
                  'type': 'string'
                },
                'display_url': {
                  'type': 'string'
                },
                'expanded_url': {
                  'type': 'string'
                },
                'type': {
                  'type': 'string'
                },
                'sizes': {
                  'type': 'object',
                  'properties': {
                    'large': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    },
                    'thumb': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    },
                    'small': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    },
                    'medium': {
                      'type': 'object',
                      'properties': {
                        'w': {
                          'type': 'integer'
                        },
                        'h': {
                          'type': 'integer'
                        },
                        'resize': {
                          'type': 'string'
                        }
                      },
                      'required': [
                        'w',
                        'h',
                        'resize'
                      ]
                    }
                  },
                  'required': [
                    'large',
                    'thumb',
                    'small',
                    'medium'
                  ]
                },
                'video_info': {
                  'type': 'object',
                  'properties': {
                    'aspect_ratio': {
                      'type': 'array',
                      'items': [
                        {
                          'type': 'integer'
                        },
                        {
                          'type': 'integer'
                        }
                      ]
                    },
                    'duration_millis': {
                      'type': 'integer'
                    },
                    'variants': {
                      'type': 'array',
                      'items': [
                        {
                          'type': 'object',
                          'properties': {
                            'content_type': {
                              'type': 'string'
                            },
                            'url': {
                              'type': 'string'
                            }
                          },
                          'required': [
                            'content_type',
                            'url'
                          ]
                        },
                        {
                          'type': 'object',
                          'properties': {
                            'bitrate': {
                              'type': 'integer'
                            },
                            'content_type': {
                              'type': 'string'
                            },
                            'url': {
                              'type': 'string'
                            }
                          },
                          'required': [
                            'bitrate',
                            'content_type',
                            'url'
                          ]
                        }
                      ]
                    }
                  },
                  'required': [
                    'aspect_ratio',
                    'duration_millis',
                    'variants'
                  ]
                }
              },
              'required': [
                'id',
                'id_str',
                'indices',
                'media_url',
                'media_url_https',
                'url',
                'display_url',
                'expanded_url',
                'type',
                'sizes',
                'video_info'
              ]
            }
          ]
        }
      },
      'required': [
        'media'
      ]
    },
    'favorited': {
      'type': 'boolean'
    },
    'retweeted': {
      'type': 'boolean'
    },
    'possibly_sensitive': {
      'type': 'boolean'
    },
    'filter_level': {
      'type': 'string'
    },
    'lang': {
      'type': 'string'
    },
    'timestamp_ms': {
      'type': 'string'
    }
  },
  'required': [
    'created_at',
    'id',
    'id_str',
    'text',
    'display_text_range',
    'source',
    'truncated',
    'in_reply_to_status_id',
    'in_reply_to_status_id_str',
    'in_reply_to_user_id',
    'in_reply_to_user_id_str',
    'in_reply_to_screen_name',
    'user',
    'geo',
    'coordinates',
    'place',
    'contributors',
    'is_quote_status',
    'quote_count',
    'reply_count',
    'retweet_count',
    'favorite_count',
    'entities',
    'extended_entities',
    'favorited',
    'retweeted',
    'possibly_sensitive',
    'filter_level',
    'lang',
    'timestamp_ms'
  ]
}
