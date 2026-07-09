// ================================
// FITZONE - Gym Profile Settings
// ================================

// Check Login Session
const isLoggedIn = localStorage.getItem("isLoggedIn");

if (isLoggedIn !== "true") {
    window.location.href = "login.html";
}

// Get Elements
const gymName = document.getElementById("gymName");
const ownerName = document.getElementById("ownerName");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const address = document.getElementById("address");
const openingTime = document.getElementById("openingTime");
const closingTime = document.getElementById("closingTime");

const saveBtn = document.getElementById("saveSettings");
const gymTitle = document.getElementById("gymTitle");

// ================================
// Load Existing Settings
// ================================

function loadSettings() {

    const settings = JSON.parse(localStorage.getItem("gymSettings"));

    if (!settings) return;

    gymName.value = settings.gymName || "";
    ownerName.value = settings.ownerName || "";
    phone.value = settings.phone || "";
    email.value = settings.email || "";
    address.value = settings.address || "";
    openingTime.value = settings.openingTime || "";
    closingTime.value = settings.closingTime || "";

    gymTitle.innerText = settings.gymName || "FITZONE";

}

// ================================
// Save Settings
// ================================

saveBtn.addEventListener("click", () => {

    const settings = {

        gymName: gymName.value,
        ownerName: ownerName.value,
        phone: phone.value,
        email: email.value,
        address: address.value,
        openingTime: openingTime.value,
        closingTime: closingTime.value

    };

    localStorage.setItem(
        "gymSettings",
        JSON.stringify(settings)
    );

    gymTitle.innerText = settings.gymName;

    showToast(
        "🏋 Gym Profile",
        "Gym Profile Saved Successfully."
    );

});

loadSettings();

// ================================
// Logout
// ================================

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", (e) => {

    e.preventDefault();

    localStorage.removeItem("isLoggedIn");

    window.location.href = "index.html";

});