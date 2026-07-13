// ==========================================
// FITZONE REGISTER GYM
// Part 1 - Navigation
// ==========================================


// ---------- Welcome Screen ----------

const startButton = document.getElementById("startSetup");
const welcomeCard = document.getElementById("welcomeCard");
const setupCard = document.getElementById("setupCard");


// ---------- Progress Bar ----------

const progressFill = document.getElementById("progressFill");


// ---------- Steps ----------

const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");
const step4 = document.getElementById("step4");


// ---------- Buttons ----------

const step1Next = document.getElementById("step1Next");

const step2Back = document.getElementById("step2Back");
const step2Next = document.getElementById("step2Next");

const step3Back = document.getElementById("step3Back");
const step3Next = document.getElementById("step3Next");

const step4Back = document.getElementById("step4Back");
const launchGym = document.getElementById("launchGym");


// ==========================================
// Helper Function
// ==========================================

function showStep(currentStep, nextStep, progress){

    currentStep.classList.add("hidden");

    nextStep.classList.remove("hidden");

    progressFill.style.width = progress;

}


// ==========================================
// STEP 1 VALIDATION
// ==========================================

function validateStep1() {

    let valid = true;

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("ownerEmail");
    const phone = document.getElementById("ownerPhone");
    const password = document.getElementById("ownerPassword");
    const confirmPassword = document.getElementById("confirmPassword");

    // ---------- First Name ----------

    if (!isRequired(firstName.value)) {

        showError(firstName, "First name is required.");
        valid = false;

    } else if (!minLength(firstName.value, 2)) {

        showError(firstName, "Minimum 2 characters required.");
        valid = false;

    } else {

        showSuccess(firstName);

    }

    // ---------- Last Name ----------

    if (!isRequired(lastName.value)) {

        showError(lastName, "Last name is required.");
        valid = false;

    } else if (!minLength(lastName.value, 2)) {

        showError(lastName, "Minimum 2 characters required.");
        valid = false;

    } else {

        showSuccess(lastName);

    }

    // ---------- Email ----------

    if (!isRequired(email.value)) {

        showError(email, "Email is required.");
        valid = false;

    } else if (!isValidEmail(email.value)) {

        showError(email, "Enter a valid email address.");
        valid = false;

    } else {

        showSuccess(email);

    }

    // ---------- Phone ----------

    if (!isRequired(phone.value)) {

        showError(phone, "Phone number is required.");
        valid = false;

    } else if (!isValidPhone(phone.value)) {

        showError(phone, "Phone number must contain exactly 10 digits.");
        valid = false;

    } else {

        showSuccess(phone);

    }

    // ---------- Password ----------

    if (!isRequired(password.value)) {

        showError(password, "Password is required.");
        valid = false;

    } else if (!isStrongPassword(password.value)) {

        showError(
            password,
            "Password must be at least 8 characters with uppercase, lowercase and number."
        );

        valid = false;

    } else {

        showSuccess(password);

    }

    // ---------- Confirm Password ----------

    if (!isRequired(confirmPassword.value)) {

        showError(confirmPassword, "Please confirm your password.");
        valid = false;

    } else if (!isMatch(password.value, confirmPassword.value)) {

        showError(confirmPassword, "Passwords do not match.");
        valid = false;

    } else {

        showSuccess(confirmPassword);

    }

    return valid;

}


// ==========================================
// Welcome
// ==========================================

startButton.addEventListener("click", () => {

    welcomeCard.classList.add("hidden");

    setupCard.classList.remove("hidden");

});


// ==========================================
// Step Navigation
// ==========================================


// ==========================================
// STEP 1 -> STEP 2
// ==========================================

// Step 1 → Step 2

step1Next.addEventListener("click", () => {

    if(validateStep1()){

        showStep(step1, step2, "50%");

    }

});

// Step 2 → Step 1

step2Back.addEventListener("click", () => {

    showStep(step2, step1, "25%");

});

// ==========================================
// STEP 2 -> STEP 3
// ==========================================

// Step 2 → Step 3

step2Next.addEventListener("click", () => {

    showStep(step2, step3, "75%");

});


// Step 3 → Step 2

step3Back.addEventListener("click", () => {

    showStep(step3, step2, "50%");

});


// ==========================================
//  - MEMBERSHIP + REVIEW
// ==========================================


// ---------- Membership ----------

const savePlan = document.getElementById("savePlan");
const plansContainer = document.getElementById("plansContainer");

savePlan.addEventListener("click", () => {

    const name = document.getElementById("planName").value.trim();

    const price = document.getElementById("planPrice").value.trim();

    const duration = document.getElementById("planDuration").value.trim();

    const description = document.getElementById("planDescription").value.trim();


    if(name==="" || price==="" || duration===""){

        alert("Please fill all required fields.");

        return;

    }


    const empty = plansContainer.querySelector(".empty-plan");

    if(empty){

        empty.remove();

    }


    const card = document.createElement("div");

    card.className="membership-card";


    card.innerHTML = `

        <h3>💳 ${name}</h3>

        <p>💰 <strong>₹${price}</strong> / Month</p>

        <p>🗓 Duration : ${duration} Days</p>

        <p>📝 ${description || "No Description"}</p>

        <div class="plan-actions">

            <button>Edit</button>

            <button class="delete-plan">

                Delete

            </button>

        </div>

    `;


    card.querySelector(".delete-plan").addEventListener("click",()=>{

        card.remove();

        if(plansContainer.children.length===0){

            plansContainer.innerHTML=`

                <p class="empty-plan">

                    No membership plans added yet.

                </p>

            `;

        }

    });


    plansContainer.appendChild(card);


    document.getElementById("planName").value="";

    document.getElementById("planPrice").value="";

    document.getElementById("planDuration").value="";

    document.getElementById("planDescription").value="";

});


// ==========================================
// STEP 3 -> STEP 4
// ==========================================

step3Next.addEventListener("click",()=>{


    // ---------- Owner ----------

    document.getElementById("reviewOwner").innerHTML=`

        <strong>${document.getElementById("firstName").value}
        ${document.getElementById("lastName").value}</strong><br>

        📧 ${document.getElementById("ownerEmail").value}<br>

        📞 ${document.getElementById("ownerPhone").value}

    `;


    // ---------- Gym ----------

    document.getElementById("reviewGym").innerHTML=`

        <strong>${document.getElementById("gymName").value}</strong><br>

        🏋 ${document.getElementById("gymType").value}<br>

        📞 ${document.getElementById("gymPhone").value}<br>

        📧 ${document.getElementById("gymEmail").value || "Not Provided"}<br>

        📍 ${document.getElementById("address").value},
        ${document.getElementById("city").value},
        ${document.getElementById("state").value},
        ${document.getElementById("country").value}<br>

        🕒 ${document.getElementById("openingTime").value}
        -
        ${document.getElementById("closingTime").value}

    `;


    // ---------- Membership ----------

    document.getElementById("reviewPlans").innerHTML=

        plansContainer.innerHTML;


    showStep(step3,step4,"100%");


});


// ==========================================
// STEP 4 -> STEP 3
// ==========================================

step4Back.addEventListener("click",()=>{

    showStep(step4,step3,"75%");

});


// ==========================================
// Launch Gym
// ==========================================

launchGym.addEventListener("click",()=>{

    alert(

        `🎉 Congratulations!

        Your gym has been created successfully!

        Next we will connect it with Flask and Database.`

    );

});