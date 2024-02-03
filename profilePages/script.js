import {
  getDatabase,
  ref,
  remove,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
document.addEventListener("DOMContentLoaded", function () {
  function getFileNameFromPath(path) {
    return path.split("/").pop();
  }

  // Check if the current file name is "mes_reservations.html"
  const currentFileName = getFileNameFromPath(window.location.pathname);
  console.log("currentFileName", currentFileName);
  get_sessionData()
    .then(({ success, data }) => {
      console.log("data promise ", data.nom);
      document.getElementById(
        "userInfo"
      ).innerHTML = ` <p> ${data.nom} ${data.prenom} </p> <p id ="arrow" > > </p>`;
      document.getElementById(
        "userAvatar"
      ).innerHTML = `<img src="https://eu.ui-avatars.com/api/?name=${data.nom}+${data.prenom}&background=fff&color=ccc&rounded=true&size=128" alt="avatar" class="avatar">`;
      document.getElementById("connexionbutton").style.display = "none";
      if (currentFileName == "MesReservation.html") {
        console.log("mes reservations");
        getReservation();
      } else {
        console.log("not mes reservations");
        get_rides();
      }
    })

    .catch((error) => {
      console.log("error promise ", error);
    });
});
let reservations = [];
function get_sessionData() {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../backend/php/get_sessionData.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // Handle the response from the server if needed
        console.log("response promise ", xhr.responseText);
        const data = JSON.parse(xhr.responseText);

        if (data.success === true) {
          resolve(data);
        } else {
          reject(data);
        }
      }
    };
  });
}
document.getElementById("user").addEventListener("click", function () {
  console.log("clicked");
  document.getElementById("drop_down").classList.toggle("drop_menu");
  document.getElementById("arrow").classList.toggle("arrow_up");
});

// get rides and display them in the table

function get_rides() {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../backend/php/getUser_Rides_reservations.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        //  Handle the response from the server if needed

        const data = JSON.parse(xhr.responseText);

        if (data.trajet.success === true) {
          display_rides(data.trajet.trajet);
        }
      }
    };
  });
}
function getReservation() {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../backend/php/getUser_Rides_reservations.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        //  Handle the response from the server if needed

        const data = JSON.parse(xhr.responseText);

        if (data.reservation.success === true) {
          reservations = data.reservation.reservation;
          console.log("reservations", reservations);
          displayTripCards(reservations);
        } else {
          console.log("no reservations");
        }
      }
    };
  });
}
// Function to create and display cards for each trip
function displayTripCards(tripsData) {
  const container = document.getElementById("tripCardsContainer");

  tripsData.forEach((trip) => {
    console.log("trip", trip);
    const card = document.createElement("div");
    card.classList.add("trip-card");
    card.id = trip.code_trajet; // Set card id to code_trajet

    card.innerHTML = `
      
      <div class="trip-info">
        <p>Departure: ${trip.lieu_depart}</p>
        <p>Destination: ${trip.destination}</p>
        <p>Date Reservation: ${trip.date_reservation}</p>
        <p>place reserve : ${trip.nbr_place}</p>
        <p>Total Price: ${trip.prix}</p>

      </div>
      <div class="driver-info">
        <p>Driver: ${trip.nom} ${trip.prenom}</p>
        <p>Tel: ${trip.tel}</p>
        ${trip.status ? `<p>status : ${trip.status}</p>` : "accepted"}
      </div>
    `;
    // if the trip is not accepted and the date_depart > current date and current time > heure_depart don't display the cancell button else display it
    if (trip.status != "declined") {
      const current_date = new Date().toISOString().split("T")[0];
      const current_time = new Date().toISOString().split("T")[1].split(":");

      if (
        current_date < trip.date_depart ||
        (current_date == trip.date_depart &&
          current_time[0] < trip.heure_depart[0] &&
          current_time[1] < trip.heure_depart[1])
      ) {
        console.log("cancell button");
        card.innerHTML += `<button id="annuler_reservation" >Anuller </button>`;
      }
    }
    card.querySelector("#annuler_reservation").addEventListener("click", () => {
      annuler_reservation(trip);
    });

    container.appendChild(card);
  });
}
// Example usage:
// !only if the reservaion page is called

export function addReservation(data) {
  const container = document.getElementById("tripCardsContainer");
  console.log("data", data);
  const card = document.createElement("div");
  card.classList.add("trip-card");
  card.id = data.code_trajet; // Set card id to code_trajet

  card.innerHTML = `

    <div class="trip-info">
      <p>Departure: ${data.lieu_depart}</p>
      <p>Destination: ${data.destination}</p>
      <p>Date Reservation: ${data.date_reservation}</p>
      <p>place reserve : ${data.places_reserver}</p>
      <p>Total Price: ${data.prix}</p>
    </div>
    <div class="driver-info">
      <p>Driver: ${data.nom} ${data.prenom}</p>
      <p>Tel: ${data.tel}</p>
      ${data.status ? `<p>status : ${data.status}</p>` : "accepted"}
    </div>
    <button id="cancel_reservation" >Anuller </button>
  `;
  card.querySelector("#cancel_reservation").addEventListener("click", () => {
    cancelReservation(data);
  });

  // Add click event listener to each card

  container.appendChild(card);
}

function display_rides(trajet) {
  console.log(trajet);
  const table_body = document.getElementById("table-body");
  table_body.innerHTML = trajet
    .map((trajet) => {
      return `<tr class="md-table-content-row">
    <td id='code_trajet'>${trajet.code_trajet}</td>
    <td>${trajet.lieu_depart}</td>
    <td>${trajet.destination}</td>
    <td>${trajet.date_depart}</td>
    <td>${trajet.places_libre}</td>
    <td>${trajet.total_reserved_places}</td>
    <td>${trajet.prix} DA </td>
    <td>${
      parseFloat(trajet.total_reserved_places) * parseFloat(trajet.prix)
    } DA </td>
   
    </tr>`;
    })
    .join("");
}
function cancelReservation(data) {
  // delete  the reservation from the frebase real time data base
  const db = getDatabase();
  const notificationRef = ref(db, "notifications/" + data.code_notification);
  remove(notificationRef).then(() => {
    console.log("removed");
    const card = document.getElementById(data.code_trajet);
    card.remove();
  });
  // remove the reservation from the page
}
function annuler_reservation(trip) {
  console.log("annuler reservation", trip);
  var XHR = new XMLHttpRequest();
  var urlEncodedData = "code_trajet=" + encodeURIComponent(trip.code_trajet);
  XHR.addEventListener("load", function (event) {
    console.log("done");
    const card = document.getElementById(trip.code_trajet);
    card.remove();
  });
  XHR.addEventListener("error", function (event) {
    console.log("error");
  });
  XHR.open("POST", "../backend/php/annuler_reservation.php");
  XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  XHR.send(urlEncodedData);
}
