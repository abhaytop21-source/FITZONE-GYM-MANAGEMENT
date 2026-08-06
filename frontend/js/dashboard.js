// ==============================
// Logged In Gym
// ==============================

const token = localStorage.getItem("token");
const gym = JSON.parse(localStorage.getItem("gym"));

if (!token || !gym) {
    alert("Please login first!");
    window.location.href = "../owner-login.html";
}

// ==============================
// Display Gym Information
// ==============================

const gymName = document.getElementById("gymName");
const gymCode = document.getElementById("gymCode");

if (gymName) {
    gymName.textContent = gym.gymName;
}

if (gymCode) {
    gymCode.textContent = `Gym Code : ${gym.gymCode}`;
}

// ==============================
// Dashboard Cards
// ==============================

const dashboardMembers = document.getElementById("dashboardMembers");
const dashboardPresent = document.getElementById("dashboardPresent");
const dashboardRevenue = document.getElementById("dashboardRevenue");
const dashboardActiveMemberships = document.getElementById("dashboardActiveMemberships");

// Default values until backend API is connected

dashboardMembers.textContent = "0";
dashboardPresent.textContent = "0";
dashboardRevenue.textContent = "₹0";
dashboardActiveMemberships.textContent = "0";


// ==============================
// Logout
// ==============================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        const confirmLogout = confirm("Are you sure you want to logout?");

        if (!confirmLogout) return;

        localStorage.removeItem("token");
        localStorage.removeItem("gym");

        window.location.href = "../owner-login.html";

    });

}