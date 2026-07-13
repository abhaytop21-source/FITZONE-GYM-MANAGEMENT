const startButton = document.getElementById("startSetup");

const welcomeCard = document.getElementById("welcomeCard");

const setupCard = document.getElementById("setupCard");


// ================= STEP 2 -> STEP 3 =================


const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");

const step1Next = document.getElementById("step1Next");
const step2Back = document.getElementById("step2Back");

const progressFill = document.getElementById("progressFill");


// Start Wizard

startButton.addEventListener("click", () => {

    welcomeCard.classList.add("hidden");

    setupCard.classList.remove("hidden");

});


// Step 1 -> Step 2

step1Next.addEventListener("click", () => {

    step1.classList.add("hidden");

    step2.classList.remove("hidden");

    progressFill.style.width = "50%";

});


// Step 2 -> Step 1

step2Back.addEventListener("click", () => {

    step2.classList.add("hidden");

    step1.classList.remove("hidden");

    progressFill.style.width = "25%";

});

// ================= STEP 2 -> STEP 3 =================

const step3 = document.getElementById("step3");

const step2Next = document.getElementById("step2Next");
const step3Back = document.getElementById("step3Back");

step2Next.addEventListener("click", () => {

    step2.classList.add("hidden");

    step3.classList.remove("hidden");

    progressFill.style.width = "75%";

});

step3Back.addEventListener("click", () => {

    step3.classList.add("hidden");

    step2.classList.remove("hidden");

    progressFill.style.width = "50%";

});