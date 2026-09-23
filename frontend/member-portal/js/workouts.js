/* =========================================================
   FITZONE MEMBER WORKOUTS
   REAL BACKEND DATA
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const API_BASE_URL = "http://localhost:5000";


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const currentWorkoutName =
        document.getElementById("currentWorkoutName");

    const currentWorkoutDescription =
        document.getElementById("currentWorkoutDescription");

    const exerciseList =
        document.getElementById("exerciseList");

    const exerciseCount =
        document.getElementById("exerciseCount");

    const exerciseTotal =
        document.getElementById("exerciseTotal");

    const workoutLevel =
        document.getElementById("workoutLevel");

    const workoutDuration =
        document.getElementById("workoutDuration");

    const workoutIntensity =
        document.getElementById("workoutIntensity");

    const startWorkoutBtn =
        document.getElementById("startWorkoutBtn");

    const viewWorkoutBtn =
        document.getElementById("viewWorkoutBtn");

    const openWorkoutLibraryBtn =
        document.getElementById("openWorkoutLibraryBtn");

    const exerciseLibrary =
        document.getElementById("exerciseLibrary");

    const libraryGrid =
        document.getElementById("libraryGrid");

    const libraryWorkoutCount =
        document.getElementById("libraryWorkoutCount");

    const closeLibraryBtn =
        document.getElementById("closeLibraryBtn");

    const workoutSearch =
        document.getElementById("workoutSearch");

    const workoutFilters =
        document.getElementById("workoutFilters");

    const memberName =
        document.getElementById("memberName");

    const memberAvatar =
        document.getElementById("memberAvatar");

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const sidebar =
        document.querySelector(".sidebar");

    const logoutBtn =
        document.getElementById("logoutBtn");

    const notificationBtn =
        document.getElementById("notificationBtn");


    /* =====================================================
       STATE
    ===================================================== */

    let currentWorkout = null;

    let workoutLibrary = [];

    let selectedMuscleGroup = "all";


    /* =====================================================
       AUTH
    ===================================================== */

    function getMemberToken() {

        return localStorage.getItem("memberToken");

    }


    function redirectToLogin() {

        window.location.href =
            "../auth/member-login.html";

    }


    /* =====================================================
        LOAD MEMBER DATA

        The backend identifies the logged-in member
        using the JWT token.
    ===================================================== */

    async function loadMemberProfile() {

        const token =
            getMemberToken();

        if (!token) {

            redirectToLogin();

            return;

        }


        try {

            const response =
                await fetch(
                    `${API_BASE_URL}/api/member/dashboard`,
                    {
                        method: "GET",

                        headers: {
                            "Authorization":
                                `Bearer ${token}`
                        }
                    }
                );


            const result =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Unable to load member data."
                );

            }


            /*
            * Dashboard API returns:
            *
            * result.data
            *
            * and inside it:
            *
            * profile.fullName
            */

            const member =
                result.data ||
                {};


            console.log(
                "Real member data loaded:",
                member
            );


            renderMemberIdentity(
                member
            );


        } catch (error) {

            console.error(
                "Failed to load member data:",
                error
            );


            showMessage(
                "Unable to load member information."
            );

        }

    }


    /* =====================================================
       MEMBER IDENTITY
    ===================================================== */

    function renderMemberIdentity(member) {

        const fullName =
            member.profile?.fullName ||
            "Member";


        if (memberName) {

            memberName.textContent =
                fullName;

        }


        if (memberAvatar) {

            const firstLetter =
                fullName
                    .trim()
                    .charAt(0)
                    .toUpperCase();


            memberAvatar.textContent =
                firstLetter;

        }

    }


    /* =====================================================
       LOAD MEMBER WORKOUT
    ===================================================== */

    async function loadMemberWorkout() {

        const token =
            getMemberToken();


        if (!token) {

            redirectToLogin();

            return;

        }


        try {

            const response =
                await fetch(
                    `${API_BASE_URL}/api/member/workouts`,
                    {
                        method: "GET",

                        headers: {
                            "Authorization":
                                `Bearer ${token}`
                        }
                    }
                );


            const result =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Unable to load workouts."
                );

            }


            currentWorkout =
                result.data?.workout ||
                null;


            console.log(
                "Real member workout:",
                currentWorkout
            );


            renderWorkout();


        } catch (error) {

            console.error(
                "Failed to load member workout:",
                error
            );


            showMessage(
                "Unable to load your workout."
            );

        }

    }


    /* =====================================================
       LOAD WORKOUT LIBRARY
    ===================================================== */

    async function loadWorkoutLibrary() {

        if (!libraryGrid) {

            return;

        }


        const token =
            getMemberToken();


        if (!token) {

            return;

        }


        try {

            const response =
                await fetch(
                    `${API_BASE_URL}/api/member/workouts/library`,
                    {
                        method: "GET",

                        headers: {
                            "Authorization":
                                `Bearer ${token}`
                        }
                    }
                );


            const result =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Unable to load workout library."
                );

            }


            workoutLibrary =
                result.data?.workouts ||
                [];


            renderWorkoutLibrary();


        } catch (error) {

            console.error(
                "Workout library error:",
                error
            );


            libraryGrid.innerHTML = `
                <div class="library-loading">

                    <i class="fa-solid fa-circle-exclamation"></i>

                    <p>
                        Unable to load workout library.
                    </p>

                </div>
            `;

        }

    }


    /* =====================================================
       RENDER WORKOUT LIBRARY
    ===================================================== */

    function renderWorkoutLibrary() {

        if (!libraryGrid) {

            return;

        }


        const searchText =
            (workoutSearch?.value || "")
                .trim()
                .toLowerCase();


        const filteredWorkouts =
            workoutLibrary.filter(
                workout => {

                    const matchesMuscle =
                        selectedMuscleGroup === "all" ||
                        String(
                            workout.muscleGroup || ""
                        )
                            .toLowerCase() ===
                        selectedMuscleGroup;


                    const matchesSearch =
                        !searchText ||

                        String(
                            workout.name || ""
                        )
                            .toLowerCase()
                            .includes(searchText) ||

                        String(
                            workout.description || ""
                        )
                            .toLowerCase()
                            .includes(searchText);


                    return (
                        matchesMuscle &&
                        matchesSearch
                    );

                }
            );


        if (libraryWorkoutCount) {

            libraryWorkoutCount.textContent =
                `${filteredWorkouts.length} ${
                    filteredWorkouts.length === 1
                        ? "workout"
                        : "workouts"
                }`;

        }


        if (!filteredWorkouts.length) {

            libraryGrid.innerHTML = `
                <div class="library-loading">

                    <p>
                        No workouts found.
                    </p>

                </div>
            `;

            return;

        }


        libraryGrid.innerHTML = "";


        filteredWorkouts.forEach(
            workout => {

                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "library-exercise";


                const muscleGroup =
                    workout.muscleGroup ||
                    "General";


                const exerciseCount =
                    Array.isArray(
                        workout.exercises
                    )
                        ? workout.exercises.length
                        : 0;


                card.innerHTML = `

                    <div class="library-exercise-icon">

                        <i class="fa-solid fa-dumbbell"></i>

                    </div>


                    <div class="library-exercise-info">

                        <span class="library-muscle">

                            ${escapeHTML(
                                muscleGroup
                            )}

                        </span>


                        <h3>

                            ${escapeHTML(
                                workout.name ||
                                "Workout"
                            )}

                        </h3>


                        <p>

                            ${escapeHTML(
                                workout.description ||
                                "Predefined FITZONE workout."
                            )}

                        </p>


                        <div class="library-meta">

                            <span>

                                <i class="fa-solid fa-signal"></i>

                                ${escapeHTML(
                                    workout.difficulty ||
                                    "Standard"
                                )}

                            </span>


                            <span>

                                <i class="fa-solid fa-list"></i>

                                ${exerciseCount}

                                ${
                                    exerciseCount === 1
                                        ? " Exercise"
                                        : " Exercises"
                                }

                            </span>


                            ${
                                workout.duration
                                    ? `
                                        <span>

                                            <i class="fa-regular fa-clock"></i>

                                            ${Number(
                                                workout.duration
                                            )} min

                                        </span>
                                    `
                                    : ""
                            }

                        </div>

                    </div>


                    <button
                        type="button"
                        class="add-exercise-btn"
                        data-workout-id="${Number(
                            workout.id
                        )}"
                    >

                        <span>
                            Select
                        </span>

                        <i class="fa-solid fa-arrow-right"></i>

                    </button>

                `;


                libraryGrid.appendChild(
                    card
                );

            }
        );


        attachWorkoutLibraryButtons();

    }

    // =====================================================
    // SELECT WORKOUT FROM LIBRARY
    // =====================================================

    async function selectWorkout(
        workoutTemplateId
    ) {

        const token =
            getMemberToken();


        if (!token) {

            redirectToLogin();

            return;

        }


        if (!workoutTemplateId) {

            showMessage(
                "Invalid workout selected."
            );

            return;

        }


        try {

            const response =
                await fetch(
                    `${API_BASE_URL}/api/member/workouts/library/${workoutTemplateId}/select`,
                    {
                        method: "POST",

                        headers: {

                            "Authorization":
                                `Bearer ${token}`,

                            "Content-Type":
                                "application/json"

                        }

                    }
                );


            const result =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Unable to select workout."
                );

            }


            console.log(
                "Selected workout:",
                result.data?.workout
            );


            showMessage(
                "Workout selected successfully."
            );


            // Close library

            if (exerciseLibrary) {

                exerciseLibrary.hidden =
                    true;

            }


            // Reload current workout

            await loadMemberWorkout();


        } catch (error) {

            console.error(
                "Select workout error:",
                error
            );


            showMessage(
                error.message ||
                "Unable to select workout."
            );

        }

    }


    // =====================================================
    // WORKOUT LIBRARY BUTTONS
    // =====================================================

    function attachWorkoutLibraryButtons() {

        const buttons =
            libraryGrid?.querySelectorAll(
                "[data-workout-id]"
            ) || [];


        buttons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    async () => {

                        const workoutId =
                            button.dataset.workoutId;


                        if (!workoutId) {

                            return;

                        }


                        const confirmed =
                            confirm(
                                "Select this workout as your current workout?"
                            );


                        if (!confirmed) {

                            return;

                        }


                        button.disabled =
                            true;


                        await selectWorkout(
                            workoutId
                        );


                        button.disabled =
                            false;

                    }
                );

            }
        );

    }

    /* =====================================================
       RENDER CURRENT WORKOUT
    ===================================================== */

    function renderWorkout() {

        if (!currentWorkout) {

            renderNoWorkout();

            return;

        }


        renderWorkoutHeader();

        renderWorkoutExercises();

        enableWorkoutActions();

    }


    /* =====================================================
       NO CURRENT WORKOUT
    ===================================================== */

    function renderNoWorkout() {

        if (currentWorkoutName) {

            currentWorkoutName.textContent =
                "No Workout Assigned";

        }


        if (currentWorkoutDescription) {

            currentWorkoutDescription.textContent =
                "Your gym has not assigned a workout plan yet.";

        }


        if (workoutLevel) {

            workoutLevel.textContent =
                "NOT ASSIGNED";

        }


        if (workoutDuration) {

            workoutDuration.textContent =
                "--";

        }


        if (workoutIntensity) {

            workoutIntensity.textContent =
                "--";

        }


        if (exerciseCount) {

            exerciseCount.textContent =
                "0 Exercises";

        }


        if (exerciseTotal) {

            exerciseTotal.textContent =
                "0 Exercises";

        }


        if (exerciseList) {

            exerciseList.innerHTML = `

                <div class="exercise-card">

                    <div class="exercise-number">
                        —
                    </div>


                    <div class="exercise-icon">

                        <i class="fa-solid fa-dumbbell"></i>

                    </div>


                    <div class="exercise-details">

                        <h3>
                            No workout available
                        </h3>

                        <p>
                            Your gym has not assigned a workout plan yet.
                        </p>

                    </div>

                </div>

            `;

        }


        disableWorkoutActions();

    }


    /* =====================================================
       WORKOUT HEADER
    ===================================================== */

    function renderWorkoutHeader() {

        if (currentWorkoutName) {

            currentWorkoutName.textContent =
                currentWorkout.name ||
                "Workout";

        }


        if (currentWorkoutDescription) {

            currentWorkoutDescription.textContent =
                currentWorkout.description ||
                "Your current FITZONE training session.";

        }


        const exercises =
            Array.isArray(
                currentWorkout.exercises
            )
                ? currentWorkout.exercises
                : [];


        const duration =
            calculateWorkoutDuration(
                exercises
            );


        const difficulty =
            getWorkoutDifficulty(
                exercises
            );


        if (workoutLevel) {

            workoutLevel.textContent =
                currentWorkout.goal ||
                difficulty ||
                "FITNESS";

        }


        if (workoutDuration) {

            workoutDuration.textContent =
                duration;

        }


        if (workoutIntensity) {

            workoutIntensity.textContent =
                difficulty;

        }


        const count =
            exercises.length;


        const countText =
            `${count} ${
                count === 1
                    ? "Exercise"
                    : "Exercises"
            }`;


        if (exerciseCount) {

            exerciseCount.textContent =
                countText;

        }


        if (exerciseTotal) {

            exerciseTotal.textContent =
                countText;

        }

    }


    /* =====================================================
       CALCULATE WORKOUT DURATION
    ===================================================== */

    function calculateWorkoutDuration(
        exercises
    ) {

        if (!exercises.length) {

            return "--";

        }


        let totalMinutes = 0;


        exercises.forEach(
            item => {

                const duration =
                    Number(
                        item.duration
                    ) || 0;


                const sets =
                    Number(
                        item.sets
                    ) || 1;


                const restSeconds =
                    Number(
                        item.restSeconds
                    ) || 0;


                if (duration > 0) {

                    totalMinutes +=
                        duration;

                }


                if (restSeconds > 0) {

                    totalMinutes +=
                        (
                            restSeconds *
                            Math.max(
                                sets - 1,
                                0
                            )
                        ) / 60;

                }

            }
        );


        if (totalMinutes <= 0) {

            return "--";

        }


        return `${Math.ceil(
            totalMinutes
        )} min`;

    }


    /* =====================================================
       GET WORKOUT DIFFICULTY
    ===================================================== */

    function getWorkoutDifficulty(
        exercises
    ) {

        const difficulties =
            exercises
                .map(
                    item =>
                        item.exercise
                            ?.difficulty
                )
                .filter(Boolean);


        if (!difficulties.length) {

            return "Not Set";

        }


        const priority = {

            beginner: 1,

            easy: 1,

            intermediate: 2,

            moderate: 2,

            advanced: 3,

            hard: 3,

            expert: 4

        };


        let highest =
            difficulties[0];


        difficulties.forEach(
            difficulty => {

                const currentPriority =
                    priority[
                        String(
                            difficulty
                        ).toLowerCase()
                    ] || 0;


                const highestPriority =
                    priority[
                        String(
                            highest
                        ).toLowerCase()
                    ] || 0;


                if (
                    currentPriority >
                    highestPriority
                ) {

                    highest =
                        difficulty;

                }

            }
        );


        return highest;

    }


    /* =====================================================
       RENDER EXERCISES
    ===================================================== */

    function renderWorkoutExercises() {

        if (!exerciseList) {

            return;

        }


        const exercises =
            Array.isArray(
                currentWorkout?.exercises
            )
                ? currentWorkout.exercises
                : [];


        exerciseList.innerHTML =
            "";


        if (!exercises.length) {

            exerciseList.innerHTML = `

                <div class="exercise-card">

                    <div class="exercise-number">
                        —
                    </div>


                    <div class="exercise-icon">

                        <i class="fa-solid fa-dumbbell"></i>

                    </div>


                    <div class="exercise-details">

                        <h3>
                            No exercises assigned
                        </h3>

                        <p>
                            This workout does not have any exercises yet.
                        </p>

                    </div>

                </div>

            `;

            return;

        }


        exercises.forEach(
            (item, index) => {

                const exercise =
                    item.exercise ||
                    {};


                const article =
                    document.createElement(
                        "article"
                    );


                article.className =
                    "exercise-card";


                article.dataset.exerciseId =
                    exercise.id ||
                    item.exerciseId;


                const muscle =
                    exercise.muscleGroup ||
                    "General";


                const equipment =
                    exercise.equipment ||
                    "Bodyweight";


                const sets =
                    item.sets;


                const reps =
                    item.reps;


                const duration =
                    item.duration;


                let prescription =
                    "Not specified";


                if (
                    sets !== null &&
                    sets !== undefined &&
                    reps !== null &&
                    reps !== undefined
                ) {

                    prescription =
                        `${sets} × ${reps}`;

                } else if (
                    duration !== null &&
                    duration !== undefined
                ) {

                    prescription =
                        `${duration} min`;

                }


                article.innerHTML = `

                    <div class="exercise-number">

                        ${String(
                            index + 1
                        ).padStart(
                            2,
                            "0"
                        )}

                    </div>


                    <div class="exercise-icon">

                        <i class="fa-solid fa-dumbbell"></i>

                    </div>


                    <div class="exercise-details">

                        <h3>

                            ${escapeHTML(
                                exercise.name ||
                                "Exercise"
                            )}

                        </h3>


                        <p>

                            ${escapeHTML(
                                muscle
                            )}

                            •

                            ${escapeHTML(
                                equipment
                            )}

                        </p>

                    </div>


                    <div class="exercise-prescription">

                        <strong>

                            ${escapeHTML(
                                prescription
                            )}

                        </strong>


                        <span>

                            ${
                                sets !== null &&
                                sets !== undefined &&
                                reps !== null &&
                                reps !== undefined
                                    ? "Sets × Reps"
                                    : "Duration"
                            }

                        </span>

                    </div>


                    <button
                        type="button"
                        class="exercise-menu"
                        aria-label="Exercise details"
                        data-exercise-details
                    >

                        <i class="fa-solid fa-ellipsis"></i>

                    </button>

                `;


                exerciseList.appendChild(
                    article
                );

            }
        );

    }


    /* =====================================================
       WORKOUT ACTIONS
    ===================================================== */

    function enableWorkoutActions() {

        if (startWorkoutBtn) {

            startWorkoutBtn.disabled =
                false;

            startWorkoutBtn.style.opacity =
                "";

            startWorkoutBtn.style.cursor =
                "";

        }


        if (viewWorkoutBtn) {

            viewWorkoutBtn.disabled =
                false;

            viewWorkoutBtn.style.opacity =
                "";

            viewWorkoutBtn.style.cursor =
                "";

        }

    }


    function disableWorkoutActions() {

        [
            startWorkoutBtn,
            viewWorkoutBtn
        ]
            .forEach(
                button => {

                    if (!button) {

                        return;

                    }


                    button.disabled =
                        true;

                    button.style.opacity =
                        "0.5";

                    button.style.cursor =
                        "not-allowed";

                }
            );

    }


    /* =====================================================
       OPEN WORKOUT LIBRARY
    ===================================================== */

    openWorkoutLibraryBtn?.addEventListener(
        "click",
        () => {

            if (!exerciseLibrary) {

                return;

            }


            exerciseLibrary.hidden =
                false;


            loadWorkoutLibrary();


            setTimeout(
                () => {

                    workoutSearch?.focus();

                },
                150
            );

        }
    );


    /* =====================================================
       CLOSE WORKOUT LIBRARY
    ===================================================== */

    closeLibraryBtn?.addEventListener(
        "click",
        () => {

            if (!exerciseLibrary) {

                return;

            }


            exerciseLibrary.hidden =
                true;

        }
    );


    /* =====================================================
       LIBRARY SEARCH
    ===================================================== */

    workoutSearch?.addEventListener(
        "input",
        renderWorkoutLibrary
    );


    /* =====================================================
       LIBRARY MUSCLE FILTERS
    ===================================================== */

    workoutFilters
        ?.querySelectorAll(
            ".filter-btn"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        workoutFilters
                            .querySelectorAll(
                                ".filter-btn"
                            )
                            .forEach(
                                filter =>
                                    filter.classList
                                        .remove(
                                            "active"
                                        )
                            );


                        button.classList.add(
                            "active"
                        );


                        selectedMuscleGroup =
                            button.dataset.filter ||
                            "all";


                        renderWorkoutLibrary();

                    }
                );

            }
        );


    /* =====================================================
       START WORKOUT
       Session API will be connected next.
    ===================================================== */

    startWorkoutBtn?.addEventListener(
        "click",
        () => {

            if (!currentWorkout) {

                return;

            }


            showMessage(
                "Workout session API will be connected next."
            );

        }
    );


    /* =====================================================
       VIEW WORKOUT DETAILS
    ===================================================== */

    viewWorkoutBtn?.addEventListener(
        "click",
        () => {

            if (!currentWorkout) {

                return;

            }


            window.location.href =
                `workout-details.html?id=${encodeURIComponent(
                    currentWorkout.id
                )}`;

        }
    );


    /* =====================================================
       MOBILE MENU
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
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        sidebar.classList.remove(
                            "open"
                        );

                    }
                );

            }
        );


    /* =====================================================
       LOGOUT
    ===================================================== */

    logoutBtn?.addEventListener(
        "click",
        () => {

            const confirmed =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmed) {

                return;

            }


            localStorage.removeItem(
                "memberToken"
            );


            window.location.href =
                "../auth/member-login.html";

        }
    );


    /* =====================================================
       NOTIFICATIONS
    ===================================================== */

    notificationBtn?.addEventListener(
        "click",
        () => {

            showMessage(
                "No new notifications."
            );

        }
    );


    /* =====================================================
       MESSAGE
    ===================================================== */

    function showMessage(message) {

        const existing =
            document.querySelector(
                ".workout-toast"
            );


        existing?.remove();


        const toast =
            document.createElement(
                "div"
            );


        toast.className =
            "workout-toast";


        toast.innerHTML = `

            <i class="fa-solid fa-info-circle"></i>

            <span>

                ${escapeHTML(
                    message
                )}

            </span>

        `;


        Object.assign(
            toast.style,
            {
                position: "fixed",
                right: "24px",
                bottom: "24px",
                zIndex: "9999",
                display: "flex",
                alignItems: "center",
                gap: "9px",
                padding: "12px 15px",
                color: "#d9fbff",
                background: "#111b20",
                border: "1px solid rgba(0, 229, 255, 0.18)",
                borderRadius: "9px",
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.3)",
                fontFamily: "Poppins, sans-serif",
                fontSize: "9px",
                fontWeight: "600"
            }
        );


        document.body.appendChild(
            toast
        );


        setTimeout(
            () => {

                toast.style.opacity =
                    "0";

                toast.style.transform =
                    "translateY(5px)";

                toast.style.transition =
                    "0.2s ease";


                setTimeout(
                    () =>
                        toast.remove(),
                    220
                );

            },
            2500
        );

    }


    /* =====================================================
       HTML ESCAPE
    ===================================================== */

    function escapeHTML(value) {

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


    /* =====================================================
       INITIALIZE
    ===================================================== */

    loadMemberProfile();

    loadMemberWorkout();

});