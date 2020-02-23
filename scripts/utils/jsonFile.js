const { read, write } = require('./asyncFs')

async function readJsonFile (filepath) {
  const jsonString = await read(filepath)
  const jsonData = JSON.parse(jsonString)
  return jsonData
}

async function writeJsonFile (filepath, data) {
  const jsonString = JSON.stringify(data, null, 2)
  await write(filepath, jsonString)
}

module.exports = {
  readJsonFile,
  writeJsonFile
}
