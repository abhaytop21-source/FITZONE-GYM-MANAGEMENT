// Check Login Session

const isLoggedIn = localStorage.getItem("isLoggedIn");

if (isLoggedIn !== "true") {

    alert("Please login first!");

    window.location.href = "login.html";

}

