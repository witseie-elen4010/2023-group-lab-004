'use strict'

const conn = require('../../db.js')
const bcrypt = require('bcrypt')
// Dont call directly
function generateHashedPassword (password) {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

// function to add a user to the database, user is a JSON object
// user = {
//   email: 'email',
//   name: 'name',
//   surname: 'surname',
//   password: 'password',
//   role: 'role'
// }
exports.createUser = function (user) {
  const hashedPassword = generateHashedPassword(user.password)
  const sql = 'INSERT INTO users (email, name, surname, password, role) VALUES (?, ?, ?, ?, ?)'
  const params = [user.email, user.name, user.surname, hashedPassword, user.role]
  return new Promise(function (resolve, reject) {
    conn.query(sql, params, function (err, results, fields) {
      if (err) reject(err)
      else resolve(results)
    })
  })
}
