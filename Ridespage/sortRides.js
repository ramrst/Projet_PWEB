function getUserLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        console.log(userLocation);
        resolve(userLocation);
      },
      (error) => {
        reject(new Error("Failed to get user location: " + error.message));
      }
    );
  });
}

// Use Promise-based function for getLatLong
function getLatLong(address) {
  return new Promise((resolve, reject) => {
    fetch(
      "https://nominatim.openstreetmap.org/search?q=" +
        address +
        "&format=json&limit=1"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const latLong = { latitude: data[0].lat, longitude: data[0].lon };
          console.log(latLong);
          resolve(latLong);
        } else {
          reject("Invalid location data for address: " + address);
        }
      })
      .catch((error) => {
        reject("Error fetching location data: " + error);
        resolve({ latitude: 0, longitude: 0 });
      });
  });
}

async function addLatLongToRides(Rides) {
  try {
    const promises = Rides.map(async (ride) => {
      try {
        ride.departureLatLong = await getLatLong(ride.lieu_depart);
        console.log("ride departurelatlong ", ride.departureLatLong);
      } catch (error) {
        console.error(error);
      }
      return ride;
    });

    return await Promise.all(promises);
  } catch (error) {
    console.error("Error adding lat-long to rides:", error);
    return Rides;
  }
}

function haversineDistance(userLocation, location) {
  const earthRadius = 6371e3; // metres
  const φ1 = userLocation.latitude * (Math.PI / 180);
  const φ2 = location.latitude * (Math.PI / 180);
  const Δφ = (location.latitude - userLocation.latitude) * (Math.PI / 180);
  const Δλ = (location.longitude - userLocation.longitude) * (Math.PI / 180);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
}

async function haversineSort(Rides, userLocation) {
  try {
    await addLatLongToRides(Rides);

    for (const ride of Rides) {
      ride.departureDistance = haversineDistance(
        userLocation,
        ride.departureLatLong
      );
    }

    Rides.sort((a, b) => a.departureDistance - b.departureDistance);
  } catch (error) {
    console.error("Error processing rides:", error);
  }

  return Rides;
}

async function sortRides(Rides) {
  try {
    const userLocation = await getUserLocation();
    console.log("user location ", userLocation);

    const sortedRides = await haversineSort(Rides, userLocation);
    // console.log("sorted rides ", sortedRides);

    return sortedRides;
  } catch (error) {
    console.error("Error sorting rides:", error);
    return Rides;
  }
}
