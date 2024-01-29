import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
import { auth } from "../backend/FirebaseAuth.js";

const registerForm = document.querySelector("#register-form");
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("registerForm.addEventListener");

  const email = document.querySelector("#register_email").value;
  const password = document.querySelector("#register_password").value;
  const nom = document.querySelector("#Nom").value;
  const prenom = document.querySelector("#Prenom").value;
  const telephone = document.querySelector("#Num_tel").value;
  const matricule = document.querySelector("#Matricule").value;
  const confirm_password = document.querySelector("#ConfirmPassword").value;
  const Data = {
    nom: nom,
    prenom: prenom,
    telephone: telephone,
    matricule: matricule,
    email: email,
    password: password,
    confirm_password: confirm_password, // Corrected key
  };
  console.log(Data);
  e.preventDefault();
  sendDataToServer(Data);

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      sendEmailToServer(email);
      // go to index.html
      window.location.href = "../homepage/index.html";
    })
    .catch((error) => {
      console.log(error);
    });
});
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  console.log("loginForm.addEventListener");
  e.preventDefault();
  const email = document.querySelector("#login_email").value;
  const password = document.querySelector("#login_password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User logged in");
      console.log(userCredential);
      //send a post request to user.php with email

      try {
        sendEmailToServer(email);
        window.location.href = "../homepage/index.html";
      } catch (error) {
        console.log(error);
      }
      // go to index.html
    })
    .catch((error) => {
      console.log(error);
    });
});
function sendEmailToServer(email) {
  // Create a new XMLHttpRequest object
  let xhr = new XMLHttpRequest();

  // Configure it to send a POST request to User.php
  xhr.open("POST", "../backend/php/User.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  // Define the data to be sent in the POST request
  let postData = "email=" + encodeURIComponent(email);

  // Set up a callback function to handle the response
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Handle the response from the server if needed
      console.log(xhr.responseText);
    }
  };

  // Send the POST request with the data
  xhr.send(postData);
  return false;
}
function sendDataToServer(Data) {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Configure it to send a POST request to User.php
  xhr.open("POST", "../backend/php/config.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  // Define the data to be sent in the POST request
  var postData =
    "nom=" +
    encodeURIComponent(Data.nom) +
    "&prenom=" +
    encodeURIComponent(Data.prenom) +
    "&telephone=" +
    encodeURIComponent(Data.telephone) +
    "&matricule=" +
    encodeURIComponent(Data.matricule) +
    "&email=" +
    encodeURIComponent(Data.email) +
    "&password=" +
    encodeURIComponent(Data.password) +
    "&confirm_password=" +
    encodeURIComponent(Data.confirm_password);
  // Set up a callback function to handle the response
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Handle the response from the server if needed
      console.log(xhr.responseText);
    }
  };
  // send the POST request with the data
  xhr.send(postData);
  return false;
}
