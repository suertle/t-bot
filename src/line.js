const
  request = require('request'),
  AccountManager = require('./user-manager')

let token = 'aMhxiWzMZLyZj2hLpbSdL1tZiSAFDkGBNv2qioe+KhgkH0SOjaDCw+f6WLeXdGFMHpn7t9UOw35aZ7gzDQIsCh0vbS4s91Nnjv/XfXgNEjimxHL/WIxen1KjeNBR50eFRiSIgUNEz6npfBpmarJcGQdB04t89/1O/w1cDnyilFU='
let groupID = 'Caa75cf4101f13f1f6349de072f4f0f71'
let headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + token
}

exports.pushMessage = function(text) {
  let body = JSON.stringify({
    "to": groupID,
    "messages":[
      {
        "type":"text",
        "text":text
      }
    ]
  })
  request.post({
    url: 'https://api.line.me/v2/bot/message/push',
    headers: headers,
    body: body
  }, (err, res, body) => {
    console.log('status = ' + res.statusCode)
  })
}

exports.postWebhook = (req, res) => {
  let reply_token = req.body.events[0].replyToken
  let msg = req.body.events[0].message.text
  // req.body.events[0].source.userId
  console.log(req.body.events[0])
  reply(reply_token, msg)
  res.sendStatus(200)
}

function reply(reply_token) {
  let body = JSON.stringify({
    replyToken: reply_token,
    messages: [{
      type: 'text',
      text: 'kuy'
    }]
  })
  request.post({
    url: 'https://api.line.me/v2/bot/message/reply',
    headers: headers,
    body: body
  }, (err, res, body) => {
    console.log('status = ' + res.statusCode)
  })
}