'use strict'

const conn = require('../../db.js')
const logTable = require('../databaseAPI/logFunctions.js')
const bookingTable = require('../databaseAPI/bookingsFunctions.js')
const consultationTable = require('../databaseAPI/consultationFunctions.js')

// Mock the console.log function
console.log = jest.fn()

describe('Consultation Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  describe('getAllConsultations', () => {
    test('should retrieve all consultations for a lecturer', async () => {
      // Mock the execute function of the database connection
      conn.execute = jest.fn((sql, params, callback) => {
        callback(null, [{ id: 1, meeting_title: 'Consultation 1' }], null)
      })

      // Call the getAllConsultations function
      const result = await consultationTable.getAllConsultations('lecturer@example.com')

      // Assertions
      expect(conn.execute).toHaveBeenCalledTimes(1)
      expect(conn.execute).toHaveBeenCalledWith(
        'SELECT * FROM consultations WHERE email = ?',
        ['lecturer@example.com'],
        expect.any(Function)
      )
      expect(result).toEqual([{ id: 1, meeting_title: 'Consultation 1' }])
      expect(console.log).toHaveBeenCalledWith('Consultations retrieved from database')
    })

    test('should reject with an error if there is a database error', async () => {
      // Mock the execute function of the database connection to simulate an error
      conn.execute = jest.fn((sql, params, callback) => {
        callback(new Error('Database error'), null, null)
      })

      // Call the getAllConsultations function
      await expect(consultationTable.getAllConsultations('lecturer@example.com')).rejects.toThrow('Database error')

      // Assertions
      expect(conn.execute).toHaveBeenCalledTimes(1)
      expect(conn.execute).toHaveBeenCalledWith(
        'SELECT * FROM consultations WHERE email = ?',
        ['lecturer@example.com'],
        expect.any(Function)
      )
      expect(console.log).not.toHaveBeenCalled()
    })
  })

  describe('addConsultation', () => {
    test('should add a new consultation to the database', async () => {
      // Mock the execute function of the database connection
      conn.execute = jest.fn((sql, params, callback) => {
        callback(null, { insertId: 1 }, null)
      })

      // Mock the logAction function
      logTable.logAction = jest.fn()

      // Call the addConsultation function
      const consultation = {
        meeting_title: 'Consultation 1',
        email: 'lecturer@example.com',
        date: '2023-05-25',
        time: '10:00:00',
        number_of_students: 5,
        active: true,
        duration: 30
      }
      const result = await consultationTable.addConsultation(consultation)

      // Assertions
      expect(conn.execute).toHaveBeenCalledTimes(1)
      expect(conn.execute).toHaveBeenCalledWith(
        'INSERT INTO consultations (meeting_title, email, date, time, number_of_students, active, duration) VALUES (?, ?, ?, ?, ?, ?, ?)',
        ['Consultation 1', 'lecturer@example.com', '2023-05-25', '10:00:00', 5, true, 30],
        expect.any(Function)
      )
      expect(logTable.logAction).toHaveBeenCalledTimes(1)
      expect(logTable.logAction).toHaveBeenCalledWith({
        date: expect.any(String),
        time: expect.any(String),
        nature: 'New Consultation Created',
        email: 'lecturer@example.com'
      })
    })

    test('should reject with an error if there is a database error', async () => {
      // Mock the execute function of the database connection to simulate an error
      conn.execute = jest.fn((sql, params, callback) => {
        callback(new Error('Database error'), null, null)
      })

      // Mock the logAction function
      logTable.logAction = jest.fn()

      // Call the addConsultation function
      const consultation = {
        meeting_title: 'Consultation 1',
        email: 'lecturer@example.com',
        date: '2023-05-25',
        time: '10:00:00',
        number_of_students: 5,
        active: true,
        duration: 30
      }

      // Assertions
      await expect(consultationTable.addConsultation(consultation)).rejects.toThrow('Database error')
      expect(conn.execute).toHaveBeenCalledTimes(1)
      expect(conn.execute).toHaveBeenCalledWith(
        'INSERT INTO consultations (meeting_title, email, date, time, number_of_students, active, duration) VALUES (?, ?, ?, ?, ?, ?, ?)',
        ['Consultation 1', 'lecturer@example.com', '2023-05-25', '10:00:00', 5, true, 30],
        expect.any(Function)
      )
      expect(logTable.logAction).not.toHaveBeenCalled()
    })
  })

  describe('cancelConsultation', () => {
    test('should cancel a consultation and log the action', async () => {
      // Mock the execute function of the database connection
      conn.execute = jest.fn((sql, params, callback) => {
        callback(null, null, null)
      })

      // Mock the logAction function
      logTable.logAction = jest.fn()

      // Call the cancelConsultation function
      const consultationId = 1
      await consultationTable.cancelConsultation(consultationId)

      // Assertions
      expect(conn.execute).toHaveBeenCalledTimes(1)
      expect(conn.execute).toHaveBeenCalledWith(
        'UPDATE consultations SET active = 0 WHERE id = ?',
        [1],
        expect.any(Function)
      )
      expect(logTable.logAction).toHaveBeenCalledTimes(0)
    })

    test('should reject with an error if there is a database error', async () => {
      // Mock the execute function of the database connection to simulate an error
      conn.execute = jest.fn((sql, params, callback) => {
        callback(new Error('Database error'), null, null)
      })

      // Mock the logAction function
      logTable.logAction = jest.fn()

      // Call the cancelConsultation function
      const consultationId = 1

      // Assertions
      await expect(consultationTable.cancelConsultation(consultationId)).rejects.toThrow('Database error')
      expect(conn.execute).toHaveBeenCalledTimes(1)
      expect(conn.execute).toHaveBeenCalledWith(
        'UPDATE consultations SET active = 0 WHERE id = ?',
        [1],
        expect.any(Function)
      )
      expect(logTable.logAction).not.toHaveBeenCalled()
      expect(console.log).not.toHaveBeenCalled()
    })
  })

  describe('getAllPlannedConsultations', () => {
    test('should retrieve all planned consultations from the database', async () => {
      // Mock the execute function of the database connection
      conn.execute = jest.fn((sql, callback) => {
        callback(null, [{ id: 1, meeting_title: 'Consultation 1' }], null)
      })

      // Call the getAllPlannedConsultations function
      const result = await consultationTable.getAllPlannedConsultations()

      // Assertions
      expect(conn.execute).toHaveBeenCalledTimes(1)
      expect(conn.execute).toHaveBeenCalledWith(
        'SELECT * FROM consultations',
        expect.any(Function)
      )
      expect(result).toEqual([{ id: 1, meeting_title: 'Consultation 1' }])
      expect(console.log).toHaveBeenCalledWith('Consultations retrieved from database')
    })

    test('should reject with an error if there is a database error', async () => {
      // Mock the execute function of the database connection to simulate an error
      conn.execute = jest.fn((sql, callback) => {
        callback(new Error('Database error'), null, null)
      })

      // Call the getAllPlannedConsultations function
      await expect(consultationTable.getAllPlannedConsultations()).rejects.toThrow('Database error')

      // Assertions
      expect(conn.execute).toHaveBeenCalledTimes(1)
      expect(conn.execute).toHaveBeenCalledWith(
        'SELECT * FROM consultations',
        expect.any(Function)
      )
      expect(console.log).not.toHaveBeenCalled()
    })
  })

  describe('getStudentConsultations', () => {
    test('should retrieve consultations that a student can join given a chosen lecturer', async () => {
      const studentEmail = 'student@example.com'
      const lecturerEmail = 'lecturer@example.com'

      // Mock the execute function of the database connection
      conn.execute = jest.fn((sql, params, callback) => {
        callback(null, [{ id: 1, meeting_title: 'Consultation 1' }], null)
      })

      // Call the getStudentConsultations function
      const result = await consultationTable.getStudentConsultations(studentEmail, lecturerEmail)

      // Assertions
      expect(conn.execute).toHaveBeenCalledTimes(1)
      expect(conn.execute).toHaveBeenCalledWith(
        'SELECT c.* FROM consultations c LEFT JOIN (SELECT meeting_id, COUNT(*) AS bookings_count FROM bookings GROUP BY meeting_id) b ON c.id = b.meeting_id WHERE c.email = ? AND c.active = 1 AND (b.bookings_count IS NULL OR b.bookings_count < c.number_of_students) AND c.id NOT IN (SELECT meeting_id FROM bookings WHERE student_email = ?)',
        [lecturerEmail, studentEmail],
        expect.any(Function)
      )
      expect(result).toEqual([{ id: 1, meeting_title: 'Consultation 1' }])
      expect(console.log).toHaveBeenCalledWith('Consultations retrieved from database')
    })

    test('should reject with an error if there is a database error', async () => {
      const studentEmail = 'student@example.com'
      const lecturerEmail = 'lecturer@example.com'

      // Mock the execute function of the database connection to simulate an error
      conn.execute = jest.fn((sql, params, callback) => {
        callback(new Error('Database error'), null, null)
      })

      // Call the getStudentConsultations function
      await expect(consultationTable.getStudentConsultations(studentEmail, lecturerEmail)).rejects.toThrow('Database error')

      // Assertions
      expect(conn.execute).toHaveBeenCalledTimes(1)
      expect(conn.execute).toHaveBeenCalledWith(
        'SELECT c.* FROM consultations c LEFT JOIN (SELECT meeting_id, COUNT(*) AS bookings_count FROM bookings GROUP BY meeting_id) b ON c.id = b.meeting_id WHERE c.email = ? AND c.active = 1 AND (b.bookings_count IS NULL OR b.bookings_count < c.number_of_students) AND c.id NOT IN (SELECT meeting_id FROM bookings WHERE student_email = ?)',
        [lecturerEmail, studentEmail],
        expect.any(Function)
      )
      expect(console.log).not.toHaveBeenCalled()
    })
  })

  describe('Consultation Functions', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    afterAll(() => {
      jest.restoreAllMocks()
    })

    describe('getDetailedConsultation', () => {
      test('should retrieve details of all consultations given a lecturer email', async () => {
        const lecturerEmail = 'lecturer@example.com'

        // Mock the execute function of the database connection
        conn.execute = jest.fn((sql, params, callback) => {
          callback(null, [{ id: 1, meeting_title: 'Consultation 1', date: '2023-05-25', time: '09:00:00', duration: 30, active: 1, number_of_students: 3, students: 'Student 1, Student 2, Student 3' }], null)
        })

        // Call the getDetailedConsultation function
        const result = await consultationTable.getDetailedConsultation(lecturerEmail)

        // Assertions
        expect(conn.execute).toHaveBeenCalledTimes(1)
        expect(conn.execute).toHaveBeenCalledWith(
          'SELECT c.id, c.meeting_title, c.date, c.time, c.duration, c.active, c.number_of_students, GROUP_CONCAT(u.name) AS students FROM consultations c LEFT JOIN bookings b ON c.id = b.meeting_id LEFT JOIN users u ON b.student_email = u.email WHERE c.email = ? AND c.active = 1 GROUP BY c.id, c.meeting_title, c.email',
          [lecturerEmail],
          expect.any(Function)
        )
        expect(result).toEqual([{ id: 1, meeting_title: 'Consultation 1', date: '2023-05-25', time: '09:00:00', duration: 30, active: 1, number_of_students: 3, students: 'Student 1, Student 2, Student 3' }])
        expect(console.log).toHaveBeenCalledWith('Consultations retrieved from database')
      })

      test('should reject with an error if there is a database error', async () => {
        const lecturerEmail = 'lecturer@example.com'

        // Mock the execute function of the database connection to simulate an error
        conn.execute = jest.fn((sql, params, callback) => {
          callback(new Error('Database error'), null, null)
        })

        // Call the getDetailedConsultation function
        await expect(consultationTable.getDetailedConsultation(lecturerEmail)).rejects.toThrow('Database error')

        // Assertions
        expect(conn.execute).toHaveBeenCalledTimes(1)
        expect(conn.execute).toHaveBeenCalledWith(
          'SELECT c.id, c.meeting_title, c.date, c.time, c.duration, c.active, c.number_of_students, GROUP_CONCAT(u.name) AS students FROM consultations c LEFT JOIN bookings b ON c.id = b.meeting_id LEFT JOIN users u ON b.student_email = u.email WHERE c.email = ? AND c.active = 1 GROUP BY c.id, c.meeting_title, c.email',
          [lecturerEmail],
          expect.any(Function)
        )
        expect(console.log).not.toHaveBeenCalled()
      })
    })
  })
})
