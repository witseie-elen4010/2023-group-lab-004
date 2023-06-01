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
  const greeting = document.getElementById('heading')
  const p = document.createElement('p')
  const text = document.createTextNode(`Welcome ${lecturer.Name}`)
  p.appendChild(text)
  greeting.appendChild(p)
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

function loadConsultView () {
  const url = window.location.href
  const id = url.substring(url.lastIndexOf('/') + 1)
  window.location.href = `/myConsultations/${id}`
}

displayGreeting()

// Sample data array
const data = [
  { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
  { column1: 'Value 4', column2: 'Value 5', column3: 'Value 6' }
]

// Function to create and populate the table
async function createTable () {
  // get consultation data from database
  const url = window.location.href
  const lecturerEmail = url.substring(url.lastIndexOf('/') + 1)
  const result = await fetch('/getDetailedConsultation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ lecturerEmail })
  })
  const consultations = await result.json()
  console.log(consultations)

  const tableBody = document.getElementById('tableBody')

  // Clear existing table rows
  tableBody.innerHTML = ''

  // Create new table rows
  consultations.forEach((rowObj, index) => {
    const row = document.createElement('tr')
    const properties = ['id', 'meeting_title', 'date', 'time', 'duration', 'number_of_students', 'students']
    properties.forEach(property => {
      const cell = document.createElement('td')
      if (property === 'date') {
        const date = new Date(rowObj[property])
        const formattedDate = date.toISOString().split('T')[0]
        cell.textContent = formattedDate
      } else {
        cell.textContent = rowObj[property]
      }
      row.appendChild(cell)
    })

    // Create the "cancel" button for the 4th column
    const cancelButtonCell = document.createElement('td')
    const cancelButton = document.createElement('button')
    cancelButton.textContent = 'Cancel'
    cancelButton.classList.add('btn', 'btn-red')
    cancelButtonCell.appendChild(cancelButton)
    row.appendChild(cancelButtonCell)

    cancelButton.addEventListener('click', (event) => {
      event.preventDefault()

      // Hide the button
      cancelButton.style.display = 'none'

      // Create a new element for the "cancelled" message
      const cancelledMessage = document.createElement('span')
      cancelledMessage.textContent = 'Cancelled'

      // Append the "cancelled" message to the button cell
      cancelButtonCell.appendChild(cancelledMessage)

      // Access the parent row of the clicked button
      const parentRow = cancelButton.closest('tr')

      // get the consultation id
      const consultationId = parentRow.firstChild.textContent

      // set the consultation to inactive
      fetch('/cancelConsultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: consultationId })
      })
    })

    tableBody.appendChild(row)
  })
}

document.getElementById('refreshButton1').addEventListener('click', function() {
  // Reload the page
  location.reload();

})

document.getElementById('refreshButton2').addEventListener('click', function() {
  // Reload the page
  location.reload();

})

createTable()
