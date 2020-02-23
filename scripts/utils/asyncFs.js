const fs = require('fs')
const { promisify } = require('util')

const read = promisify(fs.readFile)
const write = promisify(fs.writeFile)

module.exports = {
  read,
  write
}
