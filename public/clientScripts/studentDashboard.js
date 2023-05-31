'use strict'

// fetch signed in student's details
async function fetchStudentDetails () {
  const url = window.location.href
  const id = url.substring(url.lastIndexOf('/') + 1)
  console.log(id)
  const response = await fetch(`/posts/${id}`)
  const user = await response.json()
  console.log(user[0])
  const greeting = document.getElementById('heading')
  const p = document.createElement('p')
  const text = document.createTextNode(`Welcome ${user[0].Name}`)
  p.appendChild(text)
  greeting.appendChild(p)
}

fetchStudentDetails()

// test lecturers
const lecturers = [
  'S. Levitt',
  'AK Mohamed',
  'T. Celik'
]

// Sample data array
const data = [
  { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
  { column1: 'Value 4', column2: 'Value 5', column3: 'Value 6' }
]
// Function to populate the lecturer dropdown
function populateLecturerDropdown () {
  const lecturerDropdown = document.getElementById('eventLecturer')

  // Clear existing options
  lecturerDropdown.innerHTML = ''

  // Create new options based on the array
  for (let i = 0; i < lecturers.length; i++) {
    const lecturer = lecturers[i]
    const option = document.createElement('option')
    option.value = lecturer
    option.textContent = lecturer
    lecturerDropdown.appendChild(option)
  }
}

// Function to create and populate the table
function createTable () {
  const tableBody = document.getElementById('tableBody')

  // Clear existing table rows
  tableBody.innerHTML = ''

  // Create new table rows
  data.forEach((rowObj, index) => {
    const row = document.createElement('tr')
    Object.values(rowObj).forEach(value => {
      const cell = document.createElement('td')
      cell.textContent = value
      row.appendChild(cell)
    })

    // Create the "Join" button for the 4th column
    const joinButtonCell = document.createElement('td')
    const joinButton = document.createElement('button')
    joinButton.textContent = 'Join'
    joinButton.classList.add('btn', 'btn-green')
    joinButtonCell.appendChild(joinButton)
    row.appendChild(joinButtonCell)

    // Add click event listener to highlight selected row
    row.addEventListener('click', () => {
      const selectedRows = document.querySelectorAll('.selected-row')
      selectedRows.forEach(row => row.classList.remove('selected-row'))
      row.classList.add('selected-row')
    })

    tableBody.appendChild(row)
  })
}

// Call the function to create the table with the sample data
// createTable(dataArray);

// Call the function to populate the lecturer dropdown
populateLecturerDropdown()
