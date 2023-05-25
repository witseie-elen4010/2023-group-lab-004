'use strict'

const conn = require('../../db.js')

// Function to log an action to the database
exports.logAction = function (action) {
  const sql = 'INSERT INTO log (date, time, nature, email) VALUES (?, ?, ?, ?)'
  const params = [action.date, action.time, action.nature, action.email]
  conn.execute(sql, params, (err, results, fields) => {
    if (err) throw err
    else console.log('Action logged to database')
  })
}

// function to get all logs from the database
exports.getAllLogs = function () {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM log'
    conn.execute(sql, (err, results, fields) => {
      if (err) {
        reject(err)
      } else {
        console.log('Logs retrieved from database')
        resolve(results)
      }
    })
  })
}
