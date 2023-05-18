'use strict'

const conn = require('../DBconn')
const bcrypt = require('bcrypt')
// Dont call directly
function generateHashedPassword (password) {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

// function to add a user to the database, note that password is plaintext password!!!
function createUser (email, name, surname, password, role) {
  const hashedPassword = generateHashedPassword(password)
  const sql = 'INSERT INTO users (email, name, surname, password, role) VALUES (?, ?, ?, ?, ?)'
  const params = [email, name, surname, hashedPassword, role]
  return new Promise(function (resolve, reject) {
    conn.query(sql, params, function (err, results, fields) {
      if (err) reject(err)
      else resolve(results)
    })
  })
}

// function to validate a users password
function validateUser (email, password, callback) {
  const sql = 'SELECT * FROM users WHERE email = ?'
  const params = [email]

  conn.query(sql, params, function (err, result, fields) {
    if (err) {
      throw err
    }

    const isValid = bcrypt.compareSync(password, result[0].password)
    callback(isValid)
  })
}

// validateUser is a callback function, has to be called like this
// validateUser('ahmad@test.com', 'password1234', function (isValid) {
//   console.log('Password is valid:', isValid)
// })
