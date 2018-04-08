const request = require('request')

exports.postWebhook = (req, res) => {
  let reply_token = req.body.events[0].replyToken
  let msg = req.body.events[0].message.text
  console.log(req.body.events[0])
  reply(reply_token, msg)
  res.sendStatus(200)
}

function reply(reply_token) {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer aMhxiWzMZLyZj2hLpbSdL1tZiSAFDkGBNv2qioe+KhgkH0SOjaDCw+f6WLeXdGFMHpn7t9UOw35aZ7gzDQIsCh0vbS4s91Nnjv/XfXgNEjimxHL/WIxen1KjeNBR50eFRiSIgUNEz6npfBpmarJcGQdB04t89/1O/w1cDnyilFU='
  }
  let body = JSON.stringify({
    replyToken: reply_token,
    messages: [{
      type: 'text',
      text: 'Hello'
    },
    {
      type: 'text',
      text: 'How are you?'
    }]
  })
  request.post({
    url: 'https://api.line.me/v2/bot/message/reply',
    headers: headers,
    body: body
  }, (err, res, body) => {
    console.log('status = ' + res.statusCode)
  });
}

function broadcast(text) {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer aMhxiWzMZLyZj2hLpbSdL1tZiSAFDkGBNv2qioe+KhgkH0SOjaDCw+f6WLeXdGFMHpn7t9UOw35aZ7gzDQIsCh0vbS4s91Nnjv/XfXgNEjimxHL/WIxen1KjeNBR50eFRiSIgUNEz6npfBpmarJcGQdB04t89/1O/w1cDnyilFU='
  }
  let body = JSON.stringify({
    replyToken: reply_token,
    messages: [{
      type: 'text',
      text: 'Hello'
    },
    {
      type: 'text',
      text: 'How are you?'
    }]
  })
  request.post({
    url: 'https://api.line.me/v2/bot/message/reply',
    headers: headers,
    body: body
  }, (err, res, body) => {
    console.log('status = ' + res.statusCode)
  });
}