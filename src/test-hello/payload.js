/* eslint-env browser */
/* global act */
function loadSDK (callback) {
  var script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = 'https://certification.bbctvapps.co.uk/act/sdk/v1.0.1/actsdk.min.umd.js'
  script.onload = function () { callback() }
  document.getElementsByTagName('head')[0].appendChild(script)
}

function runTest () {
  act.start()
  try {
    var greeting = 'Hello, World!'
    act.log(greeting)
    greeting ? act.success() : act.fail('Greeting var was not truthy')
  } catch (err) {
    act.error(err)
  }
}

loadSDK(runTest)
