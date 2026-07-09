// =========================
// FITZONE Global Settings
// =========================

const settings = JSON.parse(localStorage.getItem("gymSettings"));

if (settings) {

    // Gym Name
    document.querySelectorAll(".gym-name").forEach(item => {
        item.innerText = settings.gymName;
    });

    // Owner Name
    document.querySelectorAll(".owner-name").forEach(item => {
        item.innerText = settings.ownerName;
    });

}