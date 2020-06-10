import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import mongoose from './services/mongoose'
import router from '../api'
import config from './config'
import logger from './services/logger'

const { env, port, mongo, ip } = config

const app = express()

app.set('port', port || 3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.use('/', router)

const server = http.createServer(app)

setImmediate(() => {
  server.listen(port, ip, () => {
    logger.info(
      'Express server listening on http://%s:%d, in %s mode',
      ip,
      port,
      env
    )
  })
})

mongoose.connect(mongo.uri).then(
  () => {
    logger.info(`Mongoose connection opened  ${mongo.uri}`)
  },
  (err) => {
    logger.info(`Mongoose connection failed, error:  ${err}`)
  }
)
export default app
