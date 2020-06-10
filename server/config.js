const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  mongo: {
    uri: 'mongodb://localhost/test-backend-db',
    options: {
      debug: true
    }
  },
  ip: process.env.IP || 'localhost',
  log: {
    level: process.env.LOG_LEVEL || 'debug', // 'error', 'warn', 'info', 'verbose', 'debug', 'silly'
    format: process.env.LOG_FORMAT || 'dev' // 'short', 'default', 'combined', 'common', 'dev'
  }
}

export default config
