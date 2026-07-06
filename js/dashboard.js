// Check Login Session

const isLoggedIn = localStorage.getItem("isLoggedIn");

if (isLoggedIn !== "true") {

    alert("Please login first!");

    window.location.href = "login.html";

}

// Logout

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function () {

    localStorage.removeItem("isLoggedIn");

    alert("Logged out successfully!");

    window.location.href = "index.html";

});