const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('mouseover', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('mouseover', () => {
    container.classList.remove("active");
});