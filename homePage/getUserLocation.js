// get user location and send it to the server

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
} else {
  console.log("Geolocation is not supported by this browser.");
}
function successCallback(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const Data = {
    latitude: latitude,
    longitude: longitude,
  };
  console.log(Data);
}
function errorCallback(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert(
        "User denied the request for Geolocation. Please enable location services to use this feature."
      );
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable. Please try again later.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out. Please try again.");
      break;
    case error.UNKNOWN_ERROR:
      alert(
        "An unknown error occurred while trying to get the user's location."
      );
      break;
  }
}

// function sendLocationToServer(Data) {
//   var xhr = new XMLHttpRequest();
//   xhr.open("POST", "saveLocation.php", true);
//   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//   var postData =
//     "latitude=" +
//     encodeURIComponent(Data.latitude) +
//     "&longitude=" +
//     encodeURIComponent(Data.longitude);
//   console.log(postData);
//   xhr.send(postData);
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState == 4 && xhr.status == 200) {
//       console.log(xhr.responseText);
//     }
//   };
// }
