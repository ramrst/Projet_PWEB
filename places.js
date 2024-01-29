const DepartureInput = document.getElementById("departureInput");
const suggestionsList = document.getElementById("suggestionsList");

DepartureInput.addEventListener("input", debounce(handleInput, 300));

function debounce(func, delay) {
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

ArrivalInput.addEventListener("input", debounce(handleInput2, 300));

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
