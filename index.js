'use strict';

// Imports dependencies and set up http server
const
  express         = require('express'),
  bodyParser      = require('body-parser'),
  app             = express().use(bodyParser.json()), // creates express http server
  Test            = require('./src/test'),
  ChangeDetector  = require('./src/change-detector')

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening..'))

app.get('/', Test.get)

// interval check for changing
setInterval(ChangeDetector.checkValue, 60*1000)