/* eslint-env mocha */
const path = require('path')
const { readdirSync } = require('fs')

module.exports = readdirSync(path.join(__dirname, '../../src/'))
