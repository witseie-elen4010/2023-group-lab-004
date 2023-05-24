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
