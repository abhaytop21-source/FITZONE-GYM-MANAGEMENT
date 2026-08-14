/* =========================================================
   FITZONE MEMBER AUTH
   Handles:
   - Member Registration
   - Member Login
   - Password visibility
   - Frontend validation
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PASSWORD VISIBILITY
    ===================================================== */

    const passwordToggles = document.querySelectorAll(".password-toggle");

    passwordToggles.forEach((toggle) => {

        toggle.addEventListener("click", () => {

            const targetId = toggle.dataset.target;
            const input = document.getElementById(targetId);

            if (!input) return;

            const icon = toggle.querySelector("i");

            if (input.type === "password") {

                input.type = "text";

                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");

                toggle.setAttribute(
                    "aria-label",
                    "Hide password"
                );

            } else {

                input.type = "password";

                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");

                toggle.setAttribute(
                    "aria-label",
                    "Show password"
                );
            }

        });

    });


    /* =====================================================
       HELPER FUNCTIONS
    ===================================================== */

    function showError(inputId, errorId, message) {

        const input = document.getElementById(inputId);
        const error = document.getElementById(errorId);

        if (input) {
            input.classList.add("input-error");
        }

        if (error) {
            error.textContent = message;
        }

    }


    function clearError(inputId, errorId) {

        const input = document.getElementById(inputId);
        const error = document.getElementById(errorId);

        if (input) {
            input.classList.remove("input-error");
        }

        if (error) {
            error.textContent = "";
        }

    }


    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    }


    function isValidPhone(phone) {

        return /^[0-9]{10}$/.test(phone);

    }


    function setButtonLoading(button, loadingText) {

        if (!button) return;

        button.dataset.originalText =
            button.querySelector("span")?.textContent || "";

        const text = button.querySelector("span");
        const icon = button.querySelector("i");

        if (text) {
            text.textContent = loadingText;
        }

        if (icon) {
            icon.className = "fa-solid fa-spinner fa-spin";
        }

        button.disabled = true;

    }


    function resetButton(button) {

        if (!button) return;

        const text = button.querySelector("span");
        const icon = button.querySelector("i");

        if (text) {
            text.textContent = button.dataset.originalText;
        }

        if (icon) {
            icon.className = "fa-solid fa-arrow-right";
        }

        button.disabled = false;

    }


    /* =====================================================
       MEMBER REGISTRATION
    ===================================================== */

    const registerForm =
        document.getElementById("memberRegisterForm");

    if (registerForm) {

        registerForm.addEventListener("submit", async (event) => {

            event.preventDefault(); 

            let isValid = true;

            const firstName =
                document.getElementById("firstName").value.trim();

            const lastName =
                document.getElementById("lastName").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const password =
                document.getElementById("password").value;

            const confirmPassword =
                document.getElementById("confirmPassword").value;

            const terms =
                document.getElementById("terms").checked;


            /* ---------- First Name ---------- */

            clearError("firstName", "firstNameError");

            if (!firstName) {

                showError(
                    "firstName",
                    "firstNameError",
                    "Please enter your first name."
                );

                isValid = false;

            }


            /* ---------- Last Name ---------- */

            clearError("lastName", "lastNameError");

            if (!lastName) {

                showError(
                    "lastName",
                    "lastNameError",
                    "Please enter your last name."
                );

                isValid = false;

            }


            /* ---------- Email ---------- */

            clearError("email", "emailError");

            if (!email) {

                showError(
                    "email",
                    "emailError",
                    "Please enter your email address."
                );

                isValid = false;

            } else if (!isValidEmail(email)) {

                showError(
                    "email",
                    "emailError",
                    "Please enter a valid email address."
                );

                isValid = false;

            }


            /* ---------- Phone ---------- */

            clearError("phone", "phoneError");

            if (!phone) {

                showError(
                    "phone",
                    "phoneError",
                    "Please enter your phone number."
                );

                isValid = false;

            } else if (!isValidPhone(phone)) {

                showError(
                    "phone",
                    "phoneError",
                    "Enter a valid 10-digit phone number."
                );

                isValid = false;

            }


            /* ---------- Password ---------- */

            clearError("password", "passwordError");

            if (!password) {

                showError(
                    "password",
                    "passwordError",
                    "Please create a password."
                );

                isValid = false;

            } else if (password.length < 8) {

                showError(
                    "password",
                    "passwordError",
                    "Password must contain at least 8 characters."
                );

                isValid = false;

            }


            /* ---------- Confirm Password ---------- */

            clearError(
                "confirmPassword",
                "confirmPasswordError"
            );

            if (!confirmPassword) {

                showError(
                    "confirmPassword",
                    "confirmPasswordError",
                    "Please confirm your password."
                );

                isValid = false;

            } else if (password !== confirmPassword) {

                showError(
                    "confirmPassword",
                    "confirmPasswordError",
                    "Passwords do not match."
                );

                isValid = false;

            }


            /* ---------- Terms ---------- */

            const termsError =
                document.getElementById("termsError");

            if (termsError) {
                termsError.textContent = "";
            }

            if (!terms) {

                if (termsError) {
                    termsError.textContent =
                        "Please accept the Terms & Conditions.";
                }

                isValid = false;

            }


            /* ---------- Stop if invalid ---------- */

            if (!isValid) {
                return;
            }


            /* ---------- Backend registration ---------- */

            const registerButton =
                document.getElementById("registerBtn");

            setButtonLoading(
                registerButton,
                "Creating Account..."
            );

            try {

                const response = await fetch(
                    "http://localhost:5000/api/member/auth/register",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            email,
                            password,
                            fullName: `${firstName} ${lastName}`,
                            phone
                        })
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Registration failed."
                    );
                }

                resetButton(registerButton);

                alert(
                    "Account created successfully! You can now login."
                );

                // Go to member login
                window.location.href =
                    "./member-login.html";

            } catch (error) {

                resetButton(registerButton);

                alert(
                    error.message ||
                    "Unable to create account. Please try again."
                );

            }



        });

    }


    /* =====================================================
       MEMBER LOGIN
    ===================================================== */

    const loginForm =
        document.getElementById("memberLoginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", async (event) => {

            event.preventDefault();

            let isValid = true;

            const email =
                document.getElementById("email").value.trim();

            const password =
                document.getElementById("password").value;


            /* ---------- Email ---------- */

            clearError("email", "emailError");

            if (!email) {

                showError(
                    "email",
                    "emailError",
                    "Please enter your email address."
                );

                isValid = false;

            } else if (!isValidEmail(email)) {

                showError(
                    "email",
                    "emailError",
                    "Please enter a valid email address."
                );

                isValid = false;

            }


            /* ---------- Password ---------- */

            clearError("password", "passwordError");

            if (!password) {

                showError(
                    "password",
                    "passwordError",
                    "Please enter your password."
                );

                isValid = false;

            }


            /* ---------- Stop if invalid ---------- */

            if (!isValid) {
                return;
            }

            /* ---------- login ---------- */

            const loginButton =
                document.getElementById("loginBtn");

            setButtonLoading(
                loginButton,
                "Signing In..."
            );

            try {

                const response = await fetch(
                    "http://localhost:5000/api/member/auth/login",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            email,
                            password
                        })
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Login failed."
                    );
                }

                // Store member JWT
                localStorage.setItem(
                    "memberToken",
                    data.token
                );

                // Store basic member information
                localStorage.setItem(
                    "memberData",
                    JSON.stringify(data.member)
                );

                resetButton(loginButton);

                // Go to member dashboard
                window.location.href =
                    "../pages/dashboard.html";

            } catch (error) {

                resetButton(loginButton);

                alert(
                    error.message ||
                    "Unable to login. Please try again."
                );

            }


        });

    }

});