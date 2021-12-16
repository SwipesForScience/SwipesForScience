'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  AWS_ID: '"TEST_ID"',
  AWS_KEY: '"TEST_KEY"'
})
