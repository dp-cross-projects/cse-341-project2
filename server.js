const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./config/connect');
const mainModel = require('./models/index');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 8080;
const app = express();

/* ***********************
 * Middleware
 * ************************/
app
  .use(bodyParser.json())
  .use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Conent-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    next();
  })
  .use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE'] }))
  .use(cors({ origin: '*' }))
  .use('/', require('./routes'));

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },

    async function (accessToken, refreshToken, profile, done) {
      try {
        let user = await mainModel.getGithubUser(profile.id);
        if (!user) {
          user = {
            githubId: profile.id,
            username: profile.username,
            displayName: profile.displayName
          };
          await mainModel.newGithubUser(user);
        }
        return done(null, profile);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, profile);
});

passport.deserializeUser((user, done) => {
  done(null, profile);
});

app.get('/', async (req, res) => {
  if (req.session.user !== undefined) {
    const response = await mainModel.getGithubUser(req.session.user.id);
    res.send( `Logged as ${response.displayName}`);
  } else {
    res.send(
    'Logged Out')
  }

});

app.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/api-docs',
    session: false
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

/* ***********************
 * Express Error Handler
 *************************/
app.use(async (err, req, res, next) => {
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  console.log(err);
});

/* ***********************
 * Log statement to confirm
 * server operation and
 * database connection
 *************************/
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
