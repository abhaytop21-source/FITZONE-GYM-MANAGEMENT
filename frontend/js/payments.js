/* =====================================================
                    PAYMENTS MODULE
===================================================== */

/* ===========================
        DOM ELEMENTS
=========================== */

const receivePaymentBtn = document.getElementById("receivePaymentBtn");
const paymentModal = document.getElementById("paymentModal");
const closePaymentModal = document.getElementById("closePaymentModal");

const cancelBtn = document.querySelector(".cancel-btn");
const confirmBtn = document.querySelector(".confirm-btn");

const memberResults = document.querySelectorAll(".member-result");
const selectedCard = document.querySelector(".selected-card");


/* ===========================
        MODAL FUNCTIONS
=========================== */

function openModal() {

    paymentModal.classList.add("active");

}

function closeModal() {

    paymentModal.classList.remove("active");

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

                    Ready to Receive Payment

                </small>

            </div>

        `;

    });

});


/* ===========================
        EVENTS
=========================== */

receivePaymentBtn.addEventListener("click", openModal);

closePaymentModal.addEventListener("click", closeModal);

cancelBtn.addEventListener("click", closeModal);


/* Close Modal */

window.addEventListener("click", (e) => {

    if (e.target === paymentModal) {

        closeModal();

    }

});


/* Dummy Payment */

confirmBtn.addEventListener("click", () => {

    alert("✅ Payment Received Successfully!");

    closeModal();

});


/* ===========================
            INIT
=========================== */

console.log("Payments Module Loaded");