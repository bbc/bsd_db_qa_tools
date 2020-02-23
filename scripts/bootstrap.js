const path = require('path')
const runCommand = require('./utils/runCommand')
const { write } = require('./utils/asyncFs')
const { readJsonFile, writeJsonFile } = require('./utils/jsonFile')

function getProjectName () {
  const projectDirectory = path.join(__dirname, '..')
  const parentDirectory = path.join(projectDirectory, '..')
  const projectName = path.relative(parentDirectory, projectDirectory)
  console.log('Project Name: ', projectName)
  return projectName
}

async function updatePackageFile (projectName) {
  console.log('Updating package.json')
  const packageFile = await readJsonFile('package.json')
  packageFile.name = projectName
  packageFile.repository.url = `git+https://github.com/bbc/${projectName}.git`
  await writeJsonFile('package.json', packageFile)
}

async function updateS3Config (projectName) {
  console.log('Updating s3.json')
  const bucketConfig = await readJsonFile('s3.json')
  bucketConfig.Environments.live.Bucket.BucketName = projectName
  bucketConfig.Environments.test.Bucket.BucketName = projectName + '-test'
  bucketConfig.GitHub.Repo = projectName
  bucketConfig.Release.S3BasePath = 'act/test/' + projectName.match(/(act-test-)?(?<category>.*)/).groups.category
  await writeJsonFile('s3.json', bucketConfig)
}

async function updateReadme (projectName) {
  console.log('Updating Readme')
  await write('README.md', `# ${projectName}\n\nPlease update me with a description.\n`)
}

async function runBootstrap () {
  const projectName = getProjectName()
  await updatePackageFile(projectName)
  await updateS3Config(projectName)
  await updateReadme(projectName)
  await runCommand('npm install')
  await runCommand('npm run s3:create-ci')
}

runBootstrap()
