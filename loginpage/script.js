const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});
//vérifier matricule:
function validateMatricule() {
  var matricule = document.getElementById('Matricule').value;
  var matriculeError = document.getElementById('matriculeError');

  // Clear any previous error message
  matriculeError.textContent = '';

  // Proceed with validation only if the field is not empty
  if (matricule) {
      if (matricule.length !== 12) {
          matriculeError.textContent = 'Le matricule doit être constitué de 12 chiffres.';
      }
  }
}
//vérifier email:
function validateEmail() {
  var emailField = document.getElementById("register_email");
  var emailError = document.getElementById("email_Error");

  // Clear any previous error message
  emailError.innerHTML = "";

  // Proceed with validation only if the field is not empty
  if (emailField.value) {
      if (!emailField.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
          emailError.innerHTML = "Veuillez entrer une adresse e-mail valide";
          return false;
      }
  }
  return true;
}
//vérifer le mot de passe:
function validatePasswordMatch() {
  var motDePasse = document.getElementById('register_password').value;
  var verifMotDePasse = document.getElementById('ConfirmPassword').value;
  var verifMotDePasseError = document.getElementById('verifMotDePasseError');

  // Clear any previous error message
  verifMotDePasseError.innerHTML = '';

  // Proceed with validation only if the confirmation field is not empty
  if (verifMotDePasse) {
      if (motDePasse !== verifMotDePasse) {
          verifMotDePasseError.innerHTML = 'Les mots de passe ne correspondent pas.';
          return false;
      }
  }
  return true;
}
//vérifier le num de télépohone:
function validatePhoneNumber() {
  var phoneInput = document.getElementById('Num_tel');
  var phoneError = document.getElementById('phoneError');
  var phoneValue = phoneInput.value;

  // Clear any previous error message
  phoneError.textContent = '';

  // Proceed with validation only if the field is not empty
  if (phoneValue) {
      // Check if the input length is 10 and if it starts with 06, 05, or 07
      if (phoneValue.length < 10 || !/^(06|05|07)\d{8}$/.test(phoneValue)) {
          phoneError.textContent = "Le numéro de téléphone est incorrect.";
      }
  }
}
//vérifier le button d'inscription:
document.getElementById('register-form').addEventListener('input', function() {
  var nom = document.getElementById('Nom').value;
  var prenom = document.getElementById('Prenom').value;
  var numTel = document.getElementById('Num_tel').value;
  var matricule = document.getElementById('Matricule').value;
  var email = document.getElementById('register_email').value;
  var password = document.getElementById('register_password').value;
  var confirmPassword = document.getElementById('ConfirmPassword').value;

  var allFilled = nom && prenom && numTel && matricule && email && password && confirmPassword;

  document.getElementById('submitBtn').disabled = !allFilled;
});
//password visibility eyeicon for register_password:
function togglePasswordVisibilityv1() {
  var passwordInput = document.getElementById('register_password');
  var eyeIcon = document.getElementById('eyeicon1');

  // Check if the password is visible
  if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      eyeIcon.src = '../icons/eyeOpen.png'; // Path to your eyeOpen icon
  } else {
      passwordInput.type = 'password';
      eyeIcon.src = '../icons/eyeClose.png'; // Path to your eyeClose icon
  }
}
//password visibility for eyeicon for login_password:
function togglePasswordVisibilityv2() {
  var passwordInput = document.getElementById('login_password');
  var eyeIcon = document.getElementById('eyeicon2');

  // Check if the password is visible
  if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      eyeIcon.src = '../icons/eyeOpen.png'; // Path to your eyeOpen icon
  } else {
      passwordInput.type = 'password';
      eyeIcon.src = '../icons/eyeClose.png'; // Path to your eyeClose icon
  }
}