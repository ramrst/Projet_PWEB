import { signOut } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

import { auth } from "./backend/FirebaseAuth.js";

document.getElementById("signout").addEventListener("click", function () {
  signOut(auth)
    .then(() => {
      console.log("User signed out");
      fetch("../backend/php/destroy_session.php", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      window.location.href = "../homepage/index.html";
    })
    .catch((error) => {
      console.log(error);
    });
});

//
