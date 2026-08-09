// ==========================================
// FITZONE - GYM SETTINGS
// ==========================================

const API_URL = "http://localhost:5000/api";

// ==========================================
// Authentication Check
// ==========================================

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "../owner-login.html";
}

// ==========================================
// DOM Elements
// ==========================================

// Header
const headerGymName = document.getElementById("gymName");
const headerGymCode = document.getElementById("gymCode");

// Gym Information
const settingsGymName = document.getElementById("settingsGymName");
const gymAddress = document.getElementById("gymAddress");
const gymPhone = document.getElementById("gymPhone");
const gymEmail = document.getElementById("gymEmail");

// Owner Profile
const ownerName = document.getElementById("ownerName");
const ownerEmail = document.getElementById("ownerEmail");

// ==========================================
// Load Gym Settings
// ==========================================

async function loadGymSettings() {

    try {

        const response = await fetch(`${API_URL}/gym/settings`, {

            method: "GET",

            headers: {
                "Authorization": `Bearer ${token}`
            }

        });

        const result = await response.json();

        if (!response.ok) {

            throw new Error(
                result.message || "Failed to load gym information."
            );

        }

        const gym = result.gym;

        // ==================================
        // Header
        // ==================================

        if (headerGymName) {
            headerGymName.textContent = gym.gymName;
        }

        if (headerGymCode) {
            headerGymCode.textContent = `Gym Code : ${gym.gymCode}`;
        }

        // ==================================
        // Gym Information
        // ==================================

        if (settingsGymName) {
            settingsGymName.value = gym.gymName || "";
        }

        if (gymAddress) {
            gymAddress.value = gym.address || "";
        }

        if (gymPhone) {
            gymPhone.value = gym.gymPhone || "";
        }

        if (gymEmail) {
            gymEmail.value = gym.gymEmail || "";
        }

        // ==================================
        // Owner Profile
        // ==================================

        if (ownerName) {

            ownerName.value =
                `${gym.ownerFirstName || ""} ${gym.ownerLastName || ""}`.trim();

        }

        if (ownerEmail) {
            ownerEmail.value = gym.ownerEmail || "";
        }

    } catch (error) {

        console.error("Settings Load Error:", error);

        alert(error.message);

    }

}

// ==========================================
// UPDATE PASSWORD
// ==========================================

const updatePasswordBtn = document.getElementById("updatePasswordBtn");

const currentPassword = document.getElementById("currentPassword");
const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");

if (updatePasswordBtn) {

    updatePasswordBtn.addEventListener("click", async () => {

        const current = currentPassword.value.trim();
        const newPass = newPassword.value.trim();
        const confirm = confirmPassword.value.trim();

        // Frontend validation
        if (!current || !newPass || !confirm) {
            alert("Please fill all password fields.");
            return;
        }

        if (newPass !== confirm) {
            alert("New password and confirm password do not match.");
            return;
        }

        if (newPass.length < 8) {
            alert("New password must be at least 8 characters long.");
            return;
        }

        try {

            updatePasswordBtn.disabled = true;
            updatePasswordBtn.textContent = "Updating...";

            const response = await fetch(`${API_URL}/gym/password`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify({
                    currentPassword: current,
                    newPassword: newPass,
                    confirmPassword: confirm
                })

            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to update password."
                );
            }

            alert("Password updated successfully!");

            // Clear fields
            currentPassword.value = "";
            newPassword.value = "";
            confirmPassword.value = "";

        } catch (error) {

            console.error("Password Update Error:", error);

            alert(error.message);

        } finally {

            updatePasswordBtn.disabled = false;

            updatePasswordBtn.innerHTML = `
                <i class="fa-solid fa-key"></i>
                Update Password
            `;

        }

    });

}

const currentPasswordInput =
    document.getElementById("currentPassword");

if (currentPasswordInput) {

    currentPasswordInput.addEventListener("focus", () => {

        currentPasswordInput.removeAttribute("readonly");

    });

}

// ==========================================
// Start
// ==========================================

loadGymSettings();



// ==========================================
// SAVE GYM INFORMATION
// ==========================================

const saveGymInfoBtn = document.getElementById("saveGymInfoBtn");

if (saveGymInfoBtn) {

    saveGymInfoBtn.addEventListener("click", async () => {

        const gymNameValue = settingsGymName.value.trim();
        const addressValue = gymAddress.value.trim();
        const phoneValue = gymPhone.value.trim();
        const emailValue = gymEmail.value.trim();

        // Basic validation
        if (
            !gymNameValue ||
            !addressValue ||
            !phoneValue ||
            !emailValue
        ) {
            alert("Please fill all gym information fields.");
            return;
        }

        try {

            saveGymInfoBtn.disabled = true;

            saveGymInfoBtn.innerHTML = `
                <i class="fa-solid fa-spinner fa-spin"></i>
                Saving...
            `;

            const response = await fetch(`${API_URL}/gym/settings`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify({
                    gymName: gymNameValue,
                    address: addressValue,
                    gymPhone: phoneValue,
                    gymEmail: emailValue
                })

            });

            const result = await response.json();

            if (!response.ok) {

                throw new Error(
                    result.message || "Failed to update gym information."
                );

            }

            // Update localStorage with latest gym name/code
            const storedGym =
                JSON.parse(localStorage.getItem("gym")) || {};

            storedGym.gymName = result.gym.gymName;
            storedGym.gymCode = result.gym.gymCode;

            localStorage.setItem(
                "gym",
                JSON.stringify(storedGym)
            );

            // Update header immediately
            if (headerGymName) {
                headerGymName.textContent = result.gym.gymName;
            }

            if (headerGymCode) {
                headerGymCode.textContent =
                    `Gym Code : ${result.gym.gymCode}`;
            }

            alert("Gym information updated successfully!");

        } catch (error) {

            console.error(
                "Gym Information Update Error:",
                error
            );

            alert(error.message);

        } finally {

            saveGymInfoBtn.disabled = false;

            saveGymInfoBtn.innerHTML = `
                <i class="fa-solid fa-floppy-disk"></i>
                Save Gym Information
            `;

        }

    });

}

// ==========================================
// SAVE OWNER PROFILE
// ==========================================

const saveOwnerProfileBtn =
    document.getElementById("saveOwnerProfileBtn");

if (saveOwnerProfileBtn) {

    saveOwnerProfileBtn.addEventListener("click", async () => {

        const ownerNameValue = ownerName.value.trim();
        const ownerEmailValue = ownerEmail.value.trim();

        // Validation
        if (!ownerNameValue || !ownerEmailValue) {

            alert("Please fill owner name and email.");

            return;
        }

        try {

            saveOwnerProfileBtn.disabled = true;

            saveOwnerProfileBtn.innerHTML = `
                <i class="fa-solid fa-spinner fa-spin"></i>
                Saving...
            `;

            const response = await fetch(
                `${API_URL}/gym/owner-profile`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        ownerName: ownerNameValue,
                        ownerEmail: ownerEmailValue
                    })
                }
            );

            const result = await response.json();

            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Failed to update owner profile."
                );

            }

            // Update stored gym information
            const storedGym =
                JSON.parse(localStorage.getItem("gym")) || {};

            storedGym.ownerFirstName =
                result.gym.ownerFirstName;

            storedGym.ownerLastName =
                result.gym.ownerLastName;

            storedGym.ownerEmail =
                result.gym.ownerEmail;

            localStorage.setItem(
                "gym",
                JSON.stringify(storedGym)
            );

            alert(
                "Owner profile updated successfully!"
            );

        } catch (error) {

            console.error(
                "Owner Profile Update Error:",
                error
            );

            alert(error.message);

        } finally {

            saveOwnerProfileBtn.disabled = false;

            saveOwnerProfileBtn.innerHTML = `
                <i class="fa-solid fa-floppy-disk"></i>
                Save Profile
            `;

        }

    });

}