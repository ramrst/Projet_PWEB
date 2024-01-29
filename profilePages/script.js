document.addEventListener("DOMContentLoaded", function () {
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
      get_rides();
    })

    .catch((error) => {
      console.log("error promise ", error);
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
