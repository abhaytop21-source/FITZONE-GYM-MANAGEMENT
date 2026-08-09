/* =====================================================
                ATTENDANCE MODULE
===================================================== */

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

/* ===========================
        DOM ELEMENTS
=========================== */

const checkInBtn = document.getElementById("checkInBtn");
const checkInModal = document.getElementById("checkInModal");
const closeAttendanceModal = document.getElementById("closeAttendanceModal");

const cancelBtn = document.querySelector(".cancel-btn");
const confirmBtn = document.querySelector(".confirm-btn");

const todayDate = document.getElementById("todayDate");

const memberResults = document.querySelectorAll(".member-result");
const selectedCard = document.querySelector(".selected-card");


/* ===========================
        TODAY'S DATE
=========================== */

function loadTodayDate() {

    const today = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    todayDate.textContent = today.toLocaleDateString("en-IN", options);

}


/* ===========================
        MODAL FUNCTIONS
=========================== */

function openModal() {

    checkInModal.classList.add("active");

}

function closeModal() {

    checkInModal.classList.remove("active");

}


/* ===========================
        MEMBER SELECTION
=========================== */

memberResults.forEach(member => {

    member.addEventListener("click", () => {

        const name = member.querySelector("h4").textContent;
        const id = member.querySelector("p").textContent;

        selectedCard.innerHTML = `
            <div class="selected-photo">
                <i class="fa-solid fa-user"></i>
            </div>

            <div>

                <h4>${name}</h4>

                <p>${id}</p>

                <small style="color:#22c55e;">
                    Ready for Check In
                </small>

            </div>
        `;

    });

});


/* ===========================
        EVENTS
=========================== */

checkInBtn.addEventListener("click", openModal);

closeAttendanceModal.addEventListener("click", closeModal);

cancelBtn.addEventListener("click", closeModal);


/* Close Modal */

window.addEventListener("click", (e) => {

    if (e.target === checkInModal) {

        closeModal();

    }

});


/* Dummy Check In */

confirmBtn.addEventListener("click", () => {

    alert("✅ Member Checked In Successfully!");

    closeModal();

});


/* ===========================
        INIT
=========================== */

loadTodayDate();