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
  conn.query(sql, params, (err, results, fields) => {
    if (err) throw err
    else console.log('User added to database')
  })
}

// Function to get all users from the database
exports.getAllUsers = function () {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users'
    conn.execute(sql, (err, results, fields) => {
      if (err) {
        reject(err)
      } else {
        console.log('Users retrieved from database')
        resolve(results)
      }
    })
  })
}

exports.getUser = function (email) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE email = ?'
    conn.execute(sql, [email], (err, results, fields) => {
      if (err) {
        reject(err)
      } else {
        console.log('User retrieved from database')
        resolve(results)
      }
    })
  })
}
