// ==========================================
// TRAINERS MODULE
// ==========================================

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


const addTrainerBtn = document.getElementById("addTrainerBtn");
const trainerModal = document.getElementById("trainerModal");
const closeTrainerModal = document.getElementById("closeTrainerModal");
const cancelBtn = document.querySelector(".cancel-btn");
const saveBtn = document.querySelector(".confirm-btn");

const trainerSearch = document.getElementById("trainerSearch");
const statusFilter = document.getElementById("statusFilter");
const trainersGrid = document.querySelector(".trainers-grid");

// ==========================================
// OPEN MODAL
// ==========================================

addTrainerBtn.addEventListener("click", () => {

    trainerModal.classList.add("active");

});

// ==========================================
// CLOSE MODAL
// ==========================================

function closeModal() {

    trainerModal.classList.remove("active");

}

closeTrainerModal.addEventListener("click", closeModal);

cancelBtn.addEventListener("click", closeModal);

// ==========================================
// CLOSE ON OUTSIDE CLICK
// ==========================================

trainerModal.addEventListener("click", (e) => {

    if (e.target === trainerModal) {

        closeModal();

    }

});

// ==========================================
// ADD TRAINER (Dummy)
// ==========================================

saveBtn.addEventListener("click", () => {

    const name = document.getElementById("trainerName").value.trim();
    const specialization = document.getElementById("trainerSpecialization").value;
    const phone = document.getElementById("trainerPhone").value.trim();
    const email = document.getElementById("trainerEmail").value.trim();
    const experience = document.getElementById("trainerExperience").value.trim();
    const status = document.getElementById("trainerStatus").value;

    if (!name || !specialization || !phone || !email || !experience) {

        alert("Please fill all required fields.");

        return;

    }

    const statusText = status === "active" ? "Active" : "On Leave";

    const card = document.createElement("div");

    card.className = "trainer-card";

    card.innerHTML = `
        <div class="trainer-image">
            <img src="https://placehold.co/400x300?text=Trainer" alt="Trainer">
        </div>

        <div class="trainer-info">

            <h2>${name}</h2>

            <span class="specialization">${specialization}</span>

            <div class="trainer-details">

                <p><i class="fa-solid fa-phone"></i> ${phone}</p>

                <p><i class="fa-solid fa-envelope"></i> ${email}</p>

                <p><i class="fa-solid fa-star"></i> ${experience} Years Experience</p>

                <p><i class="fa-solid fa-users"></i> 0 Members Assigned</p>

            </div>

            <span class="status ${status}">
                ${statusText}
            </span>

            <div class="trainer-actions">

                <button class="edit-btn">
                    <i class="fa-solid fa-pen"></i>
                    Edit
                </button>

                <button class="delete-btn">
                    <i class="fa-solid fa-trash"></i>
                    Delete
                </button>

            </div>

        </div>
    `;

    trainersGrid.prepend(card);

    document.getElementById("trainerName").value = "";
    document.getElementById("trainerSpecialization").value = "";
    document.getElementById("trainerPhone").value = "";
    document.getElementById("trainerEmail").value = "";
    document.getElementById("trainerExperience").value = "";
    document.getElementById("trainerStatus").value = "active";
    document.getElementById("trainerPhoto").value = "";

    closeModal();

});

// ==========================================
// DELETE TRAINER
// ==========================================

trainersGrid.addEventListener("click", (e) => {

    const deleteBtn = e.target.closest(".delete-btn");

    if (!deleteBtn) return;

    if (confirm("Delete this trainer?")) {

        deleteBtn.closest(".trainer-card").remove();

    }

});

// ==========================================
// EDIT TRAINER
// ==========================================

trainersGrid.addEventListener("click", (e) => {

    const editBtn = e.target.closest(".edit-btn");

    if (!editBtn) return;

    alert("Edit functionality will be connected with backend later.");

});

// ==========================================
// SEARCH TRAINER
// ==========================================

trainerSearch.addEventListener("keyup", filterTrainerCards);

statusFilter.addEventListener("change", filterTrainerCards);

function filterTrainerCards() {

    const searchValue = trainerSearch.value.toLowerCase();
    const statusValue = statusFilter.value;

    document.querySelectorAll(".trainer-card").forEach(card => {

        const name = card.querySelector("h2").textContent.toLowerCase();
        const status = card.querySelector(".status").textContent.trim().toLowerCase();

        const matchSearch = name.includes(searchValue);

        const matchStatus =
            statusValue === "all" ||
            (statusValue === "active" && status === "active") ||
            (statusValue === "leave" && status === "on leave");

        card.style.display = (matchSearch && matchStatus)
            ? "block"
            : "none";

    });

}