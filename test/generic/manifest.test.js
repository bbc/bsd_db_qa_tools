/* eslint-env mocha */
const { expect } = require('chai')
const request = require('request')

const { baseUrl } = require('../utils/testServer')
const tests = require('../utils/tests')

tests.forEach((testName) => {
  describe(`manifest.json for ${testName}`, () => {
    let data = {}
    describe(`GET ${baseUrl}/${testName}/manifest.json`, () => {
      before((done) => {
        request.get(`${baseUrl}/${testName}/manifest.json`, (error, response, body) => {
          if (error) {
            console.error(error)
          } else {
            data.status = response.statusCode
            data.body = JSON.parse(body)
            done()
          }
        })
      })
      it('should return a 200 status code', () => {
        expect(data.status).to.equal(200)
      })
      it('should return a URL for test', () => {
        expect(data.body.payload).to.equal('payload.js')
      })
      it('should give a title for test', () => {
        expect(data.body.title).to.be.a('string')
      })
      it('should return a tag stating the owner of the test', () => {
        expect(data.body.tags.owner).be.a('string')
      })
    })
  })
})
