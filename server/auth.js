const app = require('APP')//, {env} = app
const debug = require('debug')(`${app.name}:auth`)
const passport = require('passport')

const User = require('APP/db/models/user')
const OAuth = require('APP/db/models/oauth')
const auth = require('express').Router()

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

require('APP/.env.js')

const bcrypt = require('bcrypt')

/*************************
 * Auth strategies
 * 
 * The OAuth model knows how to configure Passport middleware.
 * To enable an auth strategy, ensure that the appropriate
 * environment variables are set.
 * 
 * You can do it on the command line:
 * 
 *   FACEBOOK_CLIENT_ID=abcd FACEBOOK_CLIENT_SECRET=1234 npm start
 * 
 * Or, better, you can create a ~/.$your_app_name.env.json file in
 * your home directory, and set them in there:
 * 
 * {
 *   FACEBOOK_CLIENT_ID: 'abcd',
 *   FACEBOOK_CLIENT_SECRET: '1234',
 * }
 * 
 * Concentrating your secrets this way will make it less likely that you
 * accidentally push them to Github, for example.
 * 
 * When you deploy to production, you'll need to set up these environment
 * variables with your hosting provider.
 **/

// Facebook needs the FACEBOOK_CLIENT_ID and FACEBOOK_CLIENT_SECRET
// environment variables.
OAuth.setupStrategy({
  provider: 'facebook',
  strategy: require('passport-facebook').Strategy,
  config: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: `${app.rootUrl}/api/auth/login/facebook`,
  },
  passport
})

// Google needs the GOOGLE_CONSUMER_SECRET AND GOOGLE_CONSUMER_KEY
// environment variables.
// OAuth.setupStrategy({
//   provider: 'google',
//   strategy: require('passport-google-oauth').Strategy,
//   config: {
//     consumerKey: process.env.GOOGLE_CONSUMER_KEY,
//     consumerSecret: process.env.GOOGLE_CONSUMER_SECRET,
//     callbackURL: `${app.rootUrl}/api/auth/login/google`,
//   },
//   passport
// })

// Github needs the GITHUB_CLIENT_ID AND GITHUB_CLIENT_SECRET
// environment variables.
OAuth.setupStrategy({
  provider: 'github',
  strategy: require('passport-github2').Strategy,
  config: {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecrets: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${app.rootUrl}/api/auth/login/github`,
  },
  passport
})

// Other passport configuration:

passport.serializeUser((user, done) => {
  debug('will serialize user.id=%d', user.id)
  done(null, user.id)
  debug('did serialize user.id=%d', user.id)
})

passport.deserializeUser(
  (id, done) => {
    debug('will deserialize user.id=%d', id)
    User.findById(id)
      .then(user => {
        debug('deserialize did ok user.id=%d', user.id)
        done(null, user)
      })
      .catch(err => {
        debug('deserialize did fail err=%s', err)
        done(err)
      })
  }
)

passport.use(new (require('passport-local').Strategy) (
  (email, password, done) => {
    debug('will authenticate user(email: "%s")', email)
    User.findOne({where: {email}})
      .then(user => {
        if (!user) {
          debug('authenticate user(email: "%s") did fail: no such user', email)
          return done(null, false, { message: 'Login incorrect' })
        }
        return user.authenticate(password)
          .then(ok => {
            if (!ok) {
              debug('authenticate user(email: "%s") did fail: bad password')              
              return done(null, false, { message: 'Login incorrect' })
            }
            debug('authenticate user(email: "%s") did ok: user.id=%d', user.id)
            done(null, user)              
          })
      })
      .catch(done)
  }
))

auth.get('/whoami', (req, res) => {
 
  return res.send(req.user)

})

auth.post('/:strategy/login', (req, res, next) =>{
  /*console.log("ARSTARSTARST", req.body)

    return new Promise((resolve, reject) =>
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) reject(err)
      req.session.hashword = hash
      resolve(req)
    })
    )

      .then(req => */passport.authenticate(req.params.strategy, {
        successRedirect: '/'
      })(req, res, next)//)
}
)

auth.post('/logout', (req, res, next) => {
  //console.log(bcrypt.compareSync('123456',req.session.hashword))
  req.logout();
  //delete req.session.hashword;
  delete req.session.passport;
  res.redirect('/api/auth/whoami')
})

passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CONSUMER_KEY,
      clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
      callbackURL: '/api/auth/login/google'
    },
    // Google will send back the token and profile
    function (token, refreshToken, profile, done) {

      User.findOrCreate({
        where: {
          email: profile.emails[0].value
        }
      })
          .spread(function (user) {
            done(null, user);
          })
          .catch(done);

      // the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.
      /*
       --- fill this part in ---
       */
    }));

auth.get('/google', passport.authenticate('google', { scope : 'email' }));

// handle the callback after Google has authenticated the user
auth.get('/login/google',
    passport.authenticate('google', {
      successRedirect : '/', // or wherever
      failureRedirect : '/' // or wherever
    })
);

module.exports = auth
