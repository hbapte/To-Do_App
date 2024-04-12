
// LOGIN FORM
document.getElementById('LoginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    var emailUsername = document.getElementById('email-username').value.trim();
    var password = document.getElementById('password').value.trim();
    var emailUsernameError = document.getElementById('email-usernameError');
    var passwordError = document.getElementById('password-Error');
    var rememberMeCheckbox = document.getElementById('remember-me');
    var valid = true;

    // Reset previous error messages
    emailUsernameError.textContent = '';
    passwordError.textContent = '';

        // Validate email/username only if it's not empty
        if (emailUsername === '') {
            emailUsernameError.textContent = 'Email is required';
            valid = false;
          }
      
          // Validate password only if it's not empty
          if (password === '') {
            passwordError.textContent = 'Password is required';
            valid = false;
          }
      
          // If both fields are not empty, perform further validation
          if (emailUsername !== '' && password !== '') {
            // Validate username format
            if (!/^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailUsername)) {
              emailUsernameError.textContent = 'Invalid email';
              valid = false;
            }
      
           
            if (password.length < 6) {
              passwordError.textContent = 'Password should be at least 6 characters long';
              valid = false;
            }
        }



    if (!valid) {
      return;
    }

    // local storage
    var registrationData = JSON.parse(localStorage.getItem('registrationData'));
    if (!registrationData) {
      document.getElementById('LoginSent').textContent = 'Please create an account first';
      return;
    }

    // Check if the provided email/username and password match any stored registration data
    var user = registrationData.find(function(userData) {
      return (userData.email === emailUsername || userData.username === emailUsername) && userData.password === password;
    });

    if (user) {
        // If user is found, display a success message
        var LoginMessage = document.getElementById('LoginSent');
        LoginMessage.textContent = 'Login successfully!';
        LoginMessage.style.color = 'green';
        // document.getElementById('LoginSent').classList.remove('erro-message');
    
        // let loginData = [{   
        //     userEmail: emailUsername,
        //     userPassword: password,
        //     rememberMe: rememberMeCheckbox.checked,
        // }];
        
        // console.log("Login Data:", loginData);
    
        // Set a timeout to remove the success message after 5 seconds
        setTimeout(function() {
            document.getElementById('LoginSent').textContent = '';
        }, 5000); // 5 seconds
    } else {
        // If user is not found or password is incorrect, display an error message
        var errorMessageElement = document.getElementById('LoginSent');
        errorMessageElement.textContent = 'incorrect Email or password';
        errorMessageElement.style.color = 'red';
        errorMessageElement.style.textAlign= 'center'; // Set text color to red
        // errorMessageElement.classList.add('erro-message');
      
        // Set a timeout to remove the error message after 3.5 seconds
        setTimeout(function() {
            errorMessageElement.textContent = '';
            // errorMessageElement.classList.remove('erro-message');
        }, 3500); 
    }
    
      

    // Implement Remember Me
if(rememberMeCheckbox.checked) {
var rememberedEmailUsernames = JSON.parse(localStorage.getItem('rememberedEmailUsernames') || '[]');
if (!rememberedEmailUsernames.includes(emailUsername)) {
    rememberedEmailUsernames.push(emailUsername);
    localStorage.setItem('rememberedEmailUsernames', JSON.stringify(rememberedEmailUsernames));
}}


    
});


// Keyup event listener for live validation
document.getElementById('email-username').addEventListener('keyup', function() {
    var emailUsername = this.value.trim();
    var emailUsernameError = document.getElementById('email-usernameError');

    emailUsernameError.textContent = '';

    // Validate email/username if it's not empty
    if (emailUsername === '') {
      emailUsernameError.textContent = 'Email is required';
    }

    if (!/^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailUsername)) {
        emailUsernameError.textContent = 'Invalid email';
        valid = false;
      }

});




  // Keyup event listener for live validation
  document.getElementById('password').addEventListener('keyup', function() {
    var password = this.value.trim();
    var passwordError = document.getElementById('password-Error');

    passwordError.textContent = '';

    // Validate password if it's not empty
    if (password !== '') {
      // Validate password strength (for example, at least 6 characters)
      if (password.length < 6) {
        passwordError.textContent = 'Password should be at least 6 characters long';
      }
    }
  })