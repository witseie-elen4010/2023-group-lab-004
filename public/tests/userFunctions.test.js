'use strict';

const conn = require('../../db.js');
const logTable = require('../databaseAPI/logFunctions.js');
const bcrypt = require('bcrypt');
const {
  createUser,
  getAllUsers,
  getUser,
  validateUser,
  deleteUser
} = require('../databaseAPI/userFunctions.js');

// Mock the logAction function
jest.mock('../databaseAPI/logFunctions.js', () => ({
  logAction: jest.fn()
}));

// Mock the bcrypt functions
jest.mock('bcrypt', () => ({
  genSaltSync: jest.fn().mockReturnValue('mockedSalt'),
  hashSync: jest.fn().mockReturnValue('mockedHash'),
  compareSync: jest.fn().mockReturnValue(true)
}));

// Mock the database connection
jest.mock('../../db.js', () => ({
  execute: jest.fn()
}));

describe('User Functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('createUser adds a user to the database', async () => {
    // Test data
    const user = {
      email: 'test@example.com',
      name: 'John',
      surname: 'Doe',
      password: 'password',
      role: 'user'
    };

    // Mock the database execute function
    conn.execute.mockImplementation((sql, params, callback) => {
      // Simulate a successful database query
      callback(null, 'mockedResults', 'mockedFields');
    });

    // Call the createUser function
    const result = await createUser(user);

    // Assertions
    expect(conn.execute).toHaveBeenCalledTimes(1);
    expect(conn.execute).toHaveBeenCalledWith(
      'INSERT INTO users (email, name, surname, password, role) VALUES (?, ?, ?, ?, ?)',
      ['test@example.com', 'John', 'Doe', 'mockedHash', 'user'],
      expect.any(Function)
    );
    expect(logTable.logAction).toHaveBeenCalledTimes(1);
    expect(logTable.logAction).toHaveBeenCalledWith({
      date: expect.any(String),
      time: expect.any(String),
      nature: 'New User Created',
      email: 'test@example.com'
    });
    expect(result).toBe(JSON.stringify('mockedResults'));
  });

  test('getAllUsers retrieves all users from the database', async () => {
    // Mock the database execute function
    conn.execute.mockImplementation((sql, callback) => {
      // Simulate a successful database query
      callback(null, 'mockedResults', 'mockedFields');
    });

    // Call the getAllUsers function
    const result = await getAllUsers();

    // Assertions
    expect(conn.execute).toHaveBeenCalledTimes(1);
    expect(conn.execute).toHaveBeenCalledWith(
      'SELECT * FROM users',
      expect.any(Function)
    );
    expect(result).toBe('mockedResults');
  });

  test('getUser retrieves a user from the database', async () => {
    // Mock the database execute function
    conn.execute.mockImplementation((sql, params, callback) => {
      // Simulate a successful database query
      callback(null, 'mockedResults', 'mockedFields');
    });

    // Call the getUser function
    const result = await getUser('test@example.com');

    // Assertions
    expect(conn.execute).toHaveBeenCalledTimes(1);
    expect(conn.execute).toHaveBeenCalledWith(
      'SELECT * FROM users WHERE email = ?',
      ['test@example.com'],
      expect.any(Function)
    );
    expect(result).toBe(JSON.stringify('mockedResults'));
  });

  test('validateUser validates a user\'s password', async () => {
    // Mock the database execute function
    conn.execute.mockImplementation((sql, params, callback) => {
      if (sql.includes('SELECT * FROM users')) {
        // Simulate a successful database query
        callback(null, [{ email: 'test@example.com', role: 'user' }], 'mockedFields');
      } else {
        // Simulate a successful database query
        callback(null, [{ password: 'mockedHash' }], 'mockedFields');
      }
    });

    // Call the validateUser function
    const result = await validateUser('test@example.com', 'password');

    // Assertions
    expect(conn.execute).toHaveBeenCalledTimes(2);
    expect(conn.execute).toHaveBeenCalledWith(
      'SELECT * FROM users WHERE email = ?',
      ['test@example.com'],
      expect.any(Function)
    );
    expect(conn.execute).toHaveBeenCalledWith(
      'SELECT password FROM users WHERE email = ?',
      ['test@example.com'],
      expect.any(Function)
    );
    expect(bcrypt.compareSync).toHaveBeenCalledTimes(1);
    expect(bcrypt.compareSync).toHaveBeenCalledWith('password', 'mockedHash');
    expect(logTable.logAction).toHaveBeenCalledTimes(1);
    expect(logTable.logAction).toHaveBeenCalledWith({
      date: expect.any(String),
      time: expect.any(String),
      nature: 'User Signed In',
      email: 'test@example.com'
    });
    expect(result).toEqual({
      isValid: true,
      email: 'test@example.com',
      role: 'user',
    });
  });

  test('deleteUser deletes a user from the database', () => {
    // Mock the database execute function
    conn.execute.mockImplementation((sql, params, callback) => {
      // Simulate a successful database query
      callback(null, 'mockedResults', 'mockedFields');
    });

    // Call the deleteUser function
    deleteUser('test@example.com');

    // Assertions
    expect(conn.execute).toHaveBeenCalledTimes(1);
    expect(conn.execute).toHaveBeenCalledWith(
      'DELETE FROM users WHERE email = ?',
      ['test@example.com'],
      expect.any(Function)
    );
  });
});
