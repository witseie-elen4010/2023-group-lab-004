// Global variables
let currentDate = new Date();

// Define an array of month names
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Function to generate the calendar
function generateCalendar() {
  // Get the number of days in the current month
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  // Get the first day of the month (0 - Sunday, 1 - Monday, etc.)
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  // Create the calendar
  const calendarContainer = document.createElement('div');
  calendarContainer.classList.add('container');

  // Add the month and year as the calendar header
  const calendarHeader = document.createElement('h2');
  calendarHeader.textContent = monthNames[currentDate.getMonth()] + ' ' + currentDate.getFullYear();
  calendarContainer.appendChild(calendarHeader);

  // Create a table element for the calendar
  const calendarTable = document.createElement('table');
  calendarTable.classList.add('table');

  // Create the table header with weekday names
  const tableHeader = document.createElement('thead');
  const headerRow = document.createElement('tr');
  for (let i = 0; i < 7; i++) {
    const weekdayCell = document.createElement('th');
    weekdayCell.textContent = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i];
    headerRow.appendChild(weekdayCell);
  }
  tableHeader.appendChild(headerRow);
  calendarTable.appendChild(tableHeader);

  // Create the table body with calendar days
  const tableBody = document.createElement('tbody');
  let currentRow;
  for (let day = 1; day <= daysInMonth; day++) {
    if (day === 1 || (day - 1 + firstDayOfMonth) % 7 === 0) {
      // Start a new row for the first day of the week
      currentRow = document.createElement('tr');
      tableBody.appendChild(currentRow);
    }

    const dayCell = document.createElement('td');
    dayCell.textContent = day;
    currentRow.appendChild(dayCell);
  }
  calendarTable.appendChild(tableBody);

  // Add the calendar table to the container
  calendarContainer.appendChild(calendarTable);

  // Clear the existing calendar if any
  const existingCalendar = document.querySelector('.container');
  if (existingCalendar) {
    existingCalendar.remove();
  }

  // Append the calendar container to the document body
  document.body.appendChild(calendarContainer);
}

// Initial calendar generation
generateCalendar();

// Function to navigate to the previous month
function prevMonth() {
  currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  generateCalendar();
}

// Function to navigate to the next month
function nextMonth() {
  currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  generateCalendar();
}
