// Logged In Gym
const gym = JSON.parse(localStorage.getItem("gym"));

if (!gym) {
    window.location.href = "../owner-login.html";
}

const gymName = document.getElementById("gymName");
const gymCode = document.getElementById("gymCode");

if (gymName) {
    gymName.textContent = gym.gymName;
}

if (gymCode) {
    gymCode.textContent = `Gym Code : ${gym.gymCode}`;
}