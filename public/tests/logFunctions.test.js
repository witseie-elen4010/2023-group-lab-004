const db = require('../../db.js')
const { logAction, getAllLogs } = require('../databaseAPI/logFunctions.js')

// Mock the database connection
jest.mock('../../db.js', () => ({
  execute: jest.fn()
}))

describe('logAction', () => {
  it('Function should log an action to the database', () => {
    const action = {
      date: '2023-05-25',
      time: '10:30:00',
      nature: 'Test',
      email: 'test@test.com'
    };

    // Call the logAction function
    logAction(action)

    // Verify that the database connection was called with the correct parameters
    expect(db.execute).toHaveBeenCalledWith(
      'INSERT INTO log (date, time, nature, email) VALUES (?, ?, ?, ?)',
      ['2023-05-25', '10:30:00', 'Test', 'test@test.com'],
      expect.any(Function)
    )
  })
})

describe('getAllLogs', () => {
  it('Function should retrieve all logs from the database', async () => {
    const expectedResults = [{ id: 1, date: '2023-05-25', time: '10:30:00', nature: 'Test', email: 'test@test.com' }]

    // Mock the results of the database query
    db.execute.mockImplementation((sql, callback) => {
      callback(null, expectedResults, null)
    })

    // Call the getAllLogs function
    const results = await getAllLogs()

    // Verify that the database connection was called with the correct query
    expect(db.execute).toHaveBeenCalledWith('SELECT * FROM log', expect.any(Function))

    // Verify that the function returned the expected results
    expect(results).toEqual(expectedResults)
  })

  it('should reject with an error if the database query fails', async () => {
    const expectedError = new Error('Database error')

    // Mock the error from the database query
    db.execute.mockImplementation((sql, callback) => {
      callback(expectedError, null, null)
    })

    // Call the getAllLogs function
    await expect(getAllLogs()).rejects.toThrow(expectedError)

    // Verify that the database connection was called with the correct query
    expect(db.execute).toHaveBeenCalledWith('SELECT * FROM log', expect.any(Function))
  })
})
