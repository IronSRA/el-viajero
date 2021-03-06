require('dotenv').config()
const express = require('express')
const app = express()

// DB, middlewares, locals & debug
require('./configs/mongoose.config')
require('./configs/debug.config')
require('./configs/preprocessor.config')(app)
require('./configs/middleware.config')(app)
require('./configs/locals.config')(app)
require('./configs/passport.config')(app)
require('./passport')(app);

// Base URL's
app.use('/', require('./routes/index.routes'))
app.use('/auth', require('./routes/auth.routes'))
app.use('/profile', require('./routes/profile.routes'))
app.use('/chat', require('./routes/chat.routes'))
app.use('/details', require('./routes/details.routes'))
app.use('/social', require('./routes/social.routes'))

module.exports = app