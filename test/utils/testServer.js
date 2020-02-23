/* eslint-env mocha */
const { app, staticBasePath } = require('./app')

const port = process.env.PORT || 3000
const baseUrl = `http://localhost:${port}${staticBasePath}`

let server

before(function (done) {
  this.timeout(10000)
  console.log(`Starting Dev Server on ${baseUrl}`)
  server = app.listen(port, done)
})

after(() => {
  console.log(`Closing Dev Server`)
  server.close()
})

module.exports = { baseUrl }
