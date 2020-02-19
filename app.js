require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')(session);
const flash = require("connect-flash");

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

module.exports = app