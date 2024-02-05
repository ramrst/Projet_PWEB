function getParameterByName(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

document.addEventListener("DOMContentLoaded", function () {
  // Get the value of the code_trajet parameter from the URL
  const code_trajet = getParameterByName("code_trajet");

  if (code_trajet) {
    // If the code_trajet parameter exists in the URL, log it
    console.log("Received code_trajet:", code_trajet);

    // Construct the URL with the code_trajet parameter
    const url = `../backend/php/getTrajetReservation.php?code_trajet=${code_trajet}`;

    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Configure the GET request
    xhr.open("GET", url, true);

    // Set up event handler for when the request is complete
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        // Request was successful
        const responseData = JSON.parse(xhr.responseText);
        if (responseData.success == true)
          display_rides(responseData.reservation);
        else {
          console.log("No reservations found for this trajet");
        }

        // Perform any actions you need with the reservation data
      } else {
        // Request failed
        console.error("Request failed with status:", xhr.status);
      }
    };

    // Set up event handler for when there's an error with the request
    xhr.onerror = function () {
      console.error("Request failed");
    };

    // Send the request
    xhr.send();
  } else {
    console.log("Code_trajet parameter not found in the URL");
  }
});
function display_rides(reservations) {
  console.log(reservations);
  const table_body = document.getElementById("table-body");
  table_body.innerHTML = reservations
    .map((reservation, index) => {
      // Generate a unique ID for each row
      const rowId = `reservation-${index}`;

      return `<tr class="md-table-content-row" id="${rowId}">
      <td>${reservation.nom}</td>
      <td>${reservation.prenom}</td>
      <td>${reservation.tel}</td>
      <td>${reservation.nbr_place}</td>
          <td>${reservation.date_reservation}</td>
        
          
         
        
         
        </tr>`;
    })
    .join("");

  // Add event listener to each row
}
