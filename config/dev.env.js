'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  AWS_ID: '"ZBWI7FYEARY7RW8L00E8"',
  AWS_KEY: '"cdCbJgZDJT5UAVs3Cfc0HRAmLGyf1LlAdUXN0iKj"'
})
