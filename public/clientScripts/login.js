'use strict'

async function checkLogin () {
  // extract the user's email and password from the form
  const userEmail = document.getElementById('email').value
  const userPassword = document.getElementById('pwd').value
  const div = document.getElementById('div')

  fetch('/checkLogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: userEmail,
      password: userPassword
    })
  })
    .then(response => response.json())
    .then(data => {
    // Handle the response data
      console.log(data)
      if (data.isValid === true) {
        if (data.role === 'lecturer') {
          window.location.href = `/lecturerdashboard/${data.email}`
        } else {
          window.location.href = `/studentdashboard/${data.email}`
        }
      } else {
        const p = document.createElement('p')
        const text = document.createTextNode('Invalid email or password')
        p.appendChild(text)
        div.appendChild(p)
      }
    })
    .catch(error => {
    // Handle any errors
      console.error(error)
    })
}

function loadSignUp () {
  window.location.href = '/signup'
}
