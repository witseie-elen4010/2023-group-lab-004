// Import the functions to be tested
const {
  loadConsult,
  loadDashboard,
  loadSignUp,
  loadLogin
} = require('./pathLoader')

describe('Test loadConsult', () => {
  it('should navigate to "/createconsulation"', () => {
    const mockLocation = {
      href: ''
    }
    global.window = {
      location: mockLocation
    }

    loadConsult()

    expect(mockLocation.href).toBe('/createconsulation')
  })
})

describe('Test loadDashboard', () => {
  it('should navigate to "/dashboard"', () => {
    const mockLocation = {
      href: ''
    }
    global.window = {
      location: mockLocation
    }

    loadDashboard()

    expect(mockLocation.href).toBe('/dashboard')
  })
})

describe('Test loadSignUp', () => {
  it('should navigate to "/signup"', () => {
    const mockLocation = {
      href: ''
    }
    global.window = {
      location: mockLocation
    }

    loadSignUp()

    expect(mockLocation.href).toBe('/signup')
  })
})

describe('Test loadLogin', () => {
  it('should navigate to "/login"', () => {
    const mockLocation = {
      href: ''
    }
    global.window = {
      location: mockLocation
    }

    loadLogin()

    expect(mockLocation.href).toBe('/login')
  })
})
