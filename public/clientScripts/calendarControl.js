'use strict'

// Get current date
let currentDate = new Date()

// Initialize month and year variables
let currentMonth = currentDate.getMonth()
let currentYear = currentDate.getFullYear()

// Month names array
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// Function to generate the calendar
async function generateCalendar (month, year) {
  // get the event data
  const events = await generateUserData()
  console.log(events)

  // Clear the calendar body
  const calendarBody = document.getElementById('calendarBody')
  calendarBody.innerHTML = ''

  // Set the current month heading
  const currentMonthHeading = document.getElementById('currentMonth')
  currentMonthHeading.textContent = monthNames[month] + ' ' + year

  // Get the first day of the month
  const firstDay = new Date(year, month, 1)
  const startingDay = firstDay.getDay()

  // Get the number of days in the month
  const lastDay = new Date(year, month + 1, 0)
  const totalDays = lastDay.getDate()

  // Generate the calendar rows and cells
  let date = 1
  for (let row = 0; row < 6; row++) {
    const calendarRow = document.createElement('tr')

    // Create cells for each day of the week
    for (let col = 0; col < 7; col++) {
      if (row === 0 && col < startingDay) {
        // Create empty cells before the first day of the month
        const emptyCell = document.createElement('td')
        calendarRow.appendChild(emptyCell)
      } else if (date > totalDays) {
        // Break if all days of the month have been generated
        break
      } else {
        // Create cells for each day of the month
        const calendarCell = document.createElement('td')
        calendarCell.textContent = date

        //Highlight today's cell
        const isToday = date === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()
        if (isToday){
          calendarCell.classList.add('today')
        }
        // Check if there are events for the current date
        const eventsForDate = events.filter(function (event) {
          return new Date(event.date).getDate() === date && new Date(event.date).getMonth() === month && new Date(event.date).getFullYear() === year
        })

        // Create an unordered list to hold the events
        const eventList = document.createElement('ul')
        eventList.classList.add('list-unstyled')
        eventsForDate.forEach(function (event) {
          const eventItem = document.createElement('li')
          eventItem.textContent = event.title
          eventItem.classList.add('smaller-text')
          eventList.appendChild(eventItem)
        })

        // Append the event list to the calendar cell
        calendarCell.appendChild(eventList)

        calendarRow.appendChild(calendarCell)
        date++
      }
    }

    calendarBody.appendChild(calendarRow)
  }
}

// fetch signed in lecturer's details
async function fetchUserDetails () {
  const url = window.location.href
  const id = url.substring(url.lastIndexOf('/') + 1)
  const response = await fetch(`/posts/${id}`)
  const user = await response.json()
  console.log(`${user[0].Name} fetched from database`)
  return user[0]
}

// Load event details based on the currently signed-in user
async function generateUserData () {
  const user = await fetchUserDetails()
  if (user.role === 'lecturer') {
    const response = await fetch('/getConsultations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: user.email })
    })
    const consultations = await response.json()
    console.log(`${consultations.length} consultations fetched from database`)
    const events = []
    for (let i = 0; i < consultations.length; i++) {
      // convert date to correct format
      const date = consultations[i].date
      const year = date.substring(0, 4)
      const month = date.substring(5, 7)
      const day = date.substring(8, 10)
      // create title
      const title = `${consultations[i].meeting_title} @ ${consultations[i].time.substring(0, 5)}, ${consultations[i].duration} mins`
      const event = {
        date: `${year}-${month}-${day}`,
        title
      }
      events.push(event)
    }
    return events
  }
  if (user.role === 'student') {
    const response = await fetch('/getStudentBookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ studentEmail: user.email })
    })
    const bookings = await response.json()
    console.log(`${bookings.length} bookings fetched from database`)
    const events = []
    for (let i = 0; i < bookings.length; i++) {
      // convert date to correct format
      const date = bookings[i].date
      const year = date.substring(0, 4)
      const month = date.substring(5, 7)
      const day = date.substring(8, 10)
      // create title
      const title = `${bookings[i].meeting_title} with ${bookings[i].name} @ ${bookings[i].time.substring(0, 5)}`
      const event = {
        date: `${year}-${month}-${day}`,
        title
      }
      events.push(event)
    }
    return events
  }
}

// Generate the initial calendar
generateCalendar(currentMonth, currentYear)

// Event listener for previous month button
const prevMonthBtn = document.getElementById('prevMonthBtn')
prevMonthBtn.addEventListener('click', function () {
  currentMonth--
  if (currentMonth < 0) {
    currentMonth = 11
    currentYear--
  }
  generateCalendar(currentMonth, currentYear)
})

// Event listener for next month button
const nextMonthBtn = document.getElementById('nextMonthBtn')
nextMonthBtn.addEventListener('click', function () {
  currentMonth++
  if (currentMonth > 11) {
    currentMonth = 0
    currentYear++
  }
  generateCalendar(currentMonth, currentYear)
})

// Event listener for today button
const todayBtn = document.getElementById('todayBtn')
todayBtn.addEventListener('click', function () {
  currentDate = new Date()

  // Get the month and year of the current date
  const currentMonth = currentDate.getMonth()
  currentYear = currentDate.getFullYear()

  // Update the calendar to the current month and year
  generateCalendar(currentMonth, currentYear)
})

function loadLogPage () {
  window.location.href = '/viewlogs'
}

// function to move to the joinConsultation page
function joinConsultation () {
  window.location.href = '/joinConsultation'
}
