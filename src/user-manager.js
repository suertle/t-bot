let userList = []

exports.addUser = function(userId) {
  if (this.check(userId)) {
    return false
  }
  else {
    userList.push(userId)
    return true
  }
}

exports.check = function(userId) {
  return userList.includes(userId)
}

exports.removeUser = function(userId) {
  var index = userList.indexOf(userId)
  if (index !== -1) {
    userList.splice(index, 1)
    return true
  }
  else {
    return false
  }
}

exports.list = function() {
  console.log(userList)
  return userList
}