// Attacher la fonction à l'événement de clic du bouton lorsque le DOM est entièrement chargé
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("FormTrajet").addEventListener("submit", searchRide);
});

function searchRide(event) {
  event.preventDefault();
  const formData = new FormData(this);
  const data = {};
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }
  sessionStorage.setItem("searchTerms", JSON.stringify(data));
  fetchDataAndUpdateUI();
}
/*  <div class="contain">
      <form action="addRide.php" method="POST" id="trajet_form">
        <!-- Departure Location -->
        <div id="depart_arrivee">
          <div class="form-group">
            <label for="departureInput">Lieu de départ :</label>

            <input type="text" id="departureInput" name="departureInput" />
            <ul id="suggestionsList" class="suggestionsList"></ul>
          </div>

          <!-- Arrival Location -->
          <div class="form-group">
            <label for="arrivalInput">Lieu d'arrivée :</label>
            <input type="text" id="arrivalInput" name="arrivalInput" />
            <ul id="suggestionsList1" class="suggestionsList"></ul>
          </div>
        </div>
        <div class="form_date_nbrPass">
          <div>
            <label for="date_depart">Date de départ :</label>
            <input type="date" id="date_depart" name="date_depart" required />
            <br /><br />
          </div>
          <div>
            <label for="date_depart">Heure de départ :</label>
            <input type="time" id="time_depart" name="time_depart" required />
            <br /><br />
          </div>
          <div>
            <label for="numbre_de_passager">Nombre de place disponible :</label>
            <input
              type="number"
              id="nbre_passager"
              name="nbre_passager"
              min="1"
            />
            <br /><br />
          </div>
        </div>
        <div class="form_price">
          <label for="prix">Prix par place :</label>
          <input type="number" id="prix" name="price" min="1" />
          <br /><br />
        </div>

        <button type="submit">Ajputer un trajet</button>
      </form>
    </div>
     
    
    */
