document.getElementById("clear_all").addEventListener("click", function () {
  // Select all inputs inside the filters div and set their value to ""
  document
    .querySelectorAll(".filters input, .filters select")
    .forEach((input) => {
      input.value = "";
      // If it's a checkbox or radio input, uncheck it
      if (input.type === "checkbox" || input.type === "radio") {
        input.checked = false;
      }
    });
});

// function to apply all filters to the data
document.getElementById("apply_filters").addEventListener("click", getFilters);

// function to get all the filters
function getFilters() {
  const filters = {};

  // Get the values from the inputs
  const inputs = document.querySelectorAll(".filters input");
  const selects = document.querySelectorAll(".filters select");
  inputs.forEach((input) => {
    if (input.checked) {
      // just add input value to filters
      filters[input.name] = input.value;
    }
  });
  selects.forEach((select) => {
    if (select.value !== "") {
      // just add input value to filters
      filters[select.name] = select.value;
    }
  });

  // add filters to session storage
  sessionStorage.setItem("filters", JSON.stringify(filters));
  fetchDataAndUpdateUI();
}

// function to apply all filters to the data
function applyFilters(data, filters) {
  const today = new Date();
  const tomorrow = new Date(today);
  const endOfWeek = new Date(today);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  endOfWeek.setDate(today.getDate() + (6 - today.getDay())); // end of week is the next saturday
  tomorrow.setDate(today.getDate() + 1);
  console.log("apply filters ", filters);
  console.log("data ", data);
  // if filters.price is asc, sort data by price asc
  if (filters.price === "asc") {
    data.sort((a, b) => parseFloat(a.prix) - parseFloat(b.prix));
  } else if (filters.price === "desc") {
    data.sort((a, b) => parseFloat(b.prix) - parseFloat(a.prix));
  }
  if (filters.date) {
    data = data.filter((ride) => {
      const rideDate = new Date(ride.date_depart);
      if (filters.date === "today") {
        if (rideDate.toDateString() === today.toDateString()) {
          console.log("today ", ride);
          return true;
        }
      } else if (filters.date === "tomorrow") {
        if (rideDate.toDateString() === tomorrow.toDateString()) {
          console.log("tomorrow ", ride);
          return true;
        }
      } else if (filters.date === "thisWeek") {
        console.log("rideDate ", rideDate);
        console.log("today ", today.toDateString());
        console.log("endOfWeek ", endOfWeek.toDateString());
        if (
          (rideDate >= today && rideDate <= endOfWeek) ||
          rideDate.toDateString() === today.toDateString()
        ) {
          console.log("week ", ride);
          return true;
        }
      } else if (filters.date === "thisMonth") {
        if (
          (rideDate >= today && rideDate <= endOfMonth) ||
          rideDate.toDateString() === today.toDateString()
        ) {
          console.log("month ", ride);
          return true;
        }
      }
    });
  }
  if (filters.wilaya) {
    data = data.filter((ride) => ride.lieu_depart.includes(filters.wilaya));
  }
  if (filters.place === "asc") {
    data.sort(
      (a, b) => parseFloat(a.places_libre) - parseFloat(b.places_libre)
    );
  } else if (filters.place === "desc") {
    data.sort(
      (a, b) => parseFloat(b.places_libre) - parseFloat(a.places_libre)
    );
  }

  return data;
}
