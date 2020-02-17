const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const flash = require('connect-flash')
const mongoose = require('mongoose');

const session = require("express-session");
const MongoStore = require('connect-mongo')(session);

const User = require('../models/User.model')

module.exports = app => {

  passport.serializeUser((user, next) => next(null, user._id))

  passport.deserializeUser((id, next) => {

    User.findById(id, (err, user) => {
      if (err) {
        return next(err)
      }
      next(null, user)
    });
  });

  app.use(flash())

  passport.use(new LocalStrategy({
    passReqToCallback: true
  }, (req, username, password, next) => {
    User.findOne({
      username
    }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(null, false, {
          message: 'Incorrect username'
        });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, {
          message: 'Incorrect password'
        });
      }

      return next(null, user);
    });
  }));

  // Enable authentication using session + passport
  app.use(session({
    secret: 'irongenerator',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  }))
  app.use(flash());
}