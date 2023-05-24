'use strict'

const conn = require('../../db.js')
const logTable = require('./logFunctions.js')
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
  return new Promise((resolve, reject) => {
    const hashedPassword = generateHashedPassword(user.password)
    const sql = 'INSERT INTO users (email, name, surname, password, role) VALUES (?, ?, ?, ?, ?)'
    const params = [user.email, user.name, user.surname, hashedPassword, user.role]
    conn.execute(sql, params, (err, results, fields) => {
      if (err) {
        reject(err)
      } else {
        const action = {
          date: new Date().toISOString().slice(0, 10),
          time: new Date().toISOString().slice(11, 19),
          nature: 'New User Created',
          email: user.email
        }
        logTable.logAction(action)
        console.log('User added to database')
        resolve(JSON.stringify(results))
      }
    })
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

// Function to get a user from the database
exports.getUser = function (email) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE email = ?'
    conn.execute(sql, [email], (err, results, fields) => {
      if (err) {
        reject(err)
      } else {
        console.log('User retrieved from database')
        resolve(JSON.stringify(results))
      }
    })
  })
}

// Function to validate a user's password
exports.validateUser = function (email, password) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT password FROM users WHERE email = ?'
    conn.execute(sql, [email], (err, results, fields) => {
      if (err) {
        reject(err)
      } else {
        // check to ensure that the user exists
        if (results.length === 0) {
          resolve(false)
        } else {
          console.log('User retrieved from database')
          const hashedPassword = results[0].password
          const isValid = bcrypt.compareSync(password, hashedPassword)
          resolve(isValid)
        }
      }
    })
  })
}

// Function to delete a user from the database
exports.deleteUser = function (email) {
  const sql = 'DELETE FROM users WHERE email = ?'
  conn.execute(sql, [email], (err, results, fields) => {
    if (err) throw err
    else console.log('User deleted from database')
  })
}
