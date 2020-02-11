const bcrypt = require('bcryptjs')

const encryptPassword = string => bcrypt.hash(string, 10)

const comparePassword = (string, hash) => bcrypt.compare(string, hash)

module.exports.encrypt = encryptPassword
module.exports.compare = comparePassword