// Owner Credentials
const OWNER_EMAIL = "admin@fitzone.com";
const OWNER_PASSWORD = "fitzone123";

// Form
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const errorMessage = document.getElementById("errorMessage");

    if (email === OWNER_EMAIL && password === OWNER_PASSWORD) {

        // Save Login Session
        localStorage.setItem("isLoggedIn", "true");

        // Redirect
        window.location.href = "dashboard.html";

    } else {

        errorMessage.innerText = "❌ Invalid Email or Password";
        errorMessage.style.color = "red";

    }

});