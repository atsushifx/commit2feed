// @(#) ; jsdoc config file
//
//
// @version   0.1.0
// @author    Furukawa Atsushi <atsushifx@aglabo.com>
// @date      2024-05-16
//
// @description<<
//
// jsdoc config file
//
// <<

'use strict'

module.exports = {
  plugins: ['plugins/markdown'],
  source: {
    include: ['src'],
    includePattern: '.+\\.js$',
    exclude: ['test', 'node_modules']
  },
  opts: {
    destination: './dist/_jsdoc',
    recurse: true
  }
}
