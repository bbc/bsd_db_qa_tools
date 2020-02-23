/* eslint-env mocha */
const puppeteer = require('puppeteer')

let browser

before(async function () {
  console.log('Launching Puppeteer Browser')
  this.timeout(10000)
  const browserConfig = process.env.PUPPETEER_NO_SANDBOX
    ? { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
    : {}
  browser = await puppeteer.launch(browserConfig)
})

after(async function () {
  console.log('Closing Puppeteer Browser')
  browser.close()
})

async function setup () {
  console.log('New Puppeteer Page')
  const page = await browser.newPage()

  await page.setCacheEnabled(false)

  await page.setViewport({ width: 1280, height: 720, isLandscape: false })

  page.waitForTextToDissapear = async function (text) {
    return page.waitForFunction((tx) => document.body.innerHTML.includes(tx) === false, {}, text)
  }

  return page
}

module.exports = setup
