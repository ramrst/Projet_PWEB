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

//display paragraphe letter by letter:
// The paragraph text with "BrainBoxDZ" needing special formatting
let text = `CovoitAlgiers est une application de covoiturage en Algérie développée par <span class="special">BrainBoxDZ</span>, une jeune startup algérienne située à Alger centre, à proximité de la station de métro khelifa Boukhalfa.

Notre équipe internationale et multiculturelle est composée essentiellement d’algériens mais aussi de collaborateurs français. Ce qui nous permet d’assurer le suivi de nos services et la commercialisation de nos applications. En effet, nous disposons d’équipes qui travaillent 8 heures sur la région Europe-Afrique. Une autre prend le relais 8 heures sur la région Amérique du nord et du sud. La dernière assure les 8 heures de la région Asie et Moyen Orient.

Notre objectif est de lancer des applications simples qui résolvent les soucis du quotidien partout dans le monde.`;

// Preparing the text by wrapping each character (or HTML tag) in a span
let htmlContent = "";
for (let i = 0; i < text.length; i++) {
  if (text.substring(i, i + 22) === '<span class="special">') {
    // Start of special span
    let closingTagIndex = text.indexOf("</span>", i);
    htmlContent += text.substring(i, closingTagIndex + 7); // Include "</span>"
    i = closingTagIndex + 6; // Move index to the end of "</span>"
  } else if (text[i] === "\n") {
    htmlContent += "<br>";
  } else if (text[i] === " ") {
    htmlContent += '<span class="letter" style="white-space:pre;"> </span>';
  } else {
    htmlContent += `<span class="letter">${text[i]}</span>`;
  }
}

// Function to animate letters
function animateText(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = htmlContent; // Set the HTML content

  let delay = 0;
  document.querySelectorAll(`#${containerId} .letter`).forEach((span) => {
    span.style.animation = `fadeInLetter 0.5s ease forwards ${delay}s`;
    delay += 0.05;
  });
}

// CSS animations (make sure to include this in your CSS file or a <style> tag)
/*
@keyframes fadeInLetter {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.special {
  font-weight: bold;
  font-family: 'Arial', sans-serif; // Example special font
}
*/

// Calling the function with the ID of your container
window.onload = () => animateText("presentation");
