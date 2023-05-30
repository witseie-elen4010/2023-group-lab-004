'use strict'

const conn = require('../../db.js')

// Get all consultations for a lecturer
exports.getAllConsultations = function (email) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM consultations WHERE email = ?'
    conn.execute(sql, [email], (err, results, fields) => {
      if (err) {
        reject(err)
      } else {
        console.log('Consultations retrieved from database')
        resolve(results)
      }
    })
  }
  )
}

// Add a consultation to the database
exports.addConsultation = function (user) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO consultations (meeting_title, email, date, time, number_of_students, active, duration) VALUES (?, ?, ?, ?, ?, ?, ?)'
    const params = [user.meeting_title, user.email, user.date, user.time, user.number_of_students, user.active, user.duration]
    conn.execute(sql, params, (err, results, fields) => {
      if (err) {
        reject(err)
      } else {
        console.log('Consultation added to database')
        resolve(JSON.stringify(results))
      }
    })
  })
}

// Set a consultation to inactive
exports.cancelConsultation = function (id) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE consultations SET active = 0 WHERE id = ?'
    conn.execute(sql, [id], (err, results, fields) => {
      if (err) {
        reject(err)
      } else {
        console.log('Consultation set to inactive')
        resolve(JSON.stringify(results))
      }
    })
  })
}
