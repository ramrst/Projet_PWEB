const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
document.getElementById("connexionbutton").addEventListener("click", navigateToAnotherPage);
registerBtn.addEventListener('mouseover', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('mouseover', () => {
    container.classList.remove("active");
});
// Function to handle button click event
function navigateToAnotherPage() {
    // Change "targetPage.html" to the actual HTML page you want to navigate to
    window.location.href = "loginpage/loginpage.html";
}

// Attach the function to the button click event when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("connexionbutton").addEventListener("click", navigateToAnotherPage);
});