// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
// ... rest of your code
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQLHCJViDtag-uASpfkaCmOYHZ9-OHRL8",
  authDomain: "rideshare-409117.firebaseapp.com",
  projectId: "rideshare-409117",
  storageBucket: "rideshare-409117.appspot.com",
  messagingSenderId: "598026404144",
  appId: "1:598026404144:web:cc8713f7697d9fbf0008f5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
