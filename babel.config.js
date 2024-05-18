// @(#) ; babel config file
//
// @version   0.1.0
// @author    Furukawa Atsushi <atsushifx@aglabo.com>
// @date      2024-05-16
//
// @description<<
//
// babel config file
// it use for Jest configuration
//
// <<
'use strict'

export default {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false
      }
    ]
  ],
  ignore: ['**/__tests__/**'] 
}
