/* =========================================================
   FITZONE MEMBER GOALS
   Frontend Demo Logic
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. ELEMENTS
    ===================================================== */

    const addGoalBtn =
        document.getElementById("addGoalBtn");

    const goalModal =
        document.getElementById("goalModal");

    const goalModalOverlay =
        document.getElementById("goalModalOverlay");

    const closeGoalModal =
        document.getElementById("closeGoalModal");

    const cancelGoalBtn =
        document.getElementById("cancelGoalBtn");

    const goalForm =
        document.getElementById("goalForm");

    const goalsList =
        document.getElementById("goalsList");

    const activeGoalsElement =
        document.getElementById("activeGoals");

    const completedGoalsElement =
        document.getElementById("completedGoals");

    const monthlyProgressElement =
        document.getElementById("monthlyProgress");

    const goalCountElement =
        document.getElementById("goalCount");

    const completedGoalsSection =
        document.getElementById(
            "completedGoalsSection"
        );

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const sidebar =
        document.querySelector(".sidebar");

    const notificationBtn =
        document.getElementById("notificationBtn");

    const logoutBtn =
        document.getElementById("logoutBtn");


    /* =====================================================
       02. DEFAULT GOALS
    ===================================================== */

    const defaultGoals = [

        {
            id: "weight",
            type: "WEIGHT",
            icon: "fa-weight-scale",
            iconClass: "",
            name: "Weight Loss",
            description:
                "Reach 65 kg from your current weight.",
            progress: 72,
            remaining: "3.5 kg remaining",
            deadline: "Dec 31, 2026",
            status: "active"
        },

        {
            id: "workout",
            type: "WORKOUT",
            icon: "fa-dumbbell",
            iconClass: "workout-goal-icon",
            name: "Weekly Workout",
            description:
                "Complete 5 workouts every week.",
            progress: 80,
            remaining: "4 / 5 workouts",
            deadline: "This week",
            status: "active"
        },

        {
            id: "streak",
            type: "CONSISTENCY",
            icon: "fa-fire",
            iconClass: "streak-goal-icon",
            name: "Build Consistency",
            description:
                "Reach a 14-day workout streak.",
            progress: 60,
            remaining: "8 / 14 days",
            deadline: "In progress",
            status: "active"
        }

    ];


    /* =====================================================
       03. COMPLETED GOALS
    ===================================================== */

    const defaultCompletedGoals = [

        {
            id: "first-workout",
            name:
                "Complete Your First Workout",
            description:
                "You completed your first FITZONE workout.",
            date:
                "Jul 28, 2026"
        }

    ];


    /* =====================================================
       04. LOAD DATA
    ===================================================== */

    let goals =
        JSON.parse(
            localStorage.getItem(
                "fitzoneGoals"
            )
        );


    let completedGoals =
        JSON.parse(
            localStorage.getItem(
                "fitzoneCompletedGoals"
            )
        );


    if (!Array.isArray(goals)) {

        goals = defaultGoals;

        saveGoals();

    }


    if (!Array.isArray(completedGoals)) {

        completedGoals =
            defaultCompletedGoals;

        saveCompletedGoals();

    }


    /* =====================================================
       05. SAVE GOALS
    ===================================================== */

    function saveGoals() {

        localStorage.setItem(
            "fitzoneGoals",
            JSON.stringify(goals)
        );

    }


    /* =====================================================
       06. SAVE COMPLETED GOALS
    ===================================================== */

    function saveCompletedGoals() {

        localStorage.setItem(
            "fitzoneCompletedGoals",
            JSON.stringify(
                completedGoals
            )
        );

    }


    /* =====================================================
       07. OPEN MODAL
    ===================================================== */

    function openGoalModal() {

        if (!goalModal) return;


        goalModal.hidden = false;

        document.body.style.overflow =
            "hidden";


        setTimeout(() => {

            document
                .getElementById("goalName")
                ?.focus();

        }, 100);

    }


    /* =====================================================
       08. CLOSE MODAL
    ===================================================== */

    function closeModal() {

        if (!goalModal) return;


        goalModal.hidden = true;

        document.body.style.overflow =
            "";

    }


    /* =====================================================
       09. MODAL EVENTS
    ===================================================== */

    addGoalBtn?.addEventListener(
        "click",
        openGoalModal
    );


    closeGoalModal?.addEventListener(
        "click",
        closeModal
    );


    cancelGoalBtn?.addEventListener(
        "click",
        closeModal
    );


    goalModalOverlay?.addEventListener(
        "click",
        closeModal
    );


    /* =====================================================
       10. ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                goalModal &&
                !goalModal.hidden
            ) {

                closeModal();

            }

        }
    );


    /* =====================================================
       11. CREATE GOAL
    ===================================================== */

    goalForm?.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const type =
                document.getElementById(
                    "goalType"
                )?.value;


            const name =
                document.getElementById(
                    "goalName"
                )?.value.trim();


            const target =
                document.getElementById(
                    "goalTarget"
                )?.value;


            const unit =
                document.getElementById(
                    "goalUnit"
                )?.value;


            const deadline =
                document.getElementById(
                    "goalDeadline"
                )?.value;


            if (
                !type ||
                !name ||
                !target ||
                !deadline
            ) {

                showToast(
                    "Please complete all goal details."
                );

                return;

            }


            const newGoal = {

                id:
                    `goal-${Date.now()}`,

                type:
                    getGoalTypeLabel(type),

                icon:
                    getGoalIcon(type),

                iconClass:
                    getGoalIconClass(type),

                name:
                    name,

                description:
                    `Target: ${target} ${unit}`,

                progress:
                    0,

                remaining:
                    `${target} ${unit} target`,

                deadline:
                    formatDeadline(deadline),

                status:
                    "active",

                target:
                    Number(target),

                unit:
                    unit

            };


            goals.push(
                newGoal
            );


            saveGoals();

            renderGoals();

            updateGoalSummary();

            goalForm.reset();

            closeModal();


            showToast(
                "New goal created successfully! 🎯"
            );

        }
    );


    /* =====================================================
       12. GOAL TYPE LABEL
    ===================================================== */

    function getGoalTypeLabel(type) {

        const labels = {

            weight:
                "WEIGHT",

            workout:
                "WORKOUT",

            streak:
                "CONSISTENCY",

            strength:
                "STRENGTH"

        };


        return (
            labels[type] ||
            "FITNESS"
        );

    }


    /* =====================================================
       13. GOAL ICON
    ===================================================== */

    function getGoalIcon(type) {

        const icons = {

            weight:
                "fa-weight-scale",

            workout:
                "fa-dumbbell",

            streak:
                "fa-fire",

            strength:
                "fa-chart-line"

        };


        return (
            icons[type] ||
            "fa-bullseye"
        );

    }


    /* =====================================================
       14. GOAL ICON CLASS
    ===================================================== */

    function getGoalIconClass(type) {

        if (type === "workout") {

            return "workout-goal-icon";

        }


        if (type === "streak") {

            return "streak-goal-icon";

        }


        return "";

    }


    /* =====================================================
       15. FORMAT DEADLINE
    ===================================================== */

    function formatDeadline(dateString) {

        const date =
            new Date(
                `${dateString}T00:00:00`
            );


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return dateString;

        }


        return date.toLocaleDateString(
            "en-IN",
            {
                month: "short",
                day: "numeric",
                year: "numeric"
            }
        );

    }


    /* =====================================================
       16. RENDER ACTIVE GOALS
    ===================================================== */

    function renderGoals() {

        if (!goalsList) return;


        goalsList.innerHTML = "";


        if (goals.length === 0) {

            goalsList.innerHTML = `

                <div class="goals-empty">

                    <div>

                        <i class="fa-solid fa-bullseye"></i>

                        <strong>
                            No active goals
                        </strong>

                        <p>
                            Create your first goal
                            and start your journey.
                        </p>

                    </div>

                </div>

            `;


            return;

        }


        goals.forEach(
            goal => {

                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "goal-card";


                card.dataset.goalId =
                    goal.id;


                if (
                    goal.status ===
                    "completed"
                ) {

                    card.classList.add(
                        "completed"
                    );

                }


                card.innerHTML = `

                    <div class="goal-card-icon
                        ${escapeHTML(
                            goal.iconClass || ""
                        )}">

                        <i class="fa-solid
                            ${escapeHTML(
                                goal.icon
                            )}">
                        </i>

                    </div>


                    <div class="goal-card-content">

                        <div class="goal-card-top">

                            <div>

                                <span class="goal-type">
                                    ${escapeHTML(
                                        goal.type
                                    )}
                                </span>

                                <h3>
                                    ${escapeHTML(
                                        goal.name
                                    )}
                                </h3>

                                <p>
                                    ${escapeHTML(
                                        goal.description
                                    )}
                                </p>

                            </div>


                            <strong class="goal-percentage">

                                ${goal.progress}%

                            </strong>

                        </div>


                        <div class="goal-progress">

                            <div class="goal-progress-track">

                                <div
                                    class="goal-progress-fill"
                                    style="width: ${goal.progress}%"
                                ></div>

                            </div>


                            <div class="goal-progress-info">

                                <span>
                                    ${escapeHTML(
                                        goal.remaining
                                    )}
                                </span>

                                <span>
                                    ${escapeHTML(
                                        goal.deadline
                                    )}
                                </span>

                            </div>

                        </div>

                    </div>


                    <button
                        class="goal-menu"
                        aria-label="Goal options"
                        data-goal-menu="${escapeHTML(
                            goal.id
                        )}"
                    >

                        <i class="fa-solid fa-ellipsis"></i>

                    </button>

                `;


                goalsList.appendChild(
                    card
                );

            }
        );

    }


    /* =====================================================
       17. GOAL MENU
    ===================================================== */

    goalsList?.addEventListener(
        "click",
        event => {

            const menu =
                event.target.closest(
                    ".goal-menu"
                );


            if (!menu) return;


            const goalId =
                menu.dataset.goalMenu;


            const goal =
                goals.find(
                    item =>
                        item.id === goalId
                );


            if (!goal) return;


            showGoalActions(
                goal
            );

        }
    );


    /* =====================================================
       18. GOAL ACTIONS
    ===================================================== */

    function showGoalActions(goal) {

        const action =
            prompt(
                `Goal: ${goal.name}\n\n` +
                `Type one of:\n` +
                `1 - Update Progress\n` +
                `2 - Complete Goal\n` +
                `3 - Delete Goal`,
                "1"
            );


        if (action === null) return;


        if (action === "1") {

            updateGoalProgress(
                goal
            );

        }


        else if (action === "2") {

            completeGoal(
                goal
            );

        }


        else if (action === "3") {

            deleteGoal(
                goal
            );

        }


        else {

            showToast(
                "Please choose 1, 2, or 3."
            );

        }

    }


    /* =====================================================
       19. UPDATE GOAL PROGRESS
    ===================================================== */

    function updateGoalProgress(goal) {

        const value =
            prompt(
                `Enter progress percentage for "${goal.name}" (0-100):`,
                goal.progress
            );


        if (value === null) return;


        const progress =
            Number(value);


        if (
            Number.isNaN(progress) ||
            progress < 0 ||
            progress > 100
        ) {

            showToast(
                "Enter a percentage between 0 and 100."
            );

            return;

        }


        goal.progress =
            Math.round(progress);


        if (
            goal.progress >= 100
        ) {

            completeGoal(
                goal
            );

            return;

        }


        saveGoals();

        renderGoals();

        updateGoalSummary();


        showToast(
            "Goal progress updated."
        );

    }


    /* =====================================================
       20. COMPLETE GOAL
    ===================================================== */

    function completeGoal(goal) {

        const confirmed =
            confirm(
                `Mark "${goal.name}" as completed?`
            );


        if (!confirmed) return;


        const index =
            goals.findIndex(
                item =>
                    item.id === goal.id
            );


        if (index === -1) return;


        goals.splice(
            index,
            1
        );


        completedGoals.push({

            id:
                goal.id,

            name:
                goal.name,

            description:
                goal.description,

            date:
                new Date()
                    .toLocaleDateString(
                        "en-IN",
                        {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                        }
                    )

        });


        saveGoals();

        saveCompletedGoals();

        renderGoals();

        renderCompletedGoals();

        updateGoalSummary();


        showToast(
            "Goal completed! 🏆"
        );

    }


    /* =====================================================
       21. DELETE GOAL
    ===================================================== */

    function deleteGoal(goal) {

        const confirmed =
            confirm(
                `Delete "${goal.name}"?`
            );


        if (!confirmed) return;


        goals =
            goals.filter(
                item =>
                    item.id !== goal.id
            );


        saveGoals();

        renderGoals();

        updateGoalSummary();


        showToast(
            "Goal deleted."
        );

    }


    /* =====================================================
       22. RENDER COMPLETED GOALS
    ===================================================== */

    function renderCompletedGoals() {

        if (!completedGoalsSection)
            return;


        const existingCards =
            completedGoalsSection
                .querySelectorAll(
                    ".completed-goal-card"
                );


        existingCards.forEach(
            card =>
                card.remove()
        );


        if (
            completedGoals.length === 0
        ) {

            const empty =
                document.createElement(
                    "div"
                );


            empty.className =
                "goals-empty";


            empty.innerHTML = `

                <div>

                    <i class="fa-solid fa-trophy"></i>

                    <strong>
                        No completed goals yet
                    </strong>

                    <p>
                        Keep working and your
                        first achievement is coming.
                    </p>

                </div>

            `;


            completedGoalsSection
                .appendChild(
                    empty
                );


            return;

        }


        completedGoals.forEach(
            goal => {

                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "completed-goal-card";


                card.dataset.goalId =
                    goal.id;


                card.innerHTML = `

                    <div class="completed-goal-icon">

                        <i class="fa-solid fa-trophy"></i>

                    </div>


                    <div class="completed-goal-content">

                        <span>
                            COMPLETED
                        </span>

                        <h3>
                            ${escapeHTML(
                                goal.name
                            )}
                        </h3>

                        <p>
                            ${escapeHTML(
                                goal.description
                            )}
                        </p>

                    </div>


                    <div class="completed-goal-date">

                        <span>
                            COMPLETED
                        </span>

                        <strong>
                            ${escapeHTML(
                                goal.date
                            )}
                        </strong>

                    </div>

                `;


                completedGoalsSection
                    .appendChild(
                        card
                    );

            }
        );

    }


    /* =====================================================
       23. UPDATE GOAL SUMMARY
    ===================================================== */

    function updateGoalSummary() {

        const active =
            goals.length;


        const completed =
            completedGoals.length;


        const average =
            active > 0

                ? Math.round(
                    goals.reduce(
                        (
                            total,
                            goal
                        ) =>
                            total +
                            Number(
                                goal.progress
                            ),
                        0
                    ) / active
                )

                : 0;


        if (activeGoalsElement) {

            activeGoalsElement.textContent =
                active;

        }


        if (completedGoalsElement) {

            completedGoalsElement.textContent =
                completed;

        }


        if (monthlyProgressElement) {

            monthlyProgressElement.textContent =
                `${average}%`;

        }


        if (goalCountElement) {

            goalCountElement.textContent =
                `${active} ${
                    active === 1
                        ? "Active Goal"
                        : "Active Goals"
                }`;

        }

    }


    /* =====================================================
       24. MOBILE SIDEBAR
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
        ?.querySelectorAll(".nav-item")
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        sidebar
                            .classList
                            .remove(
                                "open"
                            );

                    }
                );

            }
        );


    /* =====================================================
       25. NOTIFICATIONS
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
       26. LOGOUT
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
       27. TOAST
    ===================================================== */

    function showToast(message) {

        document
            .querySelector(
                ".goals-toast"
            )
            ?.remove();


        const toast =
            document.createElement(
                "div"
            );


        toast.className =
            "goals-toast";


        toast.innerHTML = `

            <i class="fa-solid fa-check"></i>

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
                border:
                    "1px solid rgba(0,229,255,.18)",
                borderRadius: "9px",
                boxShadow:
                    "0 12px 30px rgba(0,0,0,.3)",
                fontFamily:
                    "Poppins, sans-serif",
                fontSize: "9px",
                fontWeight: "600",
                transition:
                    "opacity .2s ease"
            }
        );


        toast.querySelector("i").style.color =
            "var(--cyan)";


        document.body.appendChild(
            toast
        );


        setTimeout(
            () => {

                toast.style.opacity =
                    "0";


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
       28. HTML ESCAPE
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
       29. INITIALIZE
    ===================================================== */

    renderGoals();

    renderCompletedGoals();

    updateGoalSummary();

});