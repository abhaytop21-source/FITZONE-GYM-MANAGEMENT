// ==========================================
// MEMBERSHIP PLANS
// ==========================================

const addPlanBtn = document.getElementById("addPlanBtn");
const planModal = document.getElementById("planModal");
const closePlanModal = document.getElementById("closePlanModal");
const cancelBtn = document.querySelector(".cancel-btn");
const saveBtn = document.querySelector(".confirm-btn");

const searchInput = document.getElementById("planSearch");
const plansGrid = document.querySelector(".plans-grid");

// ==========================================
// OPEN MODAL
// ==========================================

addPlanBtn.addEventListener("click", () => {

    planModal.classList.add("active");

});

// ==========================================
// CLOSE MODAL
// ==========================================

function closeModal() {

    planModal.classList.remove("active");

}

closePlanModal.addEventListener("click", closeModal);

cancelBtn.addEventListener("click", closeModal);

// ==========================================
// CLOSE WHEN CLICKING OUTSIDE
// ==========================================

planModal.addEventListener("click", (e) => {

    if (e.target === planModal) {

        closeModal();

    }

});

// ==========================================
// SAVE PLAN (Dummy)
// ==========================================

saveBtn.addEventListener("click", () => {

    const name = document.getElementById("planName").value.trim();
    const price = document.getElementById("planPrice").value.trim();
    const duration = document.getElementById("planDuration").value.trim();
    const features = document.getElementById("planFeatures").value.trim();

    if (!name || !price || !duration) {

        alert("Please fill all required fields.");

        return;

    }

    const featureHTML = features
        .split("\n")
        .filter(feature => feature.trim() !== "")
        .map(feature => `
            <li>
                <i class="fa-solid fa-check"></i>
                ${feature}
            </li>
        `)
        .join("");

    const card = document.createElement("div");

    card.className = "plan-card";

    card.innerHTML = `
        <div class="plan-header">

            <h2>${name}</h2>

            <span class="price">₹${price} / Month</span>

        </div>

        <div class="plan-duration">

            <strong>Duration:</strong> ${duration} Days

        </div>

        <div class="plan-members">

            <strong>Members Using:</strong> 0

        </div>

        <ul class="plan-features">

            ${featureHTML}

        </ul>

        <div class="plan-actions">

            <button class="edit-btn">

                <i class="fa-solid fa-pen"></i>

                Edit

            </button>

            <button class="delete-btn">

                <i class="fa-solid fa-trash"></i>

                Delete

            </button>

        </div>
    `;

    plansGrid.prepend(card);

    document.getElementById("planName").value = "";
    document.getElementById("planPrice").value = "";
    document.getElementById("planDuration").value = "";
    document.getElementById("planFeatures").value = "";

    closeModal();

});

// ==========================================
// DELETE PLAN
// ==========================================

plansGrid.addEventListener("click", (e) => {

    const deleteBtn = e.target.closest(".delete-btn");

    if (!deleteBtn) return;

    const confirmDelete = confirm("Delete this membership plan?");

    if (!confirmDelete) return;

    deleteBtn.closest(".plan-card").remove();

});

// ==========================================
// EDIT PLAN (Dummy)
// ==========================================

plansGrid.addEventListener("click", (e) => {

    const editBtn = e.target.closest(".edit-btn");

    if (!editBtn) return;

    alert("Edit functionality will be connected with backend later.");

});

// ==========================================
// SEARCH
// ==========================================

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    document.querySelectorAll(".plan-card").forEach(card => {

        const title = card.querySelector("h2").textContent.toLowerCase();

        if (title.includes(value)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});