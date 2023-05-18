'use strict'

document.getElementById('exampleModal').addEventListener('show.bs.modal', function () {
  const saveButton = this.querySelector('.modal-footer .btn-primary')
  saveButton.addEventListener('click', function () {
    const selectedDate = document.getElementById('dateInput').value
    filterConsultationSlots(selectedDate)
  })
})

function filterConsultationSlots (date) {
  const slots = document.getElementById('consultationSlots').querySelectorAll('tr')
  for (let i = 0; i < slots.length; i++) {
    const slotDate = slots[i].querySelector('td:first-child').innerText
    if (slotDate !== date) {
      slots[i].style.display = 'none'
    } else {
      slots[i].style.display = 'table-row'
    }
  }
}

module.exports = {filterConsultationSlots}
