'use strict'

// fetch signed in lecturer's details
async function fetchLecturerDetails () {
  const url = window.location.href
  const id = url.substring(url.lastIndexOf('/') + 1)
  console.log(id)
  const response = await fetch(`/posts/${id}`)
  const user = await response.json()
  console.log(user[0])
  const greeting = document.getElementById('greeting')
  const p = document.createElement('p')
  const text = document.createTextNode(`Welcome ${user[0].Name}`)
  p.appendChild(text)
  greeting.appendChild(p)
}

fetchLecturerDetails()
