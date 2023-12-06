document.addEventListener('DOMContentLoaded', function () {

  function handleLogin() {

      var usernameInput = document.getElementById('username');
      var passwordInput = document.getElementById('password');

      var username = usernameInput.value;
      var password = passwordInput.value;

      if (username && password) {

          window.location.href = 'index.html';
      } else {
          alert('Por favor, digite algo.');
      }
  }

  var loginButton = document.getElementById('btn-sign-up');
  if (loginButton) {
      loginButton.addEventListener('click', handleLogin);
  }

});