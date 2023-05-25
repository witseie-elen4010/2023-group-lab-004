// Get current date
const currentDate = new Date()

// Initialize month and year variables
let currentMonth = currentDate.getMonth()
let currentYear = currentDate.getFullYear()

// Month names array
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// Event data (example)
const events = [
  { date: '2023-05-02', title: 'Meeting 1' },
  { date: '2023-05-05', title: 'Event 1' },
  { date: '2023-05-05', title: 'Event 2' },
  { date: '2023-05-12', title: 'Meeting 2' },
  { date: '2023-05-20', title: 'Event 3' }
]

//function to move to the joinConsultation page 
function joinConsultation() { 
  window.location.href = '/joinConsultation'
}


// Function to generate the calendar
function generateCalendar (month, year) {
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