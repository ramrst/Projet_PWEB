import {
  getDatabase,
  ref,
  set,
  push,
  child,
  query,
  equalTo,
  get,
  orderByChild,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";

var tripDetails = JSON.parse(sessionStorage.getItem("tripDetails"));
console.log(tripDetails);
document.getElementById("tripId").innerHTML = tripDetails.code_trajet;
document.getElementById("departure").innerHTML = `
        ${
          tripDetails.lieu_depart
        }  <span id="AT">AT</span> <span id="tripTime"> ${tripDetails.heure_depart.substring(
  0,
  5
)} </span>
      `;
document.getElementById("destination").innerHTML = tripDetails.destination;
document.getElementById("prix").innerHTML = tripDetails.prix + " DA";

document.getElementById("tripDate").innerHTML = getDate(
  tripDetails.date_depart
);
document.getElementById("prix_total").innerHTML =
  tripDetails.prix * document.getElementById("passagers_number").value + " DA";
document
  .getElementById("passagers_number")
  .addEventListener("change", function () {
    document.getElementById("prix_total").innerHTML =
      tripDetails.prix * document.getElementById("passagers_number").value +
      " DA";
  });
document.getElementById("driver").innerHTML =
  tripDetails.nom + " " + tripDetails.prenom;

console.log(tripDetails.heure_depart);

function getDate(date) {
  const dateObj = new Date(date);

  const d = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  let day = dateObj.getDay();
  const m = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  switch (day) {
    case 0:
      day = "Dimanche";
      break;

    case 1:
      day = "Lundi";
      break;

    case 2:
      day = "Mardi";
      break;

    case 3:
      day = "Mercredi";
      break;

    case 4:
      day = "Jeudi";
      break;
    case 5:
      day = "Vendredi";
      break;
    case 6:
      day = "Samedi";
      break;
  }

  return `${day} ${d} , ${m[month - 1]} ${year}`;
}

document
  .getElementById("reservationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    //   makeReservation(rideId, numberOfSeats);
    makeReservation();
  });
//   function makeReservation(rideId, numberOfSeats) {
//     // Appeler la fonction pour effectuer une requête AJAX
//     // var xhr = new XMLHttpRequest();
//     // xhr.open("POST", "makeReservation.php", true);
//     // xhr.setRequestHeader(
//     //   "Content-Type",
//     //   "application/x-www-form-urlencoded"
//     // );
//     // // only date is needed for the reservation date (not time)

//     // const currentDate = new Date().toISOString().slice(0, 10);
//     // var postData =
//     //   "code_trajet=" +
//     //   encodeURIComponent(rideId) +
//     //   "&nombre_places=" +
//     //   encodeURIComponent(numberOfSeats) +
//     //   "&date_reservation=" +
//     //   encodeURIComponent(currentDate);
//     // xhr.onreadystatechange = function () {
//     //   if (xhr.readyState == 4 && xhr.status == 200) {
//     //     // Handle the response from the server if needed
//     //     console.log(xhr.responseText);
//     //   }
//     // };
//     // xhr.onreadystatechange = function () {
//     //   if (xhr.readyState == 4 && xhr.status == 200) {
//     //     // Handle the response from the server if needed
//     //     console.log(xhr.responseText);
//     //   }
//     // };

//     // xhr.send(postData);
//     // return false;

//   }
function makeReservation() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const NumberOfSeats = document.getElementById("passagers_number").value;
  var database = getDatabase();

  // Define the query to check for existing notifications
  const existingNotificationQuery = query(
    ref(database, "notifications/"),
    orderByChild("sender/id"),
    equalTo(user.id)
  );

  // Execute the query
  get(existingNotificationQuery)
    .then((snapshot) => {
      // Check if there are any existing notifications
      var exist = false;
      if (snapshot.exists()) {
        // Loop through each existing notification
        snapshot.forEach((childSnapshot) => {
          const notification = childSnapshot.val();

          // Check if the sender ID matches the current user ID
          if (
            notification.sender.id === user.id &&
            notification.rideDetails.id === tripDetails.code_trajet
          ) {
            // alert that the user already has a notification for this ride
            alert(
              "You already have a notification for this ride. Please check your notifications."
            );
            // Stop the function from proceeding
            exist = true;
            window.location.href = "./ridespage.html";
            return;
          }
        });
      }

      if (exist == false) {
        console.log("reservation submitted");
        // push notification to database if there are no existing notifications
        const notificationData = {
          targetedUser: tripDetails.createur,
          sender: {
            id: user.id,
            firstName: user.nom,
            lastName: user.prenom,
            phone: user.tel,
          },
          rideDetails: {
            id: tripDetails.code_trajet,
            departure: tripDetails.lieu_depart,
            destination: tripDetails.destination,
            date: tripDetails.date_depart,
            time: tripDetails.heure_depart,
            seats: NumberOfSeats,
          },
          reservationDate: new Date().toISOString().slice(0, 16),
          status: "pending",
        };

        // Push the new notification to the database
        push(ref(database, "notifications"), notificationData)
          .then(() => {
            console.log("Notification successfully sent.");
            alert("Votre demande de réservation a été envoyée avec succès");
            window.location.href = "./ridespage.html";
          })
          .catch((error) => {
            console.error("Error pushing notification:", error);
            alert(
              "An error occurred while sending the reservation notification."
            );
          });
      }

      // Proceed with the rest of the reservation logic
      // ...
    })
    .catch((error) => {
      console.error("Error checking existing notifications:", error);
      alert("An error occurred while checking existing notifications.");
    });
}
