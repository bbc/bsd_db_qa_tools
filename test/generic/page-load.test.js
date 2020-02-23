/* eslint-env mocha */
const { expect } = require('chai')

const headless = require('../utils/headless')
const { baseUrl } = require('../utils/testServer')
const tests = require('../utils/tests')

tests.forEach((testName) => {
  describe(`Test payload for ${testName}`, () => {
    describe(`Loading the Page for ${testName}`, () => {
      let page
      let responses = []
      let failedRequests = []
      let successfullRequests = []

      before(async () => {
        page = await headless()

        page.on('request', request => successfullRequests.push(request))
        page.on('requestfailed', request => failedRequests.push(request))
        page.on('response', response => responses.push(response))
        await page.goto(`${baseUrl}/${testName}/`)
      })

      after(async () => {
        await page.close()
      })

      it('didnt have any failed requests', () => {
        const badUrls = failedRequests.map(request => request.url())
        expect(badUrls).to.deep.equal([])
      })

      it('didnt recieve any non-2** responses', () => {
        const badResponses = responses
          .filter(response => !response.ok())
          .map(response => `${response.status()} ${response.url()}`)
        expect(badResponses).to.deep.equal([])
      })

      it('Test automatically runs and completes', async () => {
        await page.waitForFunction(() => document.querySelector('#testStatus').innerHTML !== 'Failed to Load (Javascript Disabled)')
        await page.waitForFunction(() => document.querySelector('#testStatus').innerHTML !== 'Test Running...')
        const testStatusText = await page.$eval('#testStatus', element => element.innerHTML)
        expect(testStatusText).to.equal('Test Passed')
      })
    })
  })
})
