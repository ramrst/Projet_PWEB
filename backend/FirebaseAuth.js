// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQLHCJViDtag-uASpfkaCmOYHZ9-OHRL8",
  authDomain: "rideshare-409117.firebaseapp.com",
  databaseURL:
    "https://rideshare-409117-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rideshare-409117",
  storageBucket: "rideshare-409117.appspot.com",
  messagingSenderId: "598026404144",
  appId: "1:598026404144:web:cc8713f7697d9fbf0008f5",
};

// Initialize Firebase

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
