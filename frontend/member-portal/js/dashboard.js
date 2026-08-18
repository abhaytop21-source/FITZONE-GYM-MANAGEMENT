/* =========================================================
   FITZONE MEMBER DASHBOARD
   REAL BACKEND DATA
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const API_BASE_URL = "http://localhost:5000";


    /* =====================================================
       01. ELEMENTS
    ===================================================== */

    const greetingText =
        document.getElementById("greetingText");

    const welcomeMemberName =
        document.getElementById("welcomeMemberName");

    const welcomeText =
        document.querySelector(".welcome-text");

    const dashboardDate =
        document.querySelector(".dashboard-date");

    const dashboardDateText =
        dashboardDate?.querySelector("span");


    const streakValue =
        document.querySelector(
            ".streak-card .stat-info strong"
        );


    const statValues =
        document.querySelectorAll(
            ".stats-grid .stat-card .stat-info strong"
        );


    const weeklyWorkoutValue =
        statValues[2];


    const attendanceValue =
        statValues[3];


    const progressValue =
        document.querySelector(
            ".progress-value"
        );


    const goalInfo =
        document.querySelector(
            ".goal-info strong"
        );


    const goalDescription =
        document.querySelector(
            ".goal-info p"
        );


    const goalStats =
        document.querySelectorAll(
            ".goal-stats strong"
        );


    const streakCount =
        document.querySelector(
            ".streak-count"
        );


    const streakDays =
        document.querySelector(
            ".streak-days"
        );


    const workoutCard =
        document.querySelector(
            ".workout-card"
        );


    const workoutTitle =
        document.querySelector(
            ".workout-card h2"
        );


    const workoutStatus =
        document.querySelector(
            ".workout-status"
        );


    const workoutMeta =
        document.querySelector(
            ".workout-meta"
        );


    const exercisePreview =
        document.querySelector(
            ".exercise-preview"
        );


    const mobileMenuBtn =
        document.getElementById(
            "mobileMenuBtn"
        );


    const sidebar =
        document.querySelector(
            ".sidebar"
        );


    const notificationBtn =
        document.getElementById(
            "notificationBtn"
        );


    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );


    const userName =
        document.querySelector(
            ".user-info strong"
        );


    const userAvatar =
        document.querySelector(
            ".user-avatar"
        );


    /* =====================================================
       02. REAL MEMBER DATA
    ===================================================== */

    let dashboardData = null;

    let memberName = "Member";


    /* =====================================================
       03. LOAD MEMBER DASHBOARD
    ===================================================== */

    async function loadMemberDashboard() {

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
                    "Unable to load dashboard."
                );

            }


            dashboardData =
                result.data;


            console.log(
                "Real member dashboard data:",
                dashboardData
            );


            renderDashboard();


        } catch (error) {

            console.error(
                "Failed to load member dashboard:",
                error
            );


            showToast(
                "Unable to load dashboard data."
            );

        }

    }


    /* =====================================================
       04. RENDER EVERYTHING
    ===================================================== */

    function renderDashboard() {

        if (!dashboardData) {
            return;
        }


        renderMember();


        renderGreeting();


        renderWeight();


        renderWeeklyWorkouts();


        renderStreak();


        renderAttendance();


        renderTodayWorkout();


        renderWeeklyGoal();

    }


    /* =====================================================
       05. MEMBER INFORMATION
    ===================================================== */

    function renderMember() {

        const profile =
            dashboardData.profile;


        memberName =
            profile?.fullName ||
            "Member";


        if (welcomeMemberName) {

            welcomeMemberName.textContent =
                memberName;

        }


        if (userName) {

            userName.textContent =
                memberName;

        }


        if (userAvatar) {

            userAvatar.textContent =
                memberName
                    .trim()
                    .charAt(0)
                    .toUpperCase();

        }

    }


    /* =====================================================
       06. GREETING
    ===================================================== */

    function renderGreeting() {

        const hour =
            new Date().getHours();


        let greeting;


        if (hour < 12) {

            greeting =
                "Good Morning";

        } else if (hour < 17) {

            greeting =
                "Good Afternoon";

        } else {

            greeting =
                "Good Evening";

        }


        if (greetingText) {

            greetingText.textContent =
                greeting;

        }


        if (welcomeMemberName) {

            welcomeMemberName.textContent =
                memberName;

        }


        if (welcomeText) {

            welcomeText.textContent =
                "Ready to keep your streak alive? Let's make today count.";

        }

    }


    /* =====================================================
       07. CURRENT DATE
    ===================================================== */

    function updateCurrentDate() {

        const today =
            new Date();


        if (dashboardDateText) {

            dashboardDateText.textContent =
                today.toLocaleDateString(
                    "en-IN",
                    {
                        weekday: "long",
                        month: "long",
                        day: "numeric"
                    }
                );

        }

    }


    /* =====================================================
       08. CURRENT WEIGHT
    ===================================================== */

    function renderWeight() {

        const weight =
            dashboardData.profile?.weight;


        const weightCard =
            statValues[1];


        if (!weightCard) {
            return;
        }


        if (
            weight === null ||
            weight === undefined ||
            weight === ""
        ) {

            weightCard.innerHTML = `
                -- <small>kg</small>
            `;

            return;

        }


        weightCard.innerHTML = `
            ${escapeHTML(weight)}
            <small>kg</small>
        `;

    }


    /* =====================================================
       09. WORKOUT SESSION HELPERS
    ===================================================== */

    function getSessions() {

        const sessions =
            dashboardData.recentSessions;


        if (!Array.isArray(sessions)) {

            return [];

        }


        return sessions;

    }


    function isCompletedSession(session) {

        if (!session) {
            return false;
        }


        if (!session.status) {

            return true;

        }


        return String(
            session.status
        ).toUpperCase() === "COMPLETED";

    }


    function getSessionDate(session) {

        const value =
            session?.sessionDate;


        if (!value) {
            return null;
        }


        const date =
            new Date(value);


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return null;

        }


        return date;

    }


    function isSameDay(
        dateA,
        dateB
    ) {

        return (
            dateA.getFullYear() ===
                dateB.getFullYear() &&

            dateA.getMonth() ===
                dateB.getMonth() &&

            dateA.getDate() ===
                dateB.getDate()
        );

    }


    function getMonday(date) {

        const result =
            new Date(date);


        const day =
            result.getDay();


        const difference =
            day === 0
                ? -6
                : 1 - day;


        result.setDate(
            result.getDate() +
            difference
        );


        result.setHours(
            0,
            0,
            0,
            0
        );


        return result;

    }


    /* =====================================================
       10. WEEKLY WORKOUTS
    ===================================================== */

    function getWeeklyWorkoutCount() {

        const today =
            new Date();


        const monday =
            getMonday(today);


        const sessions =
            getSessions();


        return sessions.filter(
            session => {

                const sessionDate =
                    getSessionDate(
                        session
                    );


                if (!sessionDate) {
                    return false;
                }


                return (
                    isCompletedSession(
                        session
                    ) &&

                    sessionDate >=
                        monday &&

                    sessionDate <=
                        today
                );

            }
        ).length;

    }


    function getWeeklyTarget() {

        const frequency =
            dashboardData.profile
                ?.trainingFrequency;


        if (!frequency) {

            return 0;

        }


        const match =
            String(frequency)
                .match(/\d+/);


        return match
            ? Number(match[0])
            : 0;

    }


    function renderWeeklyWorkouts() {

        const completed =
            getWeeklyWorkoutCount();


        const target =
            getWeeklyTarget();


        if (weeklyWorkoutValue) {

            if (target > 0) {

                weeklyWorkoutValue.innerHTML = `
                    ${completed}
                    <small>/ ${target}</small>
                `;

            } else {

                weeklyWorkoutValue.innerHTML = `
                    ${completed}
                    <small>this week</small>
                `;

            }

        }


        const weeklyCard =
            weeklyWorkoutValue
                ?.closest(".stat-card");


        const description =
            weeklyCard
                ?.querySelector("p");


        if (!description) {
            return;
        }


        if (target <= 0) {

            description.textContent =
                "Training target not set.";

            return;

        }


        const remaining =
            Math.max(
                target - completed,
                0
            );


        if (remaining === 0) {

            description.textContent =
                "Weekly target completed! 🔥";

        } else if (remaining === 1) {

            description.textContent =
                "One more to go";

        } else {

            description.textContent =
                `${remaining} more to go`;

        }

    }


    /* =====================================================
       11. CURRENT STREAK
    ===================================================== */

    function calculateCurrentStreak() {

        const sessions =
            getSessions()
                .filter(
                    isCompletedSession
                );


        const completedDates =
            new Set();


        sessions.forEach(
            session => {

                const date =
                    getSessionDate(
                        session
                    );


                if (!date) {
                    return;
                }


                completedDates.add(
                    date.toDateString()
                );

            }
        );


        let currentDate =
            new Date();


        if (
            !completedDates.has(
                currentDate.toDateString()
            )
        ) {

            currentDate.setDate(
                currentDate.getDate() - 1
            );

        }


        let streak = 0;


        while (
            completedDates.has(
                currentDate.toDateString()
            )
        ) {

            streak++;


            currentDate.setDate(
                currentDate.getDate() - 1
            );

        }


        return streak;

    }


    function renderStreak() {

        const streak =
            calculateCurrentStreak();


        if (streakValue) {

            streakValue.innerHTML = `
                ${streak}
                <small>days</small>
            `;

        }


        if (streakCount) {

            streakCount.textContent =
                `${streak} DAY${
                    streak === 1
                        ? ""
                        : "S"
                } STREAK`;

        }


        renderStreakDays();

    }


    /* =====================================================
       12. STREAK WEEK
    ===================================================== */

    function renderStreakDays() {

        if (!streakDays) {
            return;
        }


        const monday =
            getMonday(
                new Date()
            );


        const today =
            new Date();


        const sessions =
            getSessions()
                .filter(
                    isCompletedSession
                );


        const completedDates =
            new Set();


        sessions.forEach(
            session => {

                const date =
                    getSessionDate(
                        session
                    );


                if (date) {

                    completedDates.add(
                        date.toDateString()
                    );

                }

            }
        );


        const dayNames = [
            "MON",
            "TUE",
            "WED",
            "THU",
            "FRI",
            "SAT",
            "SUN"
        ];


        streakDays.innerHTML = "";


        for (
            let index = 0;
            index < 7;
            index++
        ) {

            const date =
                new Date(monday);


            date.setDate(
                monday.getDate() +
                index
            );


            const completed =
                completedDates.has(
                    date.toDateString()
                );


            const isToday =
                isSameDay(
                    date,
                    today
                );


            const day =
                document.createElement(
                    "div"
                );


            day.className =
                "day";


            if (completed) {

                day.classList.add(
                    "completed"
                );

            }


            if (isToday) {

                day.classList.add(
                    "today"
                );

            }


            const icon =
                completed
                    ? "fa-check"
                    : isToday
                        ? "fa-bolt"
                        : "fa-minus";


            day.innerHTML = `
                <span>
                    ${dayNames[index]}
                </span>

                <i class="fa-solid ${icon}"></i>
            `;


            streakDays.appendChild(
                day
            );

        }

    }


    /* =====================================================
       13. ATTENDANCE
    ===================================================== */

    function renderAttendance() {

        /*
         * We currently do not have a dedicated
         * gym check-in Attendance model/API.
         *
         * Do NOT display fake data.
         */

        if (!attendanceValue) {
            return;
        }


        attendanceValue.innerHTML = `
            -- <small>days</small>
        `;


        const attendanceCard =
            attendanceValue.closest(
                ".stat-card"
            );


        const description =
            attendanceCard
                ?.querySelector("p");


        if (description) {

            description.textContent =
                "Attendance data will appear here.";

        }

    }


    /* =====================================================
       14. TODAY'S WORKOUT
    ===================================================== */

    function renderTodayWorkout() {

        const plan =
            dashboardData.workoutPlan;


        if (!workoutCard) {
            return;
        }


        if (!plan) {

            if (workoutTitle) {

                workoutTitle.textContent =
                    "No workout assigned";

            }


            if (workoutStatus) {

                workoutStatus.textContent =
                    "NOT ASSIGNED";

            }


            if (workoutMeta) {

                workoutMeta.innerHTML = `
                    <span>
                        <i class="fa-solid fa-circle-info"></i>
                        No active workout plan
                    </span>
                `;

            }


            if (exercisePreview) {

                exercisePreview.innerHTML = `
                    <div class="exercise-item">
                        <span class="exercise-number">
                            —
                        </span>

                        <div>
                            <strong>
                                No exercises available
                            </strong>

                            <span>
                                Your gym has not assigned a workout plan yet.
                            </span>
                        </div>
                    </div>
                `;

            }


            return;

        }


        if (workoutTitle) {

            workoutTitle.textContent =
                plan.name ||
                "Today's Workout";

        }


        if (workoutStatus) {

            workoutStatus.textContent =
                plan.status ||
                "READY";

        }


        const exercises =
            Array.isArray(
                plan.exercises
            )
                ? plan.exercises
                : [];


        if (workoutMeta) {

            workoutMeta.innerHTML = `
                <span>
                    <i class="fa-solid fa-list-check"></i>
                    ${exercises.length} Exercises
                </span>

                <span>
                    <i class="fa-solid fa-dumbbell"></i>
                    ${escapeHTML(
                        plan.goal ||
                        dashboardData.profile
                            ?.fitnessGoal ||
                        "General Fitness"
                    )}
                </span>
            `;

        }


        if (!exercisePreview) {
            return;
        }


        if (exercises.length === 0) {

            exercisePreview.innerHTML = `
                <div class="exercise-item">
                    <span class="exercise-number">
                        —
                    </span>

                    <div>
                        <strong>
                            No exercises assigned
                        </strong>

                        <span>
                            Your workout plan has no exercises yet.
                        </span>
                    </div>
                </div>
            `;

            return;

        }


        exercisePreview.innerHTML =
            exercises
                .slice(0, 3)
                .map(
                    (
                        item,
                        index
                    ) => {

                        const exercise =
                            item.exercise ||
                            {};


                        const exerciseName =
                            exercise.name ||
                            item.name ||
                            "Exercise";


                        const sets =
                            item.sets ??
                            exercise.sets;


                        const reps =
                            item.reps ??
                            exercise.reps;


                        let details =
                            "";


                        if (
                            sets !== undefined &&
                            reps !== undefined
                        ) {

                            details =
                                `${sets} sets × ${reps} reps`;

                        } else if (
                            sets !== undefined
                        ) {

                            details =
                                `${sets} sets`;

                        } else {

                            details =
                                "Exercise assigned";

                        }


                        return `
                            <div class="exercise-item">

                                <span class="exercise-number">
                                    ${String(
                                        index + 1
                                    ).padStart(2, "0")}
                                </span>

                                <div>

                                    <strong>
                                        ${escapeHTML(
                                            exerciseName
                                        )}
                                    </strong>

                                    <span>
                                        ${escapeHTML(
                                            details
                                        )}
                                    </span>

                                </div>

                            </div>
                        `;

                    }
                )
                .join("");

    }


    /* =====================================================
       15. WEEKLY GOAL
    ===================================================== */

    function renderWeeklyGoal() {

        const completed =
            getWeeklyWorkoutCount();


        const target =
            getWeeklyTarget();


        if (target <= 0) {

            if (progressValue) {

                progressValue.textContent =
                    "0%";

            }


            updateProgressCircle(
                0
            );


            if (goalInfo) {

                goalInfo.textContent =
                    "Weekly target not set";

            }


            if (goalDescription) {

                goalDescription.textContent =
                    "Set your training frequency in your profile.";

            }


            if (goalStats.length >= 2) {

                goalStats[0].textContent =
                    completed;

                goalStats[1].textContent =
                    "--";

            }


            return;

        }


        const safeCompleted =
            Math.min(
                completed,
                target
            );


        const percentage =
            Math.round(
                (
                    safeCompleted /
                    target
                ) * 100
            );


        if (progressValue) {

            progressValue.textContent =
                `${percentage}%`;

        }


        updateProgressCircle(
            percentage
        );


        if (goalInfo) {

            goalInfo.textContent =
                `${safeCompleted} of ${target} workouts completed`;

        }


        if (goalDescription) {

            const remaining =
                Math.max(
                    target -
                    safeCompleted,
                    0
                );


            if (remaining === 0) {

                goalDescription.textContent =
                    "Weekly workout goal completed. Amazing consistency!";

            } else {

                goalDescription.textContent =
                    `Complete ${remaining} more ${
                        remaining === 1
                            ? "workout"
                            : "workouts"
                    } to reach your weekly goal.`;

            }

        }


        if (goalStats.length >= 2) {

            goalStats[0].textContent =
                safeCompleted;

            goalStats[1].textContent =
                target;

        }

    }


    /* =====================================================
       16. PROGRESS CIRCLE
    ===================================================== */

    function updateProgressCircle(
        percentage
    ) {

        const progressCircle =
            document.querySelector(
                ".progress-circle"
            );


        if (!progressCircle) {
            return;
        }


        const degrees =
            percentage * 3.6;


        progressCircle.style.background = `
            radial-gradient(
                circle,
                var(--surface) 57%,
                transparent 58%
            ),
            conic-gradient(
                var(--cyan) 0deg ${degrees}deg,
                rgba(255, 255, 255, 0.06)
                ${degrees}deg 360deg
            )
        `;

    }


    /* =====================================================
       17. MOBILE SIDEBAR
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
       18. NOTIFICATIONS
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
       19. LOGOUT
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
       20. TOAST
    ===================================================== */

    function showToast(message) {

        const existing =
            document.querySelector(
                ".dashboard-toast"
            );


        existing?.remove();


        const toast =
            document.createElement(
                "div"
            );


        toast.className =
            "dashboard-toast";


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
       21. HTML ESCAPE
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
       22. INITIALIZE
    ===================================================== */

    updateCurrentDate();

    loadMemberDashboard();

});