/* eslint-env mocha */
const { expect } = require('chai')
const request = require('request')
const cheerio = require('cheerio')

const { baseUrl } = require('../utils/testServer')
const tests = require('../utils/tests')

tests.forEach((testName) => {
  describe(`Test payload for ${testName}`, () => {
    let data = {}
    describe(`GET ${baseUrl}/${testName}/`, () => {
      before((done) => {
        request.get(`${baseUrl}/${testName}/`, (error, response, body) => {
          if (error) {
            console.error(error)
          } else {
            data.status = response.statusCode
            data.$ = cheerio.load(body)
            done()
          }
        })
      })
      it('should return a 200 status code', () => {
        expect(data.status).to.equal(200)
      })
      it('Contains a testStatus with warning if Javascript disabled', async () => {
        const testStatus = await data.$('#testStatus').text()
        expect(testStatus).is.equal('Failed to Load (Javascript Disabled)')
      })
      it('Contains a script tag to load the test javascript', async () => {
        const scriptSrc = data.$('script').map((i, el) => {
          return data.$(el).attr('src')
        }).get()
        expect(scriptSrc).to.contain('./payload.js')
      })
    })
  })
})
