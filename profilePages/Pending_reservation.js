import {
  getDatabase,
  get,
  orderByChild,
  onChildAdded,
  ref,
  query,
  equalTo,
  update,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
import { addReservation } from "./script.js";

let pendingRidesArray = []; // Define the array to store pending rides

document.addEventListener("DOMContentLoaded", function () {
  // Call the function to fetch notifications and listen for new ones when the document is loaded
  // ! fetch user pending rides in the real time data base and display them

  const user = JSON.parse(sessionStorage.getItem("user"));
  let database = getDatabase();
  const notificationsRef = ref(database, "notifications");
  const queryRef = query(
    notificationsRef,
    orderByChild("sender/id"),
    equalTo(user.id)
  );
  let pending = false;
  get(queryRef).then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      let notification = childSnapshot.val();
      notification = { ...notification, id: childSnapshot.key };
      if (notification.status != "accepted") {
        const data = {
          code_notification: childSnapshot.key,
          code_trajet: notification.rideDetails.id,
          createur: notification.targetedUser.id,
          date_depart: notification.rideDetails.date,
          date_reservation: notification.reservationDate,
          destination: notification.rideDetails.destination,
          heure_depart: notification.rideDetails.time,
          lieu_depart: notification.rideDetails.departure,

          nom: notification.targetedUser.firstName,
          places_reserver: notification.rideDetails.seats,
          prenom: notification.targetedUser.lastName,
          prix: notification.rideDetails.price,
          tel: notification.targetedUser.phone,
          status: notification.status,
        };

        console.log(data);
        addReservation(data);
      }
    });
  });
});
