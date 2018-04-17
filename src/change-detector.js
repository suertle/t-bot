const
  request  = require('request'),
  scrapeIt = require("scrape-it")

let previousValue = 'Binance is Now Available in Turkish'
let index = 0
let domain = 'https://support.binance.com'
let src = [
  {
    url: 'https://support.binance.com/hc/en-us/categories/115000056351-Announcements',
    selector: {
      news: 'body > main > div.container > div > div > div > section:nth-child(2) > ul > li:nth-child(1)',
      link: 'body > main > div.container > div > div > div > section:nth-child(2) > ul > li:nth-child(1) > a'
    }
  },
]

exports.checkValue = function() {
  scrapeIt(src[index].url, {
    news: src[index].selector.news,
    link: {
      selector: src[index].selector.link,
      attr: "href"
    }
  }).then(( {data, response} ) => {
    const newValue = data.news
    const link = data.link
    if (newValue && previousValue !== newValue) {
      sendMessage(newValue + '\n' + domain + link)
      console.log(`${previousValue} -> ${newValue}`)
      previousValue = newValue
    }
    else {
      console.log(newValue)
    }
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