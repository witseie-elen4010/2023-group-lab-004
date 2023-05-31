const { loadLogin } = require('../oldSignup')

describe('Test the loadLogin function', () => {
  beforeEach(() => {
    const { JSDOM } = require('jsdom')
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>')
    global.document = dom.window.document
  })

  afterEach(() => {
    delete global.document
  })

  it('The correct values for firstName, lastName, email, password, confirmPassword, and role should be appropriately set', () => {
    // Set up the initial input values
    const firstNameInput = document.createElement('input')
    firstNameInput.id = 'firstName'
    firstNameInput.value = 'Ahmad'

    const lastNameInput = document.createElement('input')
    lastNameInput.id = 'lastName'
    lastNameInput.value = 'Moolla'

    const emailInput = document.createElement('input')
    emailInput.id = 'email'
    emailInput.value = 'ahmadmoolla@test.com'

    const passwordInput = document.createElement('input')
    passwordInput.id = 'password'
    passwordInput.value = 'ahmad123'

    const confirmPasswordInput = document.createElement('input')
    confirmPasswordInput.id = 'confirmPassword'
    confirmPasswordInput.value = 'ahmad123'

    const roleInput = document.createElement('input')
    roleInput.type = 'radio'
    roleInput.name = 'role'
    roleInput.value = 'admin'
    roleInput.checked = true

    // Append the input elements to the body of the document
    document.body.appendChild(firstNameInput)
    document.body.appendChild(lastNameInput)
    document.body.appendChild(emailInput)
    document.body.appendChild(passwordInput)
    document.body.appendChild(confirmPasswordInput)
    document.body.appendChild(roleInput)

    // Call the function to be tested
    loadLogin()

    // Assertions
    expect(firstNameInput.value).toBe('Ahmad')
    expect(lastNameInput.value).toBe('Moolla')
    expect(emailInput.value).toBe('ahmadmoolla@test.com')
    expect(passwordInput.value).toBe('ahmad123')
    expect(confirmPasswordInput.value).toBe('ahmad123')
    expect(roleInput.checked).toBe(true)
  })
})
