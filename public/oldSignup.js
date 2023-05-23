function loadLogin () {
  const firstName = document.getElementById('firstName').value
  const lastName = document.getElementById('lastName').value
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  const confirmPassword = document.getElementById('confirmPassword').value

  let role
  const radioButtons = document.getElementsByName('role')
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      role = radioButtons[i].value
      break
    }
  }
}

module.exports = { loadLogin }
