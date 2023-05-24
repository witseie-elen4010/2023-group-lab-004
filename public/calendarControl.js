    // Get current date
    var currentDate = new Date();

    // Initialize month and year variables
    var currentMonth = currentDate.getMonth();
    var currentYear = currentDate.getFullYear();

    // Month names array
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Event data (example)
    var events = [
      { date: '2023-05-02', title: 'Meeting 1' },
      { date: '2023-05-05', title: 'Event 1' },
      { date: '2023-05-05', title: 'Event 2' },
      { date: '2023-05-12', title: 'Meeting 2' },
      { date: '2023-05-20', title: 'Event 3' },
    ];

    // Function to generate the calendar
    function generateCalendar(month, year) {
      // Clear the calendar body
      var calendarBody = document.getElementById('calendarBody');
      calendarBody.innerHTML = '';

      // Set the current month heading
      var currentMonthHeading = document.getElementById('currentMonth');
      currentMonthHeading.textContent = monthNames[month] + ' ' + year;

      // Get the first day of the month
      var firstDay = new Date(year, month, 1);
      var startingDay = firstDay.getDay();

      // Get the number of days in the month
      var lastDay = new Date(year, month + 1, 0);
      var totalDays = lastDay.getDate();

      // Generate the calendar rows and cells
      var date = 1;
      for (var row = 0; row < 6; row++) {
        var calendarRow = document.createElement('tr');

        // Create cells for each day of the week
        for (var col = 0; col < 7; col++) {
          if (row === 0 && col < startingDay) {
            // Create empty cells before the first day of the month
            var emptyCell = document.createElement('td');
            calendarRow.appendChild(emptyCell);
          } else if (date > totalDays) {
            // Break if all days of the month have been generated
            break;
          } else {
            // Create cells for each day of the month
            var calendarCell = document.createElement('td');
            calendarCell.textContent = date;

            // Check if there are events for the current date
            var eventsForDate = events.filter(function(event) {
              return new Date(event.date).getDate() === date && new Date(event.date).getMonth() === month && new Date(event.date).getFullYear() === year;
            });

            // Create an unordered list to hold the events
            var eventList = document.createElement('ul');
            eventList.classList.add('list-unstyled');
            eventsForDate.forEach(function(event) {
              var eventItem = document.createElement('li');
              eventItem.textContent = event.title;
              eventList.appendChild(eventItem);
            });

            // Append the event list to the calendar cell
            calendarCell.appendChild(eventList);

            calendarRow.appendChild(calendarCell);
            date++;
          }
        }

        calendarBody.appendChild(calendarRow);
      }
    }

    // Generate the initial calendar
    generateCalendar(currentMonth, currentYear);

    // Event listener for previous month button
    var prevMonthBtn = document.getElementById('prevMonthBtn');
    prevMonthBtn.addEventListener('click', function() {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      generateCalendar(currentMonth, currentYear);
    });

    // Event listener for next month button
    var nextMonthBtn = document.getElementById('nextMonthBtn');
    nextMonthBtn.addEventListener('click', function() {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      generateCalendar(currentMonth, currentYear);
    });
 