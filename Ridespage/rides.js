// Définir une constante pour l'intervalle de rafraîchissement
const REFRESH_INTERVAL = 10000; // 5 secondes
function navigateToAnotherPage() {
  // Change "targetPage.html" to the actual HTML page you want to navigate to
  window.location.href = "../loginpage/loginpage.html";
}

// Fonction pour effectuer une requête AJAX
function makeRequest(method, url) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.send();

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          try {
            const data = JSON.parse(xhr.responseText);
            console.log("data ", data);
            if (data.error) {
              reject(data);
            } else {
              resolve(data);
            }
          } catch (error) {
            reject(error);
          }
        } else {
          reject(new Error(`Erreur HTTP ! Statut : ${xhr.status}`));
        }
      }
    };

    xhr.onerror = function () {
      reject(new Error("Erreur réseau"));
    };
  });
}

// Fonction pour afficher les données sous forme de carte
function displayDataItem(item) {
  return `
  <div class="card" onclick="showTripDetails(${JSON.stringify(item).replace(
    /"/g,
    "&quot;"
  )})" >
    <div class="card-body">
      <div class="dep-arr">
        <div class="card-text-element">
          
          <h5 class="card-title">Départ : ${item.lieu_depart}</h5>
        </div>
        <div class="card-text-element">
          <h6 class="card-subtitle mb-2 text-muted">Destination : ${
            item.destination
          }</h6>
        </div>
        <p  class="card-text" >
          Date et heure de départ : ${getDate(item.date_depart)}
  / ${item.heure_depart}
        </p>
      </div>
      <div class="card-text-places">
      
        <p class="card-text">Prix : <span 
        class="price"
        >${item.prix} DA</span></p>
        <p class="card-text">Sièges disponibles : ${item.places_libre}</p>
      </div>
     
    </div>
    </div>`;
}

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

  return `${day} ${d} ${m[month - 1]} ${year}`;
}

// Fonction pour afficher les données dans la page HTML
async function displayData(data) {
  const Rides = await sortRides(data);
  console.log("rides soretd rides ", Rides);
  const rides = Rides.map(displayDataItem).join("");
  document.getElementById("result").innerHTML = rides;

  // Ajouter un écouteur d'événements aux boutons de réservation
}

// Fonction pour gérer la réservation

// Fonction pour récupérer les données et mettre à jour l'interface utilisateur
// use sesion storage to get search terms and handle all senarios (no search terms, some search terms, all search terms)

function fetchDataAndUpdateUI() {
  const Filters = JSON.parse(sessionStorage.getItem("filters"));
  const searchTerm = JSON.parse(sessionStorage.getItem("searchTerms"));
  console.log("searchTerm ", searchTerm);
  // get search terms from session storage
  makeRequest("GET", "../backend/php/getRides.php")
    .then(async (data) => {
      if (data.success === true) {
        let Rides = data.data;
        // if there are search terms apply them
        if (searchTerm) {
          console.log("searchTerm ", searchTerm);
          Rides = filterData(Rides, searchTerm);
        }
        // apply filters  if there are filters
        if (Filters) {
          Rides = await applyFilters(data.data, Filters);
          console.log("rides filtered ", Rides);
        }
        if (Rides.length != 0) {
          await displayData(Rides).then(() => {
            // refresh data every 5 seconds
          });
        } else {
          document.getElementById("result").innerHTML = "Aucun trajet trouvé";
        }
      } else {
        document.getElementById("result").innerHTML =
          data.message || "Aucun trajet trouvé";
      }
    })
    .catch((error) => {
      console.error("Erreur :", error);
      document.getElementById("result").innerHTML =
        error.message || "Vous n'êtes pas connecté !";
    });
}
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("user").addEventListener("click", function () {
    document.getElementById("drop_down").classList.toggle("drop_menu");
    document.getElementById("arrow").classList.toggle("arrow_up");
  });
  fetchDataAndUpdateUI();
});

function showTripDetails(item) {
  sessionStorage.setItem("tripDetails", JSON.stringify(item));
  window.location.href = "trip_details.html";
}
// Call the function to begin fetching data and updating the UI

// Fonction to filter data based on search terms
function filterData(data, searchTerm) {
  console.log("searchTerm ", searchTerm);
  const { departureInput, arrivalInput, date_depart, nbre_passager } =
    searchTerm;
  // convert search term to lowercase
  const departureInputLower = departureInput.toLowerCase();
  const arrivalInputLower = arrivalInput.toLowerCase();
  const date_departLower = date_depart;

  // filter data
  return data.filter((ride) => {
    // Convert ride properties to lowercase for case-insensitive comparison
    const lowerDepartureLocation = ride.lieu_depart.toLowerCase();
    const lowerArrivalLocation = ride.destination.toLowerCase();
    const lowerDate = ride.date_depart;
    const lowerAvailablePlaces = ride.places_libre;
    console.log("lowerDate ", lowerDate);
    console.log("lowerDate ", date_departLower);
    console.log("lowerAvailablePlaces ", lowerAvailablePlaces);
    console.log("nbre_passager ", nbre_passager);
    console.log(
      "lowerDepartureLocation.includes(departureInputLower) ",
      lowerDepartureLocation.includes(departureInputLower)
    );
    console.log("lowerDepartureLocation ", lowerDepartureLocation);
    console.log(
      "lowerArrivalLocation.includes(arrivalInputLower) ",
      lowerArrivalLocation.includes(arrivalInputLower)
    );
    console.log("lowerArrivalLocation ", lowerArrivalLocation);
    // check if ride matches search term (departure location, arrival location, date, available places)
    return (
      lowerDepartureLocation.includes(departureInputLower) &&
      lowerArrivalLocation.includes(arrivalInputLower) &&
      lowerDate == date_departLower &&
      lowerAvailablePlaces >= nbre_passager
    );
  });
}

// clear search terms from session storage when user navigates away from page
window.addEventListener("beforeunload", () => {
  sessionStorage.removeItem("searchTerms");
  sessionStorage.removeItem("filters");
});

document.addEventListener("DOMContentLoaded", function () {
  get_sessionData()
    .then(({ success, data }) => {
      console.log("data promise ", data);

      document.getElementById(
        "userInfo"
      ).innerHTML = ` <p> ${data.nom} ${data.prenom} </p> <p id ="arrow" > > </p>`;
      document.getElementById(
        "userAvatar"
      ).innerHTML = `<img src="https://eu.ui-avatars.com/api/?name=${data.nom}+${data.prenom}&background=fff&color=ccc&rounded=true&size=128" alt="avatar" class="avatar">`;
      document.getElementById("connexionbutton").style.display = "none";
    })
    .catch((error) => {
      console.log("error promise ", error);
      document
        .getElementById("connexionbutton")
        .addEventListener("click", navigateToAnotherPage);
    });
});

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
// set input min date to current date
const currentDate = new Date().toISOString().split("T")[0];

// Get all input elements with type="date"
const dateInputs = document.querySelectorAll('input[type="date"]');

// Loop through each date input and set the min attribute to the current date
dateInputs.forEach((input) => {
  input.min = currentDate;
});
