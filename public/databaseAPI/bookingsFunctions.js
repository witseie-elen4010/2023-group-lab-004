'use-strict'

const conn = require('../../db.js')
const logTable = require('./logFunctions.js')

// add a new booking
exports.addBooking = function (studentEmail, meetingID) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO bookings (student_email, meeting_id) VALUES (?, ?)'
    const params = [studentEmail, meetingID]
    conn.execute(sql, params, (err, results, fields) => {
      if (err) {
        reject(err)
      } else {
        console.log('Booking added to database')
        const action = {
          date: new Date().toISOString().slice(0, 10),
          time: new Date().toISOString().slice(11, 19),
          nature: 'Consultation Joined',
          email: studentEmail
        }
        logTable.logAction(action)
        resolve(JSON.stringify(results))
      }
    })
  })
}

// get all consultations for a student
exports.getStudentBookings = function (studentEmail) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT c.meeting_title, c.date, c.time, c.active, u.name FROM consultations c JOIN bookings b ON c.id = b.meeting_id JOIN users u ON c.email = u.email WHERE b.student_email = ?'
    conn.execute(sql, [studentEmail], (err, results, fields) => {
      if (err) {
        reject(err)
      } else {
        console.log('Bookings retrieved from database')
        resolve(results)
      }
    })
  })
}
