const
  request  = require('request'),
  scrapeIt = require("scrape-it")

let previousValue = 'QLC Competition Has Now Concluded'
let index = 0
let src = [
  {
    url: 'https://support.binance.com/hc/en-us/categories/115000056351-Announcements',
    selector: 'body > main > div.container > div > div > div > section:nth-child(2) > ul > li:nth-child(1)'
  },
  {
    url: 'https://www.binance.com/trade.html?symbol=ETH_USDT',
    selector: 'body > div.main > div > div.kline-para > ul > li:nth-child(1) > strong:nth-child(2)'
  }
]

exports.checkValue = function() {
  scrapeIt(src[index].url, {
    news: src[index].selector
  }).then(( {data, response} ) => {
    const newValue = data.news
    if (previousValue !== newValue) {
      sendMessage(newValue)
      console.log(`${previousValue} -> ${newValue}`)
    }
    else {
      console.log(newValue)
    }
    previousValue = newValue
  }).catch(e => {
    console.error('ERROR => ', e)
  })
}

function sendMessage(message) {
  request.post({
    url: 'https://tommeng-bot.herokuapp.com/sendMessage',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({message: message})
  }, (err, res, body) => {
    console.log(res.body + '...')
  })
}