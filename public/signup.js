function loadLogin() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
  
    var role;
    var radioButtons = document.getElementsByName("role");
    for (var i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i].checked) {
        role = radioButtons[i].value;
        break;
      }
    }
  }
  
  module.exports = {loadLogin}