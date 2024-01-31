// document
//   .getElementById("connexionbutton")
//   .addEventListener("click", navigateToAnotherPage);

// Function to handle button click event

function navigateToAnotherPage() {
  // Change "targetPage.html" to the actual HTML page you want to navigate to
  window.location.href = "../loginpage/loginpage.html";
}

// Attach the function to the button click event when the DOM is fully loaded

document
  .getElementById("trajet_form")
  .addEventListener("submit", handleTrajetFormSubmit);

function handleTrajetFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(this);
  const data = {};
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }
  sessionStorage.setItem("searchTerms", JSON.stringify(data));
  window.location.href = "../Ridespage/ridespage.html";
}

// Close the drop-down menu if the user clicks outside of it
const currentDate = new Date().toISOString().split("T")[0];

// Get all input elements with type="date"
const dateInputs = document.querySelectorAll('input[type="date"]');

// Loop through each date input and set the min attribute to the current date
dateInputs.forEach((input) => {
  input.min = currentDate;
});

// listen on the real time data base for added childeren
