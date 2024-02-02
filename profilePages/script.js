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
    const card = document.createElement("div");
    card.classList.add("trip-card");
    card.id = trip.code_trajet; // Set card id to code_trajet

    card.innerHTML = `
      
      <div class="trip-info">
        <p>Departure: ${trip.lieu_depart}</p>
        <p>Destination: ${trip.destination}</p>
        <p>Date Reservation: ${trip.date_reservation}</p>
        <p>Total Price: ${trip.prix}</p>
      </div>
      <div class="driver-info">
        <p>Driver: ${trip.nom} ${trip.prenom}</p>
        <p>Tel: ${trip.tel}</p>
      </div>
    `;

    // Add click event listener to each card
    card.addEventListener("click", () => {
      // Handle card click event here, for example:
      console.log("Card clicked: ", trip.code_trajet);
    });

    container.appendChild(card);
  });
}

// Example usage:

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
