  // ========= VALIDATIONS
  // Live Validations
  
  document.getElementById('email').addEventListener('keyup', function() {
    validateField(this);
  });
  
  document.getElementById('username').addEventListener('keyup', function() {
    validateField(this);
  });
  
  
  
  function validateForm(event) {
      event.preventDefault(); 

      var email = document.getElementById('email').value.trim();
      var username = document.getElementById('username').value.trim();

      var emailError = document.getElementById('emailError');
      var usernameError = document.getElementById('usernameError');
   
      var valid = true;
    
      // Reset previous error messages
         emailError.textContent = '';
         usernameError.textContent = '';
    
    
 
      // Validate email
      if (email === '') {
        emailError.textContent = 'Email is required';
        valid = false;
      } else if (!validateEmail(email)) {
        emailError.textContent = 'Invalid email';
        valid = false;
      }
    
      // Validate username
      if (username === '') {
        usernameError.textContent = 'Username is required';
        valid = false;
      } else if (!/^[a-zA-Z][a-zA-Z0-9_]{2,}$/.test(username)) {
        usernameError.textContent = 'Username should be at least 3 characters long';
        valid = false;
      }
    
      if (valid) {        

        showSuccessMessage();
        clearForm();; 
    }
    
    
    
      return valid; 
  }
  
  function validateField(inputField) {
      var fieldName = inputField.name;
      var fieldValue = inputField.value.trim();
      var errorElement = document.getElementById(fieldName + 'Error');
      errorElement.textContent = ''; 
      switch (fieldName) {
          case 'email':
          if (fieldValue === '') {
              errorElement.textContent = 'Email is required';
          } else if (!validateEmail(fieldValue)) {
              errorElement.textContent = 'Invalid email';
          }
          break;         
          case 'username':
          if (fieldValue === '') {
              errorElement.textContent = 'Username is required';
          } else if (!/^[a-zA-Z][a-zA-Z0-9_]{2,}$/.test(fieldValue)) {
              errorElement.textContent = 'Username should be at least 3 characters long ';
          }          
          break;
          
  }
  
  function validateEmail(email) {
      var re = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return re.test(email);
  }
  
  
  
  function showSuccessMessage() {
      var successMessage = document.getElementById('resetSent');
      successMessage.textContent = 'Email sent successful!';
      setTimeout(function() {
          successMessage.textContent = '';
      }, 3500); 
  }
  
  function clearForm() {
      document.getElementById('email').value = '';
      document.getElementById('username').value = '';

  }

}
  