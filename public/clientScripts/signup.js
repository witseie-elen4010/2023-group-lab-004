'use strict'

async function signUp () {
  const firstName = document.getElementById('firstName').value
  const lastName = document.getElementById('lastName').value
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  const confirmPassword = document.getElementById('confirmPassword').value
  const radioButtons = document.getElementsByName('role')
  let role = ''

  // Check that the user has entered all the required fields
  if (
    firstName.trim() === '' ||
    lastName.trim() === '' ||
    email.trim() === '' ||
    password.trim() === '' ||
    confirmPassword.trim() === ''
  ) {
    alert('Please fill in all the required fields.')
    return
  }

  // Check that the user has entered matching passwords
  if (password !== confirmPassword) {
    alert('Passwords do not match.')
    return
  }

  // check that the entered email is unique
  let isEmailUnique = true
  const result = await fetch('/getEmails')
  const existingEmails = await result.json()
  console.log(existingEmails)
  for (let i = 0; i < existingEmails.length; i++) {
    if (email === existingEmails[i].email) {
      isEmailUnique = false
      break
    }
  }

  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      role = radioButtons[i].value
      break
    }
  }
  const div = document.getElementById('div')
  const p = document.createElement('p')
  console.log(isEmailUnique)
  if (password !== confirmPassword) {
    const errorMessage = document.createTextNode('Passwords do not match')
    p.appendChild(errorMessage)
    div.appendChild(p)
  } else if (isEmailUnique) {
    fetch('/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: firstName,
        surname: lastName,
        email,
        password,
        role
      })
    })
      .then(response => response.text())
      .then(data => {
        console.log(`Success: ${data}`)
      }
      )
      .catch((error) => {
        console.error('Error:', error)
      }
      )
    // hide sign up button
    const signUpButton = document.getElementById('signUpButton')
    signUpButton.style.display = 'none'
    // create success message
    const successMessage = document.createTextNode(`${firstName} ${lastName} has been registered successfully`)
    p.appendChild(successMessage)
    div.appendChild(p)
    // create button to redirect to login page
    const button = document.createElement('button')
    button.classList.add('btn', 'btn-purple')
    const text = document.createTextNode('Return to login')
    button.appendChild(text)
    div.appendChild(button)
    button.addEventListener('click', () => {
      window.location.href = '/login'
    })
  } else {
    alert('Email already exists for a user, try logging in')
    // hide sign up button
    const signUpButton = document.getElementById('signUpButton')
    signUpButton.style.display = 'none'
    // create success message
    const successMessage = document.createTextNode(`${email} already exists`)
    p.appendChild(successMessage)
    div.appendChild(p)
    // create button to redirect to login page
    const button = document.createElement('button')
    button.classList.add('btn', 'btn-purple')
    const text = document.createTextNode('Return to login')
    button.appendChild(text)
    div.appendChild(button)
    button.addEventListener('click', () => {
      window.location.href = '/login'
    })
  }
  console.log(`First Name: ${firstName}, Last Name: ${lastName}, Email: ${email}, Password: ${password}, Confirm Password: ${confirmPassword}, Role: ${role}`)
}
