// @(#) ; jest config file
//
// @version   0.1.0
// @author    Furukawa Atsushi <atsushifx@aglabo.com>
// @date      2024-05-16
//
// @description<<
//
// jest config file
//
// <<

'use strict'

module.exports = {
  roots: ['./src'],
  testMatch: ['**/__tests__/**/*.js?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
  // for Jest configuration
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '^src/(.*)$': './src/$1'
  }
}
