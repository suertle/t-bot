'use strict';

// Imports dependencies and set up http server
const
  express         = require('express'),
  bodyParser      = require('body-parser'),
  app             = express().use(bodyParser.json()), // creates express http server
  Test            = require('./src/test'),
  Messenger       = require('./src/messenger'),
  Line            = require('./src/line'),
  ChangeDetector  = require('./src/change-detector')

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'))

app.get('/', Test.get)

// Creates the endpoint for our mesenger webhook
app.post('/webhook/messenger', Messenger.postWebhook)

// Adds support for GET requests to our webhook
app.get('/webhook/messenger', Messenger.postWebhook)

// Creates the endpoint for our line webhook
app.post('/webhook/line', Line.postWebhook)

// interval check for changing
setInterval(ChangeDetector.checkValue, 30*1000)