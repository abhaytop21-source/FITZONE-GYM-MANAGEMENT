/* =========================================================
   FITZONE — PROFILE
   Frontend  Logic
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    const API_BASE_URL = "http://localhost:5000";

    /* =====================================================
       01. ELEMENTS
    ===================================================== */

    const profileModal =
        document.getElementById("profileModal");

    const profileModalOverlay =
        document.getElementById(
            "profileModalOverlay"
        );

    const editProfileBtn =
        document.getElementById(
            "editProfileBtn"
        );

    const closeProfileModal =
        document.getElementById(
            "closeProfileModal"
        );

    const cancelProfileBtn =
        document.getElementById(
            "cancelProfileBtn"
        );

    const profileForm =
        document.getElementById(
            "profileForm"
        );

    const avatarEditBtn =
        document.getElementById(
            "avatarEditBtn"
        );

    const mobileMenuBtn =
        document.getElementById(
            "mobileMenuBtn"
        );

    const sidebar =
        document.querySelector(".sidebar");

    const notificationBtn =
        document.getElementById(
            "notificationBtn"
        );

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );

    const changePasswordBtn =
        document.getElementById(
            "changePasswordBtn"
        );

    const securityBtn =
        document.getElementById(
            "securityBtn"
        );

    const fitnessEditSection =
        document.getElementById(
            "fitnessEditSection"
        );

    const personalEditSection =
        document.getElementById(
            "personalEditSection"
        );

    const preferencesEditSection =
        document.getElementById(
            "preferencesEditSection"
        );


    const editHeight =
        document.getElementById(
            "editHeight"
        );

    const editWeight =
        document.getElementById(
            "editWeight"
        );

    const editFitnessGoal =
        document.getElementById(
            "editFitnessGoal"
        );

    const editExperience =
        document.getElementById(
            "editExperience"
        );

    const editActivity =
        document.getElementById(
            "editActivity"
        );

    const editTrainingDays =
        document.getElementById(
            "editTrainingDays"
        );


    const editPreferredWorkout =
        document.getElementById(
            "editPreferredWorkout"
        );

    const editPreferredTime =
        document.getElementById(
            "editPreferredTime"
        );

    const editTrainingFrequency =
        document.getElementById(
            "editTrainingFrequency"
        );


    /* =====================================================
       02. PROFILE DATA
    ===================================================== */

    const defaultProfile = {

        /* Personal */

        fullName:
            "Abhay",

        email:
            "abhay@example.com",

        phone:
            "",

        dob:
            "",

        gender:
            "",

        location:
            "Maharashtra, India",


        /* Fitness */

        height:
            "178",

        weight:
            "68",

        fitnessGoal:
            "Build Muscle",

        experience:
            "Intermediate",

        activity:
            "Active",

        trainingDays:
            "5 days / week",


        /* Preferences */

        preferredWorkout:
            "Strength Training",

        preferredTime:
            "Evening",

        trainingFrequency:
            "5 sessions / week"

    };

    /* =====================================================
       load backend profile if available, otherwise use default profile
    ===================================================== */

    let profileData = {
        ...defaultProfile
    };

    loadBackendProfile();

    async function loadBackendProfile() {

        const backendProfile =
            await fetchProfileFromBackend();

        if (!backendProfile) {
            return;
        }

        profileData = {
            ...profileData,

            fullName:
                backendProfile.fullName || "",

            email:
                backendProfile.email || "",

            phone:
                backendProfile.phone || "",

            dob:
                backendProfile.dateOfBirth
                    ? backendProfile.dateOfBirth.substring(0, 10)
                    : "",

            gender:
                backendProfile.gender || "",

            location:
                backendProfile.location || "",

            height:
                backendProfile.height ?? "",

            weight:
                backendProfile.weight ?? "",

            fitnessGoal:
                backendProfile.fitnessGoal || "",

            experience:
                backendProfile.experienceLevel || "",

            activity:
                backendProfile.activityLevel || "",

            trainingDays:
                backendProfile.trainingDays || "",

            preferredWorkout:
                backendProfile.preferredWorkout || "",

            preferredTime:
                backendProfile.preferredTime || "",

            trainingFrequency:
                backendProfile.trainingFrequency || ""
        };

        renderProfile();
    }


    /* =====================================================
       profile from the real backend if available
    ===================================================== */

    async function fetchProfileFromBackend() {

    const token = localStorage.getItem("memberToken");

    if (!token) {
        console.error("Member token not found.");
        return null;
    }

    try {

        const response = await fetch(
            `${API_BASE_URL}/api/member/profile`,
            {
                method: "GET",

                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Unable to load profile."
            );
        }

        return data.profile;

    } catch (error) {

        console.error(
            "Failed to fetch member profile:",
            error
        );

        return null;
    }
}


    /* =====================================================
       03. LOAD PROFILE
    ===================================================== */

    function loadProfile() {

        try {

            const saved =
                localStorage.getItem(
                    "fitzoneProfile"
                );


            if (!saved) {

                return {
                    ...defaultProfile
                };

            }


            return {
                ...defaultProfile,
                ...JSON.parse(saved)
            };

        }

        catch (error) {

            console.error(
                "Unable to load profile:",
                error
            );


            return {
                ...defaultProfile
            };

        }

    }


    /* =====================================================
       04. SAVE PROFILE
    ===================================================== */

    function saveProfile() {

        localStorage.setItem(
            "fitzoneProfile",
            JSON.stringify(profileData)
        );

    }


    /* =====================================================
       05. PROFILE ELEMENTS
    ===================================================== */

    const profileFullName =
        document.getElementById(
            "profileFullName"
        );

    const profileEmail =
        document.getElementById(
            "profileEmail"
        );

    const profilePhone =
        document.getElementById(
            "profilePhone"
        );

    const profileDob =
        document.getElementById(
            "profileDob"
        );

    const profileGender =
        document.getElementById(
            "profileGender"
        );

    const profileLocation =
        document.getElementById(
            "profileLocation"
        );

    const profileAvatar =
        document.querySelector(
            ".profile-avatar > span"
        );

    const profileIdentityName =
        document.querySelector(
            ".profile-identity-info h1"
        );

    const profileIdentityEmail =
        document.querySelector(
            ".profile-identity-info > p"
        );

    const userAvatar =
        document.querySelector(
            ".user-avatar"
        );

    const userName =
        document.querySelector(
            ".user-info strong"
        );


    /* =====================================================
       06. FORM ELEMENTS
    ===================================================== */

    const editFullName =
        document.getElementById(
            "editFullName"
        );

    const editEmail =
        document.getElementById(
            "editEmail"
        );

    const editPhone =
        document.getElementById(
            "editPhone"
        );

    const editDob =
        document.getElementById(
            "editDob"
        );

    const editGender =
        document.getElementById(
            "editGender"
        );

    const editLocation =
        document.getElementById(
            "editLocation"
        );


    /* =====================================================
       07. INITIAL RENDER
    ===================================================== */

    renderProfile();


    /* =====================================================
       08. RENDER PROFILE
    ===================================================== */

    function renderProfile() {


        /* -----------------------------------------------
           Name
        ------------------------------------------------ */

        if (profileFullName) {

            profileFullName.textContent =
                profileData.fullName ||
                "Not added";

        }


        if (profileIdentityName) {

            profileIdentityName.textContent =
                profileData.fullName ||
                "Member";

        }


        if (userName) {

            userName.textContent =
                profileData.fullName ||
                "Member";

        }


        /* -----------------------------------------------
           Email
        ------------------------------------------------ */

        if (profileEmail) {

            profileEmail.textContent =
                profileData.email ||
                "Not added";

        }


        if (profileIdentityEmail) {

            profileIdentityEmail.textContent =
                profileData.email ||
                "Not added";

        }


        /* -----------------------------------------------
           Phone
        ------------------------------------------------ */

        if (profilePhone) {

            profilePhone.textContent =
                profileData.phone ||
                "Not added";

        }


        /* -----------------------------------------------
           DOB
        ------------------------------------------------ */

        if (profileDob) {

            profileDob.textContent =
                formatDate(
                    profileData.dob
                );

        }


        /* -----------------------------------------------
           Gender
        ------------------------------------------------ */

        if (profileGender) {

            profileGender.textContent =
                formatGender(
                    profileData.gender
                );

        }


        /* -----------------------------------------------
           Location
        ------------------------------------------------ */

        if (profileLocation) {

            profileLocation.textContent =
                profileData.location ||
                "Not added";

        }


        /* -----------------------------------------------
           Avatar
        ------------------------------------------------ */

        const initial =
            getInitial(
                profileData.fullName
            );


        if (profileAvatar) {

            profileAvatar.textContent =
                initial;

        }


        if (userAvatar) {

            userAvatar.textContent =
                initial;

        }

        /* -----------------------------------------------
           Fitness & Preferences
        ------------------------------------------------ */

        const profileHeight =
            document.getElementById(
                "profileHeight"
            );

        const profileWeight =
            document.getElementById(
                "profileWeight"
            );

        const profileFitnessGoal =
            document.getElementById(
                "profileFitnessGoal"
            );

        const profileExperience =
            document.getElementById(
                "profileExperience"
            );

        const profileActivity =
            document.getElementById(
                "profileActivity"
            );

        const profileTrainingDays =
            document.getElementById(
                "profileTrainingDays"
            );

        const preferredWorkout =
            document.getElementById(
                "preferredWorkout"
            );

        const preferredTime =
            document.getElementById(
                "preferredTime"
            );

        const trainingFrequency =
            document.getElementById(
                "trainingFrequency"
            );


        if (profileHeight) {

            profileHeight.textContent =
                profileData.height
                    ? `${profileData.height} cm`
                    : "Not added";

        }


        if (profileWeight) {

            profileWeight.textContent =
                profileData.weight
                    ? `${profileData.weight} kg`
                    : "Not added";

        }


        if (profileFitnessGoal) {

            profileFitnessGoal.textContent =
                profileData.fitnessGoal ||
                "Not added";

        }


        if (profileExperience) {

            profileExperience.textContent =
                profileData.experience ||
                "Not added";

        }


        if (profileActivity) {

            profileActivity.textContent =
                profileData.activity ||
                "Not added";

        }


        if (profileTrainingDays) {

            profileTrainingDays.textContent =
                profileData.trainingDays ||
                "Not added";

        }


        if (preferredWorkout) {

            preferredWorkout.textContent =
                profileData.preferredWorkout ||
                "Not added";

        }


        if (preferredTime) {

            preferredTime.textContent =
                profileData.preferredTime ||
                "Not added";

        }


        if (trainingFrequency) {

            trainingFrequency.textContent =
                profileData.trainingFrequency ||
                "Not added";

        }


        updateCompletion();

    }


    /* =====================================================
       09. OPEN EDIT PROFILE
    ===================================================== */

    function openProfileModal(
        section = "personal"
    ) {

        if (!profileModal) return;


        populateForm();


        showEditSection(
            section
        );


        profileModal.hidden =
            false;


        document.body.style.overflow =
            "hidden";


        setTimeout(
            () => {

                const firstInput =
                    profileModal.querySelector(
                        `.profile-edit-section:not([hidden]) input,
                        .profile-edit-section:not([hidden]) select`
                    );

                firstInput?.focus();

            },
            100
        );

    }

    function showEditSection(
        section
    ) {

        personalEditSection.hidden =
            section !== "personal";


        fitnessEditSection.hidden =
            section !== "fitness";


        preferencesEditSection.hidden =
            section !== "preferences";


        const label =
            profileModal.querySelector(
                ".profile-modal-header .section-label"
            );

        const title =
            profileModal.querySelector(
                ".profile-modal-header h2"
            );

        const description =
            profileModal.querySelector(
                ".profile-modal-header p"
            );


        if (section === "fitness") {

            label.textContent =
                "FITNESS SETTINGS";

            title.textContent =
                "Edit Fitness Information";

            description.textContent =
                "Update your fitness details.";

        }

        else if (section === "preferences") {

            label.textContent =
                "FITNESS PREFERENCES";

            title.textContent =
                "Edit Preferences";

            description.textContent =
                "Customize your training preferences.";

        }

        else {

            label.textContent =
                "PROFILE SETTINGS";

            title.textContent =
                "Edit Profile";

            description.textContent =
                "Update your personal information.";

        }

    }


    editProfileBtn?.addEventListener(
        "click",
        openProfileModal
    );


    /* =====================================================
       10. SECTION EDIT BUTTONS
    ===================================================== */

    document
        .querySelectorAll(
            ".section-edit-btn"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const section =
                            button.dataset.section;

                        openProfileModal(
                            section
                        );

                    }
                );

            }
        );


    /* =====================================================
       11. POPULATE FORM
    ===================================================== */

    function populateForm() {

        if (editFullName) {

            editFullName.value =
                profileData.fullName || "";

        }


        if (editEmail) {

            editEmail.value =
                profileData.email || "";

        }


        if (editPhone) {

            editPhone.value =
                profileData.phone || "";

        }


        if (editDob) {

            editDob.value =
                profileData.dob || "";

        }


        if (editGender) {

            editGender.value =
                profileData.gender || "";

        }


        if (editLocation) {

            editLocation.value =
                profileData.location || "";

        }

        if (editHeight) {

            editHeight.value =
                profileData.height || "";

        }


        if (editWeight) {

            editWeight.value =
                profileData.weight || "";

        }


        if (editFitnessGoal) {

            editFitnessGoal.value =
                profileData.fitnessGoal || "";

        }


        if (editExperience) {

            editExperience.value =
                profileData.experience || "";

        }


        if (editActivity) {

            editActivity.value =
                profileData.activity || "";

        }


        if (editTrainingDays) {

            editTrainingDays.value =
                profileData.trainingDays || "";

        }


        if (editPreferredWorkout) {

            editPreferredWorkout.value =
                profileData.preferredWorkout || "";

        }


        if (editPreferredTime) {

            editPreferredTime.value =
                profileData.preferredTime || "";

        }


        if (editTrainingFrequency) {

            editTrainingFrequency.value =
                profileData.trainingFrequency || "";

        }

    }


        /* =====================================================
            12. CLOSE PROFILE MODAL
        ===================================================== */

        function closeProfileModalFn() {

            if (!profileModal) return;

            profileModal.hidden = true;

            document.body.style.overflow = "";

        }


        closeProfileModal?.addEventListener(
            "click",
            closeProfileModalFn
        );


        cancelProfileBtn?.addEventListener(
            "click",
            closeProfileModalFn
        );


        profileModalOverlay?.addEventListener(
            "click",
            closeProfileModalFn
        );


    /* =====================================================
       13. SAVE PROFILE FORM
    ===================================================== */

    profileForm?.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            const token =
                localStorage.getItem("memberToken");

            if (!token) {
                showToast("Please login again.");
                return;
            }


            // =====================================================
            // PERSONAL INFORMATION
            // =====================================================

            if (
                personalEditSection &&
                !personalEditSection.hidden
            ) {

                const fullName =
                    editFullName?.value.trim() || "";

                const email =
                    editEmail?.value.trim() || "";

                if (!fullName) {
                    showToast("Please enter your name.");
                    editFullName?.focus();
                    return;
                }

                if (!email) {
                    showToast("Please enter your email.");
                    editEmail?.focus();
                    return;
                }


                const personalData = {

                    fullName,

                    email,

                    phone:
                        editPhone?.value.trim() || "",

                    dateOfBirth:
                        editDob?.value || null,

                    gender:
                        editGender?.value || "",

                    location:
                        editLocation?.value.trim() || ""

                };


                console.log(
                    "Sending personal data:",
                    personalData
                );


                try {

                    const response =
                        await fetch(
                            `${API_BASE_URL}/api/member/profile/personal`,
                            {
                                method: "PUT",

                                headers: {
                                    "Content-Type":
                                        "application/json",

                                    "Authorization":
                                        `Bearer ${token}`
                                },

                                body:
                                    JSON.stringify(
                                        personalData
                                    )
                            }
                        );


                    const data =
                        await response.json();


                    console.log(
                        "Personal update response:",
                        data
                    );


                    if (!response.ok) {

                        throw new Error(
                            data.message ||
                            "Unable to update personal information."
                        );

                    }


                    profileData = {
                        ...profileData,

                        fullName:
                            data.profile?.fullName ??
                            personalData.fullName,

                        email:
                            data.profile?.email ??
                            personalData.email,

                        phone:
                            data.profile?.phone ??
                            personalData.phone,

                        dob:
                            data.profile?.dateOfBirth
                                ? data.profile.dateOfBirth.substring(0, 10)
                                : personalData.dateOfBirth || "",

                        gender:
                            data.profile?.gender ??
                            personalData.gender,

                        location:
                            data.profile?.location ??
                            personalData.location
                    };


                    renderProfile();

                    closeProfileModalFn();

                    showToast(
                        "Personal information updated successfully."
                    );


                } catch (error) {

                    console.error(
                        "Personal profile update failed:",
                        error
                    );

                    showToast(
                        error.message ||
                        "Unable to update profile."
                    );

                }

                return;
            }



            // =====================================================
            // FITNESS INFORMATION
            // =====================================================

            if (
                fitnessEditSection &&
                !fitnessEditSection.hidden
            ) {

                const fitnessData = {

                    height:
                        editHeight?.value
                            ? Number(editHeight.value)
                            : null,

                    weight:
                        editWeight?.value
                            ? Number(editWeight.value)
                            : null,

                    fitnessGoal:
                        editFitnessGoal?.value || "",

                    experienceLevel:
                        editExperience?.value || "",

                    activityLevel:
                        editActivity?.value || "",

                    trainingDays:
                        editTrainingDays?.value || ""

                };


                console.log(
                    "Sending fitness data:",
                    fitnessData
                );


                try {

                    const response =
                        await fetch(
                            `${API_BASE_URL}/api/member/profile/fitness`,
                            {
                                method: "PUT",

                                headers: {
                                    "Content-Type":
                                        "application/json",

                                    "Authorization":
                                        `Bearer ${token}`
                                },

                                body:
                                    JSON.stringify(
                                        fitnessData
                                    )
                            }
                        );


                    const data =
                        await response.json();


                    console.log(
                        "Fitness update response:",
                        data
                    );


                    if (!response.ok) {

                        throw new Error(
                            data.message ||
                            "Unable to update fitness information."
                        );

                    }


                    profileData = {
                        ...profileData,

                        height:
                            data.profile?.height ??
                            fitnessData.height,

                        weight:
                            data.profile?.weight ??
                            fitnessData.weight,

                        fitnessGoal:
                            data.profile?.fitnessGoal ??
                            fitnessData.fitnessGoal,

                        experience:
                            data.profile?.experienceLevel ??
                            fitnessData.experienceLevel,

                        activity:
                            data.profile?.activityLevel ??
                            fitnessData.activityLevel,

                        trainingDays:
                            data.profile?.trainingDays ??
                            fitnessData.trainingDays
                    };


                    renderProfile();

                    closeProfileModalFn();

                    showToast(
                        "Fitness information updated successfully."
                    );


                } catch (error) {

                    console.error(
                        "Fitness profile update failed:",
                        error
                    );

                    showToast(
                        error.message ||
                        "Unable to update fitness information."
                    );

                }

                return;
            }



            // =====================================================
            // PREFERENCES
            // =====================================================

            if (
                preferencesEditSection &&
                !preferencesEditSection.hidden
            ) {

                const preferenceData = {

                    preferredWorkout:
                        editPreferredWorkout?.value || "",

                    preferredTime:
                        editPreferredTime?.value || "",

                    trainingFrequency:
                        editTrainingFrequency?.value || ""

                };


                console.log(
                    "Sending preference data:",
                    preferenceData
                );


                try {

                    const response =
                        await fetch(
                            `${API_BASE_URL}/api/member/profile/fitness`,
                            {
                                method: "PUT",

                                headers: {
                                    "Content-Type":
                                        "application/json",

                                    "Authorization":
                                        `Bearer ${token}`
                                },

                                body:
                                    JSON.stringify(
                                        preferenceData
                                    )
                            }
                        );


                    const data =
                        await response.json();


                    console.log(
                        "Preference update response:",
                        data
                    );


                    if (!response.ok) {

                        throw new Error(
                            data.message ||
                            "Unable to update preferences."
                        );

                    }


                    profileData = {
                        ...profileData,

                        preferredWorkout:
                            data.profile?.preferredWorkout ??
                            preferenceData.preferredWorkout,

                        preferredTime:
                            data.profile?.preferredTime ??
                            preferenceData.preferredTime,

                        trainingFrequency:
                            data.profile?.trainingFrequency ??
                            preferenceData.trainingFrequency
                    };


                    renderProfile();

                    closeProfileModalFn();

                    showToast(
                        "Preferences updated successfully."
                    );


                } catch (error) {

                    console.error(
                        "Preference update failed:",
                        error
                    );

                    showToast(
                        error.message ||
                        "Unable to update preferences."
                    );

                }

            }

        }
    );


    /* =====================================================
       15. PROFILE COMPLETION
    ===================================================== */

    function updateCompletion() {

        const fields = [

            profileData.fullName,

            profileData.email,

            profileData.phone,

            profileData.dob,

            profileData.gender,

            profileData.location

        ];


        const completed =
            fields.filter(
                value =>
                    value &&
                    String(value).trim() !== ""
            ).length;


        const percentage =
            Math.round(
                (completed / fields.length) * 100
            );


        const completionPercent =
            document.getElementById(
                "profileCompletionPercent"
            );

        const completionFill =
            document.getElementById(
                "profileCompletionFill"
            );


        if (completionPercent) {

            completionPercent.textContent =
                `${percentage}%`;

        }


        if (completionFill) {

            completionFill.style.width =
                `${percentage}%`;

        }

    }


    /* =====================================================
       16. AVATAR BUTTON
    ===================================================== */

    avatarEditBtn?.addEventListener(
        "click",
        () => {

            showToast(
                "Profile photo upload will be available with the backend."
            );

        }
    );


    /* =====================================================
       17. CHANGE PASSWORD
    ===================================================== */

    changePasswordBtn?.addEventListener(
        "click",
        () => {

            showToast(
                "Password management will be connected to authentication."
            );

        }
    );


    /* =====================================================
       18. SECURITY
    ===================================================== */

    securityBtn?.addEventListener(
        "click",
        () => {

            showToast(
                "Security settings will be connected to the backend."
            );

        }
    );


    /* =====================================================
       19. MOBILE SIDEBAR
    ===================================================== */

    mobileMenuBtn?.addEventListener(
        "click",
        () => {

            sidebar?.classList.toggle(
                "open"
            );

        }
    );


    sidebar
        ?.querySelectorAll(
            ".nav-item"
        )
        .forEach(
            item => {

                item.addEventListener(
                    "click",
                    () => {

                        sidebar
                            ?.classList
                            .remove(
                                "open"
                            );

                    }
                );

            }
        );


    /* =====================================================
       20. NOTIFICATIONS
    ===================================================== */

    notificationBtn?.addEventListener(
        "click",
        () => {

            showToast(
                "No new notifications."
            );

        }
    );


    /* =====================================================
       21. LOGOUT
    ===================================================== */

    logoutBtn?.addEventListener(
        "click",
        () => {

            const confirmed =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmed) return;


            window.location.href =
                "../auth/member-login.html";

        }
    );


    /* =====================================================
       22. DATE FORMAT
    ===================================================== */

    function formatDate(
        dateValue
    ) {

        if (!dateValue) {

            return "Not added";

        }


        const date =
            new Date(
                `${dateValue}T00:00:00`
            );


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return "Not added";

        }


        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    }


    /* =====================================================
       23. GENDER FORMAT
    ===================================================== */

    function formatGender(
        gender
    ) {

        const genderMap = {

            male:
                "Male",

            female:
                "Female",

            other:
                "Other"

        };


        return (
            genderMap[gender] ||
            "Not added"
        );

    }


    /* =====================================================
       24. GET INITIAL
    ===================================================== */

    function getInitial(
        name
    ) {

        if (!name) {

            return "A";

        }


        return name
            .trim()
            .charAt(0)
            .toUpperCase();

    }


    /* =====================================================
       25. TOAST
    ===================================================== */

    function showToast(
        message
    ) {


        document
            .querySelector(
                ".profile-toast"
            )
            ?.remove();


        const toast =
            document.createElement(
                "div"
            );


        toast.className =
            "profile-toast";


        toast.innerHTML = `

            <i class="fa-solid fa-check"></i>

            <span>
                ${escapeHTML(message)}
            </span>

        `;


        Object.assign(
            toast.style,
            {

                position:
                    "fixed",

                right:
                    "24px",

                bottom:
                    "24px",

                zIndex:
                    "9999",

                display:
                    "flex",

                alignItems:
                    "center",

                gap:
                    "9px",

                padding:
                    "12px 15px",

                color:
                    "#d9fbff",

                background:
                    "#111b20",

                border:
                    "1px solid rgba(0,229,255,.18)",

                borderRadius:
                    "9px",

                boxShadow:
                    "0 12px 30px rgba(0,0,0,.3)",

                fontFamily:
                    "Poppins, sans-serif",

                fontSize:
                    "9px",

                fontWeight:
                    "600"

            }
        );


        document.body.appendChild(
            toast
        );


        setTimeout(
            () => {

                toast.style.opacity =
                    "0";

                toast.style.transition =
                    "opacity .2s ease";


                setTimeout(
                    () => {

                        toast.remove();

                    },
                    220
                );

            },
            2400
        );

    }


    /* =====================================================
       26. ESCAPE HTML
    ===================================================== */

    function escapeHTML(
        value
    ) {

        return String(value)

            .replaceAll(
                "&",
                "&amp;"
            )

            .replaceAll(
                "<",
                "&lt;"
            )

            .replaceAll(
                ">",
                "&gt;"
            )

            .replaceAll(
                '"',
                "&quot;"
            )

            .replaceAll(
                "'",
                "&#039;"
            );

    }


});