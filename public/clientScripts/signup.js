'use strict'

function signUp () {
  const firstName = document.getElementById('firstName').value
  const lastName = document.getElementById('lastName').value
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  const confirmPassword = document.getElementById('confirmPassword').value
  const radioButtons = document.getElementsByName('role')
  let role = ''
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      role = radioButtons[i].value
      break
    }
  }
  const div = document.getElementById('div')
  const p = document.createElement('p')
  if (password !== confirmPassword) {
    const text = document.createTextNode('Passwords do not match')
    p.appendChild(text)
    div.appendChild(p)
  } else {
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
  }
  console.log(`First Name: ${firstName}, Last Name: ${lastName}, Email: ${email}, Password: ${password}, Confirm Password: ${confirmPassword}, Role: ${role}`)
}
