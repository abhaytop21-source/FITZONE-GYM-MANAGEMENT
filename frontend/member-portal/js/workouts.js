/* =========================================================
   FITZONE WORKOUTS
   Frontend demo functionality
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. ELEMENTS
    ===================================================== */

    const editWorkoutBtn =
        document.getElementById("editWorkoutBtn");

    const exerciseLibrary =
        document.getElementById("exerciseLibrary");

    const closeLibraryBtn =
        document.getElementById("closeLibraryBtn");

    const exerciseSearch =
        document.getElementById("exerciseSearch");

    const exerciseFilters =
        document.getElementById("exerciseFilters");

    const libraryGrid =
        document.getElementById("libraryGrid");

    const selectedExerciseCount =
        document.getElementById("selectedExerciseCount");

    const saveWorkoutBtn =
        document.getElementById("saveWorkoutBtn");

    const exerciseList =
        document.getElementById("exerciseList");

    const exerciseCount =
        document.getElementById("exerciseCount");

    const exerciseTotal =
        document.getElementById("exerciseTotal");

    const currentWorkoutName =
        document.getElementById("currentWorkoutName");

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const sidebar =
        document.querySelector(".sidebar");

    const logoutBtn =
        document.getElementById("logoutBtn");


    /* =====================================================
       02. DEMO WORKOUT DATA
    ===================================================== */

    let selectedExercises = [
        {
            name: "Bench Press",
            muscle: "Chest",
            equipment: "Barbell",
            sets: 4,
            reps: 10
        },

        {
            name: "Incline Dumbbell Press",
            muscle: "Upper Chest",
            equipment: "Dumbbell",
            sets: 3,
            reps: 12
        },

        {
            name: "Cable Fly",
            muscle: "Chest",
            equipment: "Cable",
            sets: 3,
            reps: 12
        },

        {
            name: "Tricep Pushdown",
            muscle: "Triceps",
            equipment: "Cable",
            sets: 3,
            reps: 12
        }
    ];


   /* =====================================================
    03. OPEN EXERCISE LIBRARY
    ===================================================== */

    function openExerciseLibrary() {

        if (!exerciseLibrary) return;


        exerciseLibrary.hidden = false;

        body.style.overflow = "hidden";


        updateLibraryButtons();

        updateSelectedCount();


        setTimeout(() => {

            exerciseSearch?.focus();

        }, 150);

    }


    /* =====================================================
    04. CLOSE EXERCISE LIBRARY
    ===================================================== */

    function closeExerciseLibrary() {

        if (!exerciseLibrary) return;


        exerciseLibrary.hidden = true;


        body.style.overflow = "";

    }

    /* =====================================================
       05. EDIT WORKOUT BUTTON
    ===================================================== */

    editWorkoutBtn?.addEventListener(
        "click",
        openExerciseLibrary
    );


    /* =====================================================
       06. CLOSE LIBRARY BUTTON
    ===================================================== */

    closeLibraryBtn?.addEventListener(
        "click",
        closeExerciseLibrary
    );

    /* =====================================================
    06-1. ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                exerciseLibrary &&
                !exerciseLibrary.hidden
            ) {

                closeExerciseLibrary();

            }

        }
    );


    /* =====================================================
       07. SEARCH EXERCISES
    ===================================================== */

    function filterExercises() {

        if (!libraryGrid) return;

        const searchValue =
            exerciseSearch?.value
                .trim()
                .toLowerCase() || "";

        const activeFilter =
            exerciseFilters?.querySelector(
                ".filter-btn.active"
            )?.dataset.filter || "all";


        const exercises =
            libraryGrid.querySelectorAll(
                ".library-exercise"
            );


        exercises.forEach(exercise => {

            const name =
                exercise.dataset.name
                    ?.toLowerCase() || "";

            const muscle =
                exercise.dataset.muscle
                    ?.toLowerCase() || "";


            const matchesSearch =
                name.includes(searchValue);


            const matchesFilter =
                activeFilter === "all" ||
                muscle === activeFilter;


            if (
                matchesSearch &&
                matchesFilter
            ) {

                exercise.classList.remove(
                    "library-hidden"
                );

            } else {

                exercise.classList.add(
                    "library-hidden"
                );

            }

        });

    }


    exerciseSearch?.addEventListener(
        "input",
        filterExercises
    );


    /* =====================================================
       08. MUSCLE FILTERS
    ===================================================== */

    exerciseFilters?.addEventListener(
        "click",
        event => {

            const filterButton =
                event.target.closest(
                    ".filter-btn"
                );


            if (!filterButton) return;


            exerciseFilters
                .querySelectorAll(".filter-btn")
                .forEach(button => {

                    button.classList.remove(
                        "active"
                    );

                });


            filterButton.classList.add(
                "active"
            );


            filterExercises();

        }
    );


    /* =====================================================
       09. ADD EXERCISE
    ===================================================== */

    libraryGrid?.addEventListener(
        "click",
        event => {

            const addButton =
                event.target.closest(
                    ".add-exercise-btn"
                );


            if (!addButton) return;


            const exerciseName =
                addButton.dataset.exercise;


            if (!exerciseName) return;


            const alreadySelected =
                selectedExercises.some(
                    exercise =>
                        exercise.name === exerciseName
                );


            if (alreadySelected) {

                removeExercise(exerciseName);

            } else {

                addExercise(
                    exerciseName,
                    addButton
                );

            }


            updateLibraryButtons();
            updateSelectedCount();

        }
    );


    /* =====================================================
       10. ADD EXERCISE FUNCTION
    ===================================================== */

    function addExercise(
        exerciseName,
        button
    ) {

        const libraryExercise =
            button.closest(
                ".library-exercise"
            );


        const muscle =
            libraryExercise
                ?.dataset.muscle || "General";


        const description =
            libraryExercise
                ?.querySelector(
                    ".library-exercise-info p"
                )?.textContent || "";


        const equipment =
            description.includes("•")
                ? description
                    .split("•")[1]
                    .trim()
                : "Equipment";


        selectedExercises.push({

            name: exerciseName,

            muscle: capitalize(
                muscle
            ),

            equipment,

            sets: 3,

            reps: 12

        });

    }


    /* =====================================================
       11. REMOVE EXERCISE
    ===================================================== */

    function removeExercise(
        exerciseName
    ) {

        selectedExercises =
            selectedExercises.filter(
                exercise =>
                    exercise.name !== exerciseName
            );

    }


    /* =====================================================
       12. UPDATE LIBRARY BUTTONS
    ===================================================== */

    function updateLibraryButtons() {

        if (!libraryGrid) return;


        const buttons =
            libraryGrid.querySelectorAll(
                ".add-exercise-btn"
            );


        buttons.forEach(button => {

            const exerciseName =
                button.dataset.exercise;


            const selected =
                selectedExercises.some(
                    exercise =>
                        exercise.name === exerciseName
                );


            if (selected) {

                button.classList.add(
                    "added"
                );


                button.innerHTML = `
                    <i class="fa-solid fa-check"></i>
                    <span>Added</span>
                `;

            } else {

                button.classList.remove(
                    "added"
                );


                button.innerHTML = `
                    <i class="fa-solid fa-plus"></i>
                    <span>Add</span>
                `;

            }

        });

    }


    /* =====================================================
       13. UPDATE SELECTED COUNT
    ===================================================== */

    function updateSelectedCount() {

        if (!selectedExerciseCount) return;


        const count =
            selectedExercises.length;


        selectedExerciseCount.textContent =
            `${count} ${
                count === 1
                    ? "exercise"
                    : "exercises"
            } selected`;

    }


    /* =====================================================
       14. RENDER CURRENT WORKOUT
    ===================================================== */

    function renderWorkout() {

        if (!exerciseList) return;


        exerciseList.innerHTML = "";


        selectedExercises.forEach(
            (exercise, index) => {

                const article =
                    document.createElement(
                        "article"
                    );


                article.className =
                    "exercise-card";


                article.dataset.exerciseId =
                    index + 1;


                article.innerHTML = `

                    <div class="exercise-number">
                        ${String(index + 1).padStart(2, "0")}
                    </div>

                    <div class="exercise-icon">
                        <i class="fa-solid fa-dumbbell"></i>
                    </div>

                    <div class="exercise-details">

                        <h3>
                            ${escapeHTML(
                                exercise.name
                            )}
                        </h3>

                        <p>
                            ${escapeHTML(
                                exercise.muscle
                            )}
                            •
                            ${escapeHTML(
                                exercise.equipment
                            )}
                        </p>

                    </div>

                    <div class="exercise-prescription">

                        <strong>
                            ${exercise.sets} × ${exercise.reps}
                        </strong>

                        <span>
                            Sets × Reps
                        </span>

                    </div>

                    <button
                        class="exercise-menu"
                        aria-label="Remove exercise"
                        data-remove-exercise="${escapeHTML(
                            exercise.name
                        )}"
                    >

                        <i class="fa-solid fa-trash"></i>

                    </button>

                `;


                exerciseList.appendChild(
                    article
                );

            }
        );


        updateWorkoutCounts();

    }


    /* =====================================================
       15. REMOVE FROM CURRENT WORKOUT
    ===================================================== */

    exerciseList?.addEventListener(
        "click",
        event => {

            const removeButton =
                event.target.closest(
                    "[data-remove-exercise]"
                );


            if (!removeButton) return;


            const exerciseName =
                removeButton.dataset.removeExercise;


            removeExercise(
                exerciseName
            );


            renderWorkout();

            updateLibraryButtons();

            updateSelectedCount();

        }
    );


    /* =====================================================
       16. UPDATE WORKOUT COUNTS
    ===================================================== */

    function updateWorkoutCounts() {

        const count =
            selectedExercises.length;


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
       17. SAVE WORKOUT
    ===================================================== */

    saveWorkoutBtn?.addEventListener(
        "click",
        () => {

            if (
                selectedExercises.length === 0
            ) {

                alert(
                    "Please select at least one exercise."
                );

                return;

            }


            renderWorkout();

            updateSelectedCount();

            updateLibraryButtons();


            closeExerciseLibrary();


            showMessage(
                "Workout updated successfully."
            );

        }
    );


    /* =====================================================
       18. START WORKOUT
    ===================================================== */

    document
        .getElementById("startWorkoutBtn")
        ?.addEventListener(
            "click",
            () => {

                showMessage(
                    "Workout session is ready to start."
                );

            }
        );


    /* =====================================================
       19. VIEW WORKOUT DETAILS
    ===================================================== */

    document
        .getElementById("viewWorkoutBtn")
        ?.addEventListener(
            "click",
            () => {

                const current =
                    document.querySelector(
                        ".current-workout-section"
                    );


                current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }
        );


    /* =====================================================
       20. MOBILE SIDEBAR
    ===================================================== */

    mobileMenuBtn?.addEventListener(
        "click",
        () => {

            sidebar?.classList.toggle(
                "open"
            );

        }
    );


    /* =====================================================
       21. CLOSE SIDEBAR ON LINK CLICK
    ===================================================== */

    sidebar?.querySelectorAll(
        ".nav-item"
    ).forEach(link => {

        link.addEventListener(
            "click",
            () => {

                sidebar.classList.remove(
                    "open"
                );

            }
        );

    });


    /* =====================================================
       22. LOGOUT DEMO
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
       23. NOTIFICATION DEMO
    ===================================================== */

    document
        .getElementById("notificationBtn")
        ?.addEventListener(
            "click",
            () => {

                showMessage(
                    "No new notifications."
                );

            }
        );


    /* =====================================================
       24. MESSAGE
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

            <i class="fa-solid fa-check"></i>

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


        const icon =
            toast.querySelector("i");


        if (icon) {

            icon.style.color =
                "var(--cyan)";

        }


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
       25. CAPITALIZE HELPER
    ===================================================== */

    function capitalize(value) {

        if (!value) return "";

        return value.charAt(0).toUpperCase()
            + value.slice(1);

    }


    /* =====================================================
       26. HTML ESCAPE
    ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }


    /* =====================================================
       27. INITIAL STATE
    ===================================================== */

    renderWorkout();

    updateLibraryButtons();

    updateSelectedCount();

    updateWorkoutCounts();

});