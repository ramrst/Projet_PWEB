const DepartureInput = document.getElementById("departureInput");
const suggestionsList = document.getElementById("suggestionsList");

const DepartureInput_1 = document.getElementById("departureInput_1");
const suggestionsList_1 = document.getElementById("suggestionsList_1");
DepartureInput.addEventListener("input", debounce(handleInput, 300));
DepartureInput_1 != null
  ? DepartureInput_1.addEventListener("input", debounce_1(handleInput_1, 300))
  : null;
function debounce(func, delay) {
  let timeoutId;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(context, args), delay);
  };
}
function debounce_1(func, delay) {
  let timeoutId;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(context, args), delay);
  };
}

async function handleInput() {
  const inputValue = DepartureInput.value.trim();

  if (inputValue === "") {
    suggestionsList.style.display = "none";
    return;
  }

  const apiUrl = `https://nominatim.openstreetmap.org/search?q=${inputValue}&format=json`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    displaySuggestions(data);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
  }
}
async function handleInput_1() {
  const inputValue = DepartureInput_1.value.trim();

  if (inputValue === "") {
    suggestionsList_1.style.display = "none";
    return;
  }

  const apiUrl = `https://nominatim.openstreetmap.org/search?q=${inputValue}&format=json`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    displaySuggestions_1(data);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
  }
}
function displaySuggestions_1(data) {
  if (data.length === 0) {
    suggestionsList_1.style.display = "none";
    return;
  }

  const suggestions = data
    .map((item) => `<li>${item.display_name}</li>`)
    .join("");
  suggestionsList_1.innerHTML = suggestions;
  suggestionsList_1.style.display = "block";

  suggestionsList_1.querySelectorAll("li").forEach((li) => {
    li.addEventListener("click", () => {
      DepartureInput_1.value = li.innerText;
      suggestionsList_1.style.display = "none";
    });
  });
}

function displaySuggestions(data) {
  if (data.length === 0) {
    suggestionsList.style.display = "none";
    return;
  }

  const suggestions = data
    .map((item) => `<li>${item.display_name}</li>`)
    .join("");
  suggestionsList.innerHTML = suggestions;
  suggestionsList.style.display = "block";

  suggestionsList.querySelectorAll("li").forEach((li) => {
    li.addEventListener("click", () => {
      DepartureInput.value = li.innerText;
      suggestionsList.style.display = "none";
    });
  });
}

const ArrivalInput = document.getElementById("arrivalInput");
const suggestionsList2 = document.getElementById("suggestionsList1");

const ArrivalInput_1 = document.getElementById("arrivalInput_1");
const suggestionsList2_1 = document.getElementById("suggestionsList1_1");
ArrivalInput.addEventListener("input", debounce(handleInput2, 300));
ArrivalInput_1 != null
  ? ArrivalInput_1.addEventListener("input", debounce(handleInput2_1, 300))
  : null;
async function handleInput2() {
  const inputValue = ArrivalInput.value.trim();

  if (inputValue === "") {
    suggestionsList2.style.display = "none";
    return;
  }

  const apiUrl = `https://nominatim.openstreetmap.org/search?q=${inputValue}&format=json`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    displaySuggestions2(data);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
  }
}
async function handleInput2_1() {
  const inputValue = ArrivalInput_1.value.trim();

  if (inputValue === "") {
    suggestionsList2_1.style.display = "none";
    return;
  }

  const apiUrl = `https://nominatim.openstreetmap.org/search?q=${inputValue}&format=json`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    displaySuggestions2_1(data);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
  }
}
function displaySuggestions2_1(data) {
  if (data.length === 0) {
    suggestionsList2_1.style.display = "none";
    return;
  }

  const suggestions = data
    .map((item) => `<li>${item.display_name}</li>`)
    .join("");
  suggestionsList2_1.innerHTML = suggestions;
  suggestionsList2_1.style.display = "block";

  suggestionsList2_1.querySelectorAll("li").forEach((li) => {
    li.addEventListener("click", () => {
      ArrivalInput_1.value = li.innerText;
      suggestionsList2_1.style.display = "none";
    });
  });
}
function displaySuggestions2(data) {
  if (data.length === 0) {
    suggestionsList2.style.display = "none";
    return;
  }

  const suggestions = data
    .map((item) => `<li>${item.display_name}</li>`)
    .join("");
  suggestionsList2.innerHTML = suggestions;
  suggestionsList2.style.display = "block";

  suggestionsList2.querySelectorAll("li").forEach((li) => {
    li.addEventListener("click", () => {
      ArrivalInput.value = li.innerText;
      suggestionsList2.style.display = "none";
    });
  });
}

function handleClickOutside(event) {
  console.log("clicked");
  if (suggestionsList2_1 != null) {
    if (!suggestionsList2_1.contains(event.target)) {
      suggestionsList2_1.style.display = "none";
    }
  }
  if (suggestionsList2 != null) {
    if (!suggestionsList2.contains(event.target)) {
      suggestionsList2.style.display = "none";
    }
  }
  if (suggestionsList_1 != null) {
    if (!suggestionsList_1.contains(event.target)) {
      suggestionsList_1.style.display = "none";
    }
  }
  if (suggestionsList != null) {
    if (!suggestionsList.contains(event.target)) {
      suggestionsList.style.display = "none";
    }
  }
}
document.addEventListener("click", handleClickOutside);
