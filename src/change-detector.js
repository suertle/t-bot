const
  request  = require('request'),
  scrapeIt = require("scrape-it")

let previousValue = {
  listing: 'Binance Adds ADA/BNB and ADA/USDT Trading Pairs',
  news: 'Binance is Now Available in Turkish'
}
let domain = 'https://support.binance.com'
let src = {
  url: 'https://support.binance.com/hc/en-us/categories/115000056351-Announcements',
  selector: {
    listing: {
      text: 'body > main > div.container > div > div > div > section:nth-child(1) > ul > li:nth-child(1)',
      link: 'body > main > div.container > div > div > div > section:nth-child(1) > ul > li:nth-child(1) > a'
    },
    news: {
      text: 'body > main > div.container > div > div > div > section:nth-child(2) > ul > li:nth-child(1)',
      link: 'body > main > div.container > div > div > div > section:nth-child(2) > ul > li:nth-child(1) > a'
    }
  }
}

exports.checkValue = function() {
  scrapeIt(src.url, {
    listingText: src.selector.listing.text,
    listingLink: {
      selector: src.selector.listing.link,
      attr: "href"
    },
    newsText: src.selector.news.text,
    newsLink: {
      selector: src.selector.news.link,
      attr: "href"
    }
  }).then(( {data, response} ) => {
    const listingText = data.listingText
    const listingLink = data.listingLink
    const newsText = data.newsText
    const newsLink = data.newsLink
    // check listing
    if (listingText && listingText !== previousValue.listing) {
      sendMessage(listingText + '\n' + domain + listingLink)
      console.log("listing change")
      previousValue.listing = listingText
    }
    // check news
    if (newsText && newsText !== previousValue.news) {
      sendMessage(newsText + '\n' + domain + newsLink)
      console.log("news change")
      previousValue.news = newsText
    }
    console.log(listingText + ' / ' + newsText)
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