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
