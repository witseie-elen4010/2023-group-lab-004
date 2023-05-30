'use strict'

// fetch signed in lecturer's details
async function fetchLecturerDetails () {
  const url = window.location.href
  const id = url.substring(url.lastIndexOf('/') + 1)
  const response = await fetch(`/posts/${id}`)
  const user = await response.json()
  console.log(`${user[0].Name} fetched from database`)
  return user[0]
}

async function displayGreeting () {
  const lecturer = await fetchLecturerDetails()
  const h = document.getElementById("heading")
  h.innerHTML = `Lecturer Dashboard - ${lecturer.Name}`
}

async function addConsultation () {
  // get data from form
  const lecturer = await fetchLecturerDetails()
  const eventTitle = document.getElementById('eventTitle').value
  const eventDate = document.getElementById('eventDate').value
  const eventTime = document.getElementById('eventTime').value
  const eventDuration = document.getElementById('eventDuration').value
  const maxStudents = document.getElementById('maxStudents').value
  const active = 1
  // construct JSON object
  const consultation = {
    meeting_title: eventTitle,
    email: lecturer.email,
    date: eventDate,
    time: eventTime,
    number_of_students: maxStudents,
    active,
    duration: eventDuration
  }
  // add consultation to database
  fetch('/addConsultation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(consultation)
  })
    .then(response => response.text())
    .then(data => {
      console.log('Consultation added successfully')
      // hide submit button
      const submitButton = document.getElementById('btnAdd')
      submitButton.style.display = 'none'
      // display success message
      const modalBtnDiv = document.getElementById('modalBtnDiv')
      const successMessage = document.createElement('p')
      successMessage.setAttribute('class', 'text-success')
      successMessage.innerHTML = 'Consultation added successfully'
      modalBtnDiv.appendChild(successMessage)
    }
    )
    .catch((error) => {
      console.error('Error:', error)
    }
    )
}

displayGreeting()
