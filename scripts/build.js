const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const glob = require('glob')

const rootDir = path.join(__dirname, '../')
const buildDir = path.join(rootDir, 'build')
const srcDir = path.join(rootDir, 'src')

const asyncFs = {
  read: promisify(fs.readFile),
  write: promisify(fs.writeFile),
  mkdir: promisify(fs.mkdir)
}

const asyncGlob = promisify(glob)

async function buildFile (filePath, version) {
  let fileData
  filePath = path.join(rootDir, filePath)
  if (path.extname(filePath) === '.js') {
    fileData = await asyncFs.read(filePath, 'utf-8')
    fileData = fileData.replace(/\/act\/test\/(.*)\/latest\//g, (match, p1, offset, string) => `/act/test/${p1}/${version}/`)
  } else {
    fileData = await asyncFs.read(filePath)
  }
  const targetPath = path.join(buildDir, version, path.relative(srcDir, filePath))
  await asyncFs.mkdir(path.dirname(targetPath), { recursive: true })
  return asyncFs.write(targetPath, fileData)
}

async function build (src, version) {
  const files = await asyncGlob(`${src}/**/*.*`)
  await Promise.all(files.map(async file => { buildFile(file, version) }))
}

async function getVersion () {
  let version = 'latest'
  if (process.env.GITHUB_RELEASE === 'true') {
    const data = await asyncFs.read(path.join(rootDir, 'release.json'))
    const release = JSON.parse(data)
    version = release.tag_name
  }
  return version
}

async function run () {
  const version = await getVersion()
  await build('src', version)
}

run()
