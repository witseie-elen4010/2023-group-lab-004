'use strict'

// Fetch function to get all logs from the database
async function fetchLogsAndCreateTable () {
  try {
    const response = await fetch('/log')
    const data = await response.json()

    data.forEach(obj => {
      const date = new Date(obj.date)
      const localDate = date.toISOString().slice(0, 10)
      obj.date = localDate
    })

    console.log(data)
    createTable(data)
  } catch (error) {
    console.error('Error:', error)
  }
}

// Function to create and populate the table
function createTable (data) {
  const tableContainer = document.getElementById('tableContainer')
  const table = document.createElement('table')
  table.classList.add('table', 'table-striped', 'table-bordered')
  const thead = document.createElement('thead')
  const tbody = document.createElement('tbody')

  // Create header row
  const headerRow = document.createElement('tr')
  Object.keys(data[0]).forEach(key => {
    const th = document.createElement('th')
    th.textContent = key.toUpperCase()
    headerRow.appendChild(th)
  })
  thead.appendChild(headerRow)
  table.appendChild(thead)

  // Create data rows
  data.forEach(obj => {
    const row = document.createElement('tr')
    Object.values(obj).forEach(value => {
      const cell = document.createElement('td')
      cell.textContent = value
      row.appendChild(cell)
    })
    tbody.appendChild(row)
  })
  table.appendChild(tbody)

  tableContainer.appendChild(table)
}

// Call the function to fetch logs and create the table
fetchLogsAndCreateTable()

// return to previous page
function goBack () {
  window.history.back()
}
