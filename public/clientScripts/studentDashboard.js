'use strict'

let lecturers = []

// fetch signed in student's details
async function fetchStudentDetails () {
  const url = window.location.href
  const id = url.substring(url.lastIndexOf('/') + 1)
  const response = await fetch(`/posts/${id}`)
  const user = await response.json()
  const greeting = document.getElementById('heading')
  const p = document.createElement('p')
  const text = document.createTextNode(`Welcome ${user[0].Name}`)
  p.appendChild(text)
  greeting.appendChild(p)
}

fetchStudentDetails()

// Function to populate the lecturer dropdown
async function populateLecturerDropdown () {
  // Get all lecturers from the database
  const result = await fetch('/getLecturers')
  lecturers = await result.json()

  const lecturerDropdown = document.getElementById('eventLecturer')

  // Clear existing options
  lecturerDropdown.innerHTML = ''

  // Create new options based on the array
  for (let i = 0; i < lecturers.length; i++) {
    const lecturer = `${lecturers[i].Name} ${lecturers[i].Surname}`
    const option = document.createElement('option')
    option.value = lecturer
    option.textContent = lecturer
    lecturerDropdown.appendChild(option)
  }
}

// Function to create and populate the table
async function createTable () {
  // Get lecturer name from drop down
  const lecturerDropdown = document.getElementById('eventLecturer')
  const lecturerName = lecturerDropdown.options[lecturerDropdown.selectedIndex].value

  // Get lecturer email from the array
  const lectName = lecturerName.split(' ')
  const lectSurname = lectName[1]
  const lectEmail = lecturers.find(lecturer => lecturer.Surname === lectSurname).email
  console.log(lectEmail)
  const tableBody = document.getElementById('tableBody')

  // get the student's email from the URL
  const url = window.location.href
  const studentEmail = url.substring(url.lastIndexOf('/') + 1)

  // Get the consultations that match the selected lecturer
  const result = await fetch('/getAvailableStudentConsultations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ studentEmail, lecturerEmail: lectEmail })
  })
  const consultations = await result.json()

  // Clear existing table rows
  tableBody.innerHTML = ''

  // Create new table rows
  consultations.forEach((rowObj, index) => {
    const row = document.createElement('tr')
    const properties = ['meeting_title', 'date', 'time', 'duration']
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
    // Create the "Join" button for the 4th column
    const joinButtonCell = document.createElement('td')
    const joinButton = document.createElement('button')
    joinButton.textContent = 'Join'
    joinButton.classList.add('btn', 'btn-green')
    joinButtonCell.appendChild(joinButton)
    row.appendChild(joinButtonCell)

    // Add click event listener to join button
    joinButton.addEventListener('click', (event) => {
      event.preventDefault()

      // Hide the button
      joinButton.style.display = 'none'

      // Create a new element for the "Joined" message
      const joinedMessage = document.createElement('span')
      joinedMessage.textContent = 'Joined'

      // Append the "Joined" message to the button cell
      joinButtonCell.appendChild(joinedMessage)

      // Access the parent row of the clicked button
      const parentRow = joinButton.closest('tr')

      // Extract information from the parent row
      const title = parentRow.cells[0].textContent
      const duration = parseInt(parentRow.cells[3].textContent)

      // Get the meeting ID from the consultations array using title, time and duration
      const meeting = consultations.find(consultation => consultation.meeting_title === title && consultation.duration === duration)

      // Add the booking to the database
      fetch('/addBooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ studentEmail, meetingID: meeting.id })
      })
      console.log(`${studentEmail} joining Meeting ID: ${meeting.id}`)
    })

    tableBody.appendChild(row)
  })
}

// Call the function to populate the lecturer dropdown
populateLecturerDropdown()
