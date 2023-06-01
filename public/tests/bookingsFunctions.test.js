'use strict'

const conn = require('../../db.js')
const logTable = require('../databaseAPI/logFunctions.js')
const bookingTable = require('../databaseAPI/bookingsFunctions.js')

// Mock the console.log function
console.log = jest.fn()

describe('Booking Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  describe('addBooking', () => {
    test('should add a new booking to the database and log the action', async () => {
      // Mock the execute function of the database connection
      conn.execute = jest.fn((sql, params, callback) => {
        callback(null, { insertId: 1 }, null)
      })

      // Mock the logAction function
      logTable.logAction = jest.fn()

      // Call the addBooking function
      const studentEmail = 'student@example.com'
      const meetingID = 1
      const result = await bookingTable.addBooking(studentEmail, meetingID)

      // Assertions
      expect(conn.execute).toHaveBeenCalledTimes(1)
      expect(conn.execute).toHaveBeenCalledWith(
        'INSERT INTO bookings (student_email, meeting_id) VALUES (?, ?)',
        ['student@example.com', 1],
        expect.any(Function)
      )
      expect(logTable.logAction).toHaveBeenCalledTimes(1)
      expect(logTable.logAction).toHaveBeenCalledWith({
        date: expect.any(String),
        time: expect.any(String),
        nature: 'Consultation Joined',
        email: 'student@example.com'
      })
      expect(console.log).toHaveBeenCalledWith('Booking added to database')
      expect(result).toBe(JSON.stringify({ insertId: 1 }))
    })

    test('should reject with an error if there is a database error', async () => {
      // Mock the execute function of the database connection to simulate an error
      conn.execute = jest.fn((sql, params, callback) => {
        callback(new Error('Database error'), null, null)
      })

      // Mock the logAction function
      logTable.logAction = jest.fn()

      // Call the addBooking function
      const studentEmail = 'student@example.com'
      const meetingID = 1

      // Assertions
      await expect(bookingTable.addBooking(studentEmail, meetingID)).rejects.toThrow('Database error')
      expect(conn.execute).toHaveBeenCalledTimes(1)
      expect(conn.execute).toHaveBeenCalledWith(
        'INSERT INTO bookings (student_email, meeting_id) VALUES (?, ?)',
        ['student@example.com', 1],
        expect.any(Function)
      )
      expect(logTable.logAction).not.toHaveBeenCalled()
      expect(console.log).not.toHaveBeenCalled()
    })
  })

  describe('getStudentBookings', () => {
    test('should retrieve all bookings for a student from the database', async () => {
      // Mock the execute function of the database connection
      conn.execute = jest.fn((sql, params, callback) => {
        callback(null, [{ meeting_title: 'Consultation 1', date: '2023-05-25', time: '10:00:00', active: true, name: 'John Doe' }], null)
      })

      // Call the getStudentBookings function
      const studentEmail = 'student@example.com'
      const result = await bookingTable.getStudentBookings(studentEmail)

      // Assertions
      expect(conn.execute).toHaveBeenCalledTimes(1)
      expect(conn.execute).toHaveBeenCalledWith(
        'SELECT c.meeting_title, c.date, c.time, c.active, u.name FROM consultations c JOIN bookings b ON c.id = b.meeting_id JOIN users u ON c.email = u.email WHERE b.student_email = ?',
        ['student@example.com'],
        expect.any(Function)
      )
      expect(console.log).toHaveBeenCalledWith('Bookings retrieved from database')
      expect(result).toEqual([{ meeting_title: 'Consultation 1', date: '2023-05-25', time: '10:00:00', active: true, name: 'John Doe' }])
    })

    test('should reject with an error if there is a database error', async () => {
      // Mock the execute function of the database connection to simulate an error
      conn.execute = jest.fn((sql, params, callback) => {
        callback(new Error('Database error'), null, null)
      })

      // Call the getStudentBookings function
      const studentEmail = 'student@example.com'

      // Assertions
      await expect(bookingTable.getStudentBookings(studentEmail)).rejects.toThrow('Database error')
      expect(conn.execute).toHaveBeenCalledTimes(1)
      expect(conn.execute).toHaveBeenCalledWith(
        'SELECT c.meeting_title, c.date, c.time, c.active, u.name FROM consultations c JOIN bookings b ON c.id = b.meeting_id JOIN users u ON c.email = u.email WHERE b.student_email = ?',
        ['student@example.com'],
        expect.any(Function)
      )
      expect(console.log).not.toHaveBeenCalled()
    })
  })
})
