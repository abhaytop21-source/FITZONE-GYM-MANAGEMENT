// ==============================
// API Base URL
// ==============================

const API_URL = "http://localhost:5000/api";

// ==============================
// Login Form
// ==============================

const loginForm = document.getElementById("ownerLoginForm");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const ownerEmail = document.getElementById("ownerEmail").value.trim();
    const ownerPassword = document.getElementById("ownerPassword").value.trim();

    // Validation

    if (!ownerEmail || !ownerPassword) {

        alert("Please fill all fields.");

        return;

    }

    try {

        const response = await fetch(`${API_URL}/auth/login`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                ownerEmail,
                ownerPassword

            })

        });

        const result = await response.json();

        if (!response.ok) {

            throw new Error(result.message);

        }

        // Save Login

        localStorage.setItem("token", result.token);

        localStorage.setItem("gym", JSON.stringify(result.gym));

        alert("Login Successful!");

        window.location.href = "pages/dashboard.html";

    } catch (error) {

        alert(error.message);

    }

});