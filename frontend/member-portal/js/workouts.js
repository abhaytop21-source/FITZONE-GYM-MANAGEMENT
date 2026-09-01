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

    const exerciseList =
        document.getElementById("exerciseList");

    const exerciseCount =
        document.getElementById("exerciseCount");

    const exerciseTotal =
        document.getElementById("exerciseTotal");

    const startWorkoutBtn =
        document.getElementById("startWorkoutBtn");

    const viewWorkoutBtn =
        document.getElementById("viewWorkoutBtn");

    const editWorkoutBtn =
        document.getElementById("editWorkoutBtn");

    const workoutLevel =
        document.querySelector(".workout-level");

    const workoutInfoItems =
        document.querySelectorAll(
            ".workout-info-item"
        );

    const userName =
        document.querySelector(
            ".user-info strong"
        );

    const userAvatar =
        document.querySelector(
            ".user-avatar"
        );

    const mobileMenuBtn =
        document.getElementById(
            "mobileMenuBtn"
        );

    const sidebar =
        document.querySelector(
            ".sidebar"
        );

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );

    const notificationBtn =
        document.getElementById(
            "notificationBtn"
        );


    /* =====================================================
       STATE
    ===================================================== */

    let currentWorkout = null;


    /* =====================================================
       LOAD MEMBER WORKOUT
    ===================================================== */

    async function loadMemberWorkout() {

        const token =
            localStorage.getItem(
                "memberToken"
            );


        if (!token) {

            console.error(
                "Member token not found."
            );

            window.location.href =
                "../auth/member-login.html";

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
       RENDER WORKOUT
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
       RENDER NO WORKOUT
    ===================================================== */

    function renderNoWorkout() {

        if (currentWorkoutName) {

            currentWorkoutName.textContent =
                "No Workout Assigned";

        }


        if (workoutLevel) {

            workoutLevel.textContent =
                "NOT ASSIGNED";

        }


        updateWorkoutInfo(
            "--",
            "0 Exercises",
            "--"
        );


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


        if (exerciseCount) {

            exerciseCount.textContent =
                "0 Exercises";

        }


        if (exerciseTotal) {

            exerciseTotal.textContent =
                "0 Exercises";

        }


        if (startWorkoutBtn) {

            startWorkoutBtn.disabled = true;

            startWorkoutBtn.style.opacity =
                "0.5";

            startWorkoutBtn.style.cursor =
                "not-allowed";

        }


        if (viewWorkoutBtn) {

            viewWorkoutBtn.disabled = true;

            viewWorkoutBtn.style.opacity =
                "0.5";

            viewWorkoutBtn.style.cursor =
                "not-allowed";

        }


        /*
         * Editing is disabled for now because
         * the create/update workout API has not
         * been implemented yet.
         */

        if (editWorkoutBtn) {

            editWorkoutBtn.disabled = true;

            editWorkoutBtn.style.opacity =
                "0.5";

            editWorkoutBtn.style.cursor =
                "not-allowed";

        }

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


        if (workoutLevel) {

            workoutLevel.textContent =
                currentWorkout.goal ||
                "FITNESS";

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


        updateWorkoutInfo(
            duration,
            `${exercises.length} ${
                exercises.length === 1
                    ? "Exercise"
                    : "Exercises"
            }`,
            difficulty
        );

    }


    /* =====================================================
       WORKOUT INFORMATION
    ===================================================== */

    function updateWorkoutInfo(
        duration,
        exerciseText,
        intensity
    ) {

        if (
            !workoutInfoItems ||
            workoutInfoItems.length < 3
        ) {

            return;

        }


        // Duration
        const durationValue =
            workoutInfoItems[0]
                ?.querySelector("strong");


        if (durationValue) {

            durationValue.textContent =
                duration;

        }


        // Exercise count
        const exerciseValue =
            workoutInfoItems[1]
                ?.querySelector("strong");


        if (exerciseValue) {

            exerciseValue.textContent =
                exerciseText;

        }


        // Intensity
        const intensityValue =
            workoutInfoItems[2]
                ?.querySelector("strong");


        if (intensityValue) {

            intensityValue.textContent =
                intensity;

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


                /*
                 * If exercise duration exists,
                 * use it.
                 *
                 * Otherwise estimate rest time
                 * only when available.
                 */

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
       GET DIFFICULTY
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


        /*
         * If exercises have different
         * difficulty values, show the
         * highest/general level.
         */

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

                if (
                    (
                        priority[
                            String(
                                difficulty
                            ).toLowerCase()
                        ] || 0
                    ) >
                    (
                        priority[
                            String(
                                highest
                            ).toLowerCase()
                        ] || 0
                    )
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
                currentWorkout.exercises
            )
                ? currentWorkout.exercises
                : [];


        exerciseList.innerHTML = "";


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
                        ).padStart(2, "0")}
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


        const count =
            exercises.length;


        if (exerciseCount) {

            exerciseCount.textContent =
                `${count} ${
                    count === 1
                        ? "Exercise"
                        : "Exercises"
                }`;

        }


        if (exerciseTotal) {

            exerciseTotal.textContent =
                `${count} ${
                    count === 1
                        ? "Exercise"
                        : "Exercises"
                }`;

        }

    }


    /* =====================================================
       ENABLE WORKOUT ACTIONS
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


        /*
         * Edit remains disabled for now.
         *
         * We will connect it after the
         * create/update workout API exists.
         */

        if (editWorkoutBtn) {

            editWorkoutBtn.disabled =
                true;

            editWorkoutBtn.style.opacity =
                "0.5";

            editWorkoutBtn.style.cursor =
                "not-allowed";

        }

    }


    /* =====================================================
       START WORKOUT
    ===================================================== */

    startWorkoutBtn?.addEventListener(
        "click",
        () => {

            if (!currentWorkout) {

                return;

            }


            showMessage(
                "Workout start API is the next step."
            );

        }
    );


    /* =====================================================
       VIEW DETAILS
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
       USER DISPLAY
    ===================================================== */

    function loadMemberName() {

        /*
         * We don't make another API call here.
         * The dashboard/profile already uses
         * the member token.
         *
         * If your member name is available in
         * localStorage later, we can populate it.
         */

    }


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
                ${escapeHTML(message)}
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
                    () => toast.remove(),
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

    loadMemberName();

    loadMemberWorkout();

});