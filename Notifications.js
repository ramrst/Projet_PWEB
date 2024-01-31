// a promise to get session data from php file
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

let notificationsArray = [];

// Define the function to fetch notifications and listen for new ones
function fetchNotificationsAndListen() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  var database = getDatabase();

  // Ensure user is defined
  if (!user || !user.id) {
    console.error("Error: User or user.id is undefined.");
    return;
  }

  // Define the reference to the "notifications" node in the database
  const notificationsRef = ref(database, "notifications");

  // Create a query to order notifications by targetedUser and filter by user.id
  const queryRef = query(
    notificationsRef,
    orderByChild("targetedUser"),
    equalTo(user.id)
  );

  // Fetch initial array of notifications
  get(queryRef)
    .then((snapshot) => {
      // Clear the existing notifications array
      notificationsArray = [];

      // Iterate through each child node and add it to the array
      snapshot.forEach((childSnapshot) => {
        var notification = childSnapshot.val();
        notification = { ...notification, id: childSnapshot.key };
        if (notification.status === "pending") {
          notificationsArray.push(notification);
        }
      });
      if (notificationsArray.length > 0) {
        document.getElementById("inboxNumber").innerHTML =
          notificationsArray.length;
        displayNotifications();
      } else {
        document.getElementById("inboxNumber").innerHTML = "0";
        document.getElementById("modal-body").innerHTML =
          "there is no  new notifications";
      }

      // Log or process the initial array of notifications
      console.log("Initial notifications array:", notificationsArray);
    })
    .catch((error) => {
      console.error("Error fetching notifications:", error);
      alert("An error occurred while fetching notifications.");
    });

  // Add a listener for the "child_added" event to listen for new notifications
  onChildAdded(notificationsRef, (childSnapshot) => {
    const notification = childSnapshot.val();

    // Check if the targetedUser of the new notification matches the current user's ID
    if (notification.targetedUser === user.id) {
      // Push the new notification to the existing array
      notificationsArray.push(notification);

      // Log or process the updated notifications array
      document.getElementById("inboxNumber").innerHTML =
        notificationsArray.length;
      displayNotifications();
    }
  });
}

// Call the function to fetch notifications and listen for new ones when the document is loaded
fetchNotificationsAndListen();

document.getElementById("inbox").addEventListener("click", function () {
  console.log("clicked");
});

function displayNotifications() {
  const notifications = notificationsArray.map((notification, index) => {
    return `
        <li id="notification-${index}" class="notification">
          <p>${notification.rideDetails.id}</p>
          <p>${notification.rideDetails.departure}</p>
          <p>${notification.rideDetails.destination}</p>
          <div>
            <p>sender: ${notification.sender.firstName} ${notification.sender.lastName}</p>
            <p>date: ${notification.rideDetails.date}</p>
          </div>
          <button class="accept">accepter</button>
          <button class="decline">decliner</button>
        </li>
      `;
  });

  document.getElementById("modal-body").innerHTML = notifications.join("");

  // Add event listeners to the buttons
  document.querySelectorAll(".accept").forEach((button, index) => {
    button.addEventListener("click", () => acceptReservation(index));
  });

  document.querySelectorAll(".decline").forEach((button, index) => {
    button.addEventListener("click", () => decline(index));
  });
}

function acceptReservation(index) {
  const notification = notificationsArray[index];
  const db = getDatabase();
  const notificationRef = ref(db, "notifications/" + notification.id);
  update(notificationRef, {
    status: "accepted",
  })
    .then(() => {
      // save the ride in the database sql
      var XHR = new XMLHttpRequest();
      var date = notification.rideDetails.date.split("T")[0];
      var urlEncodedData =
        "code_trajet=" +
        encodeURIComponent(notification.rideDetails.id) +
        "&code_user=" +
        encodeURIComponent(notification.sender.id) +
        "&nombre_places=" +
        encodeURIComponent(notification.rideDetails.seats) +
        "&date_reservation=" +
        encodeURIComponent(date);

      // Define what happens on successful data submission
      XHR.open("POST", "../Ridespage/makeReservation.php");
      XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      XHR.send(urlEncodedData);
      XHR.onreadystatechange = function () {
        if (XHR.readyState == 4 && XHR.status == 200) {
          // Handle the response from the server if needed
          console.log("response promise ", XHR.responseText);
        }
      };

      alert("Notification updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating notification: ", error);
    });
}

function decline(index) {
  const notification = notificationsArray[index];
  const db = getDatabase();
  const notificationRef = ref(db, "notifications/" + notification.id);
  update(notificationRef, {
    status: "declined",
  })
    .then(() => {
      alert("Notification updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating notification: ", error);
    });
}
