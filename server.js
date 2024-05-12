const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./config/connect');

const port = process.env.PORT || 8080;
const app = express();

/* ***********************
 * Middleware
 * ************************/
app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

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
