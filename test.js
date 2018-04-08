const
  express = require('express'),
  bodyParser = require('body-parser'),
  request = require('request'),
  scrapeIt = require("scrape-it"),
  app = express().use(bodyParser.json()); // creates express http server

const Test = require('./src/test')

app.listen(process.env.PORT || 1337, () => console.log('webhook is listening jaa'));

exports.app = app

Test.walk()

app.get('/', Test.get)