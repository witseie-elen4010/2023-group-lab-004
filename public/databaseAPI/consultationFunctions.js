'use strict'

const conn = require('../../db.js')
const logTable = require('./logFunctions.js')
const bookingTable = require('./bookingsFunctions.js')

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
        const action = {
          date: new Date().toISOString().slice(0, 10),
          time: new Date().toISOString().slice(11, 19),
          nature: 'New Consultation Created',
          email: user.email
        }
        logTable.logAction(action)
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

// function to get all planned consultations from the database
exports.getAllPlannedConsultations = function () {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM consultations'
    conn.execute(sql, (err, results, fields) => {
      if (err) {
        reject(err)
      } else {
        console.log('Consultations retrieved from database')
        resolve(results)
      }
    })
  })
}

// function to get consultations that a student can join given a chosen lecturer
exports.getStudentConsultations = function (studentEmail, lecturerEmail) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT c.* FROM consultations c LEFT JOIN bookings b ON c.id = b.meeting_id AND b.student_email = ? WHERE c.email = ? AND b.id IS NULL'
    const params = [studentEmail, lecturerEmail]
    conn.execute(sql, params, (err, results, fields) => {
      if (err) {
        reject(err)
      } else {
        console.log('Consultations retrieved from database')
        resolve(results)
      }
    })
  })
}
