require('dotenv').config()

const express = require('express')
const session = require('express-session')
const app = express()

// DB, middlewares, locals & debug
require('./configs/mongoose.config')
require('./configs/middleware.config')(app)
require('./configs/preprocessor.config')(app)
require('./configs/locals.config')(app)
require('./configs/debug.config')
require('./configs/passport.config')(app)

// Base URL's
app.use('/', require('./routes/index.routes'))
app.use('/auth', require('./routes/auth.routes'))

module.exports = app