'use strict';

const conn = require('../../db.js');
const logTable = require('../databaseAPI/logFunctions.js');
const bookingTable = require('../databaseAPI/bookingsFunctions.js');
const consultationTable = require('../databaseAPI/consultationFunctions.js');

// Mock the console.log function
console.log = jest.fn();

describe('Consultation Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('getAllConsultations', () => {
    test('should retrieve all consultations for a lecturer', async () => {
      // Mock the execute function of the database connection
      conn.execute = jest.fn((sql, params, callback) => {
        callback(null, [{ id: 1, meeting_title: 'Consultation 1' }], null);
      });

      // Call the getAllConsultations function
      const result = await consultationTable.getAllConsultations('lecturer@example.com');

      // Assertions
      expect(conn.execute).toHaveBeenCalledTimes(1);
      expect(conn.execute).toHaveBeenCalledWith(
        'SELECT * FROM consultations WHERE email = ?',
        ['lecturer@example.com'],
        expect.any(Function)
      );
      expect(result).toEqual([{ id: 1, meeting_title: 'Consultation 1' }]);
      expect(console.log).toHaveBeenCalledWith('Consultations retrieved from database');
    });

    test('should reject with an error if there is a database error', async () => {
      // Mock the execute function of the database connection to simulate an error
      conn.execute = jest.fn((sql, params, callback) => {
        callback(new Error('Database error'), null, null);
      });

      // Call the getAllConsultations function
      await expect(consultationTable.getAllConsultations('lecturer@example.com')).rejects.toThrow('Database error');

      // Assertions
      expect(conn.execute).toHaveBeenCalledTimes(1);
      expect(conn.execute).toHaveBeenCalledWith(
        'SELECT * FROM consultations WHERE email = ?',
        ['lecturer@example.com'],
        expect.any(Function)
      );
      expect(console.log).not.toHaveBeenCalled();
    });
  });

  describe('addConsultation', () => {
    test('should add a new consultation to the database', async () => {
      // Mock the execute function of the database connection
      conn.execute = jest.fn((sql, params, callback) => {
        callback(null, { insertId: 1 }, null);
      });

      // Mock the logAction function
      logTable.logAction = jest.fn();

      // Call the addConsultation function
      const consultation = {
        meeting_title: 'Consultation 1',
        email: 'lecturer@example.com',
        date: '2023-05-25',
        time: '10:00:00',
        number_of_students: 5,
        active: true,
        duration: 30,
      };
      const result = await consultationTable.addConsultation(consultation);

      // Assertions
      expect(conn.execute).toHaveBeenCalledTimes(1);
      expect(conn.execute).toHaveBeenCalledWith(
        'INSERT INTO consultations (meeting_title, email, date, time, number_of_students, active, duration) VALUES (?, ?, ?, ?, ?, ?, ?)',
        ['Consultation 1', 'lecturer@example.com', '2023-05-25', '10:00:00', 5, true, 30],
        expect.any(Function)
      );
      expect(logTable.logAction).toHaveBeenCalledTimes(1);
      expect(logTable.logAction).toHaveBeenCalledWith({
        date: expect.any(String),
        time: expect.any(String),
        nature: 'New Consultation Created',
        email: 'lecturer@example.com'
      });
    });

    test('should reject with an error if there is a database error', async () => {
      // Mock the execute function of the database connection to simulate an error
      conn.execute = jest.fn((sql, params, callback) => {
        callback(new Error('Database error'), null, null);
      });

      // Mock the logAction function
      logTable.logAction = jest.fn();

      // Call the addConsultation function
      const consultation = {
        meeting_title: 'Consultation 1',
        email: 'lecturer@example.com',
        date: '2023-05-25',
        time: '10:00:00',
        number_of_students: 5,
        active: true,
        duration: 30,
      };

      // Assertions
      await expect(consultationTable.addConsultation(consultation)).rejects.toThrow('Database error');
      expect(conn.execute).toHaveBeenCalledTimes(1);
      expect(conn.execute).toHaveBeenCalledWith(
        'INSERT INTO consultations (meeting_title, email, date, time, number_of_students, active, duration) VALUES (?, ?, ?, ?, ?, ?, ?)',
        ['Consultation 1', 'lecturer@example.com', '2023-05-25', '10:00:00', 5, true, 30],
        expect.any(Function)
      );
      expect(logTable.logAction).not.toHaveBeenCalled();
    });
  });
});
