'use strict'
module.exports = {
  NODE_ENV: '"production"',
  VUE_APP_AWS_ID: JSON.stringify(process.env.VUE_APP_AWS_ID),
  VUE_APP_AWS_KEY: JSON.stringify(process.env.VUE_APP_AWS_KEY)
}
