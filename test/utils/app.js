const express = require('express')
const s3Config = require('../../s3.json')

const app = express()

const staticBasePath = `/${s3Config.Release.S3BasePath}/latest`

app.use(staticBasePath, express.static('src'))

module.exports = { app, staticBasePath }
