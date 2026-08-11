/* =========================================================
   FITZONE MEMBER DASHBOARD
   Frontend Demo Logic
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. ELEMENTS
    ===================================================== */

    const welcomeHeading =
        document.querySelector(".welcome-section h1");

    const welcomeText =
        document.querySelector(".welcome-text");

    const dashboardDate =
        document.querySelector(".dashboard-date");

    const dashboardDateText =
        dashboardDate?.querySelector("span");

    const streakValue =
        document.querySelector(".streak-card .stat-info strong");

    const weeklyWorkoutValue =
        document.querySelectorAll(
            ".stat-card .stat-info strong"
        )[2];

    const attendanceValue =
        document.querySelectorAll(
            ".stat-card .stat-info strong"
        )[3];

    const progressValue =
        document.querySelector(".progress-value");

    const goalInfo =
        document.querySelector(".goal-info strong");

    const goalDescription =
        document.querySelector(".goal-info p");

    const goalStats =
        document.querySelectorAll(".goal-stats strong");

    const streakCount =
        document.querySelector(".streak-count");

    const streakDays =
        document.querySelector(".streak-days");

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const sidebar =
        document.querySelector(".sidebar");

    const notificationBtn =
        document.getElementById("notificationBtn");

    const logoutBtn =
        document.getElementById("logoutBtn");


    /* =====================================================
       02. MEMBER DATA
    ===================================================== */

    const memberName =
        localStorage.getItem("memberName") || "Abhay";


    /* =====================================================
       03. DEMO FITNESS DATA
       
       This is temporary frontend data.
       Later backend data will replace this.
    ===================================================== */

    const WEEKLY_TARGET = 5;

    const defaultWorkoutHistory = {
        workouts: []
    };


    let fitnessData =
        JSON.parse(
            localStorage.getItem(
                "fitzoneMemberFitness"
            )
        ) || defaultWorkoutHistory;


    /* =====================================================
       04. DEMO WORKOUT HISTORY
       
       If there is no saved data yet, create a small
       realistic demo history.
    ===================================================== */

    if (
        !Array.isArray(fitnessData.workouts) ||
        fitnessData.workouts.length === 0
    ) {

        fitnessData.workouts =
            createDemoWorkoutHistory();

        saveFitnessData();

    }


    /* =====================================================
       05. CREATE DEMO HISTORY
    ===================================================== */

    function createDemoWorkoutHistory() {

        const today =
            new Date();

        const history = [];


        /*
         * Previous days are marked completed
         * so the dashboard initially looks alive.
         *
         * Today is intentionally not automatically
         * completed.
         */

        for (let i = 1; i <= 4; i++) {

            const date =
                new Date(today);

            date.setDate(
                today.getDate() - i
            );

            history.push(
                formatDateKey(date)
            );

        }


        return history;

    }


    /* =====================================================
       06. SAVE FITNESS DATA
    ===================================================== */

    function saveFitnessData() {

        localStorage.setItem(
            "fitzoneMemberFitness",
            JSON.stringify(fitnessData)
        );

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
       08. DYNAMIC GREETING
    ===================================================== */

    function updateGreeting() {

        const hour =
            new Date().getHours();


        let greeting;

        let emoji;


        if (hour < 12) {

            greeting = "Good Morning";

            emoji = "🌅";

        } else if (hour < 17) {

            greeting = "Good Afternoon";

            emoji = "☀️";

        } else {

            greeting = "Good Evening";

            emoji = "🌙";

        }


        if (welcomeHeading) {

            welcomeHeading.innerHTML = `
                ${greeting},
                <span>${escapeHTML(memberName)}</span>
                ${emoji}
            `;

        }


        if (welcomeText) {

            welcomeText.textContent =
                "Ready to keep your streak alive? Let's make today count.";

        }

    }


    /* =====================================================
       09. WEEK START
       
       Monday = first day
       Sunday = last day
    ===================================================== */

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
            result.getDate() + difference
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
       10. FORMAT DATE KEY
    ===================================================== */

    function formatDateKey(date) {

        const year =
            date.getFullYear();

        const month =
            String(
                date.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                date.getDate()
            ).padStart(2, "0");


        return `${year}-${month}-${day}`;

    }


    /* =====================================================
       11. GET WEEK DAYS
    ===================================================== */

    function getCurrentWeek() {

        const today =
            new Date();

        const monday =
            getMonday(today);


        const days = [];


        for (let i = 0; i < 7; i++) {

            const date =
                new Date(monday);

            date.setDate(
                monday.getDate() + i
            );


            days.push(date);

        }


        return days;

    }


    /* =====================================================
       12. UPDATE STREAK DAYS
    ===================================================== */

    function updateStreakDays() {

        if (!streakDays) return;


        const week =
            getCurrentWeek();

        const today =
            new Date();


        const todayKey =
            formatDateKey(today);


        const dayNames =
            [
                "MON",
                "TUE",
                "WED",
                "THU",
                "FRI",
                "SAT",
                "SUN"
            ];


        streakDays.innerHTML = "";


        week.forEach(
            (date, index) => {

                const dateKey =
                    formatDateKey(date);


                const completed =
                    fitnessData.workouts.includes(
                        dateKey
                    );


                const isToday =
                    dateKey === todayKey;


                const day =
                    document.createElement(
                        "div"
                    );


                day.className = "day";


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


                /*
                 * If today is completed,
                 * show the check instead of lightning.
                 */

                const icon =
                    isToday && !completed
                        ? "fa-bolt"
                        : completed
                            ? "fa-check"
                            : "fa-minus";


                day.innerHTML = `

                    <span>
                        ${dayNames[index]}
                    </span>

                    <i class="fa-solid ${icon}"></i>

                `;


                /*
                 * Clicking today's day allows
                 * us to demo a completed workout.
                 */

                if (isToday) {

                    day.style.cursor =
                        "pointer";

                    day.title =
                        completed
                            ? "Workout completed today"
                            : "Click to complete today's workout";


                    day.addEventListener(
                        "click",
                        toggleTodayWorkout
                    );

                }


                streakDays.appendChild(
                    day
                );

            }
        );


        updateStreakStats();

    }


    /* =====================================================
       13. TOGGLE TODAY'S WORKOUT
    ===================================================== */

    function toggleTodayWorkout() {

        const todayKey =
            formatDateKey(
                new Date()
            );


        const index =
            fitnessData.workouts.indexOf(
                todayKey
            );


        if (index === -1) {

            fitnessData.workouts.push(
                todayKey
            );

            showToast(
                "Today's workout completed! 🔥"
            );

        } else {

            fitnessData.workouts.splice(
                index,
                1
            );

            showToast(
                "Today's workout marked incomplete."
            );

        }


        saveFitnessData();

        updateStreakDays();

        updateWeeklyProgress();

    }


    /* =====================================================
       14. CALCULATE CURRENT STREAK
    ===================================================== */

    function calculateCurrentStreak() {

        const workouts =
            new Set(
                fitnessData.workouts
            );


        let streak = 0;


        const today =
            new Date();


        /*
         * If today isn't completed yet,
         * start checking from yesterday.
         */

        let currentDate =
            new Date(today);


        if (
            !workouts.has(
                formatDateKey(currentDate)
            )
        ) {

            currentDate.setDate(
                currentDate.getDate() - 1
            );

        }


        while (
            workouts.has(
                formatDateKey(currentDate)
            )
        ) {

            streak++;

            currentDate.setDate(
                currentDate.getDate() - 1
            );

        }


        return streak;

    }


    /* =====================================================
       15. UPDATE STREAK STAT
    ===================================================== */

    function updateStreakStats() {

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
                    streak === 1 ? "" : "S"
                } STREAK`;

        }

    }


    /* =====================================================
       16. GET WEEKLY COMPLETED WORKOUTS
    ===================================================== */

    function getWeeklyWorkoutCount() {

        const week =
            getCurrentWeek();


        const weekKeys =
            week.map(
                formatDateKey
            );


        return fitnessData.workouts
            .filter(
                date =>
                    weekKeys.includes(date)
            )
            .length;

    }


    /* =====================================================
       17. UPDATE WEEKLY PROGRESS
    ===================================================== */

    function updateWeeklyProgress() {

        const completed =
            Math.min(
                getWeeklyWorkoutCount(),
                WEEKLY_TARGET
            );


        const percentage =
            Math.round(
                (completed / WEEKLY_TARGET) * 100
            );


        /* -------------------------------
           Stat Card
        -------------------------------- */

        if (weeklyWorkoutValue) {

            weeklyWorkoutValue.innerHTML = `
                ${completed}
                <small>/ ${WEEKLY_TARGET}</small>
            `;

        }


        /* -------------------------------
           Circle Percentage
        -------------------------------- */

        if (progressValue) {

            progressValue.textContent =
                `${percentage}%`;

        }


        /* -------------------------------
           Circle Progress
        -------------------------------- */

        const progressCircle =
            document.querySelector(
                ".progress-circle"
            );


        if (progressCircle) {

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


        /* -------------------------------
           Goal Text
        -------------------------------- */

        if (goalInfo) {

            goalInfo.textContent =
                `${completed} of ${WEEKLY_TARGET} workouts completed`;

        }


        if (goalDescription) {

            if (
                completed >= WEEKLY_TARGET
            ) {

                goalDescription.textContent =
                    "Weekly workout goal completed. Amazing consistency!";

            } else {

                const remaining =
                    WEEKLY_TARGET - completed;


                goalDescription.textContent =
                    `Complete ${remaining} more ${
                        remaining === 1
                            ? "workout"
                            : "workouts"
                    } to reach your weekly goal.`;

            }

        }


        /* -------------------------------
           Goal Stats
        -------------------------------- */

        if (goalStats.length >= 2) {

            goalStats[0].textContent =
                completed;

            goalStats[1].textContent =
                WEEKLY_TARGET;

        }

    }


    /* =====================================================
       18. ATTENDANCE DEMO
    ===================================================== */

    function updateAttendance() {

        /*
         * Temporary frontend value.
         *
         * Later this will come from the backend.
         */

        const attendanceDays =
            18;


        if (attendanceValue) {

            attendanceValue.innerHTML = `
                ${attendanceDays}
                <small>days</small>
            `;

        }

    }


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


    /* =====================================================
       20. CLOSE SIDEBAR AFTER NAVIGATION
    ===================================================== */

    sidebar
        ?.querySelectorAll(".nav-item")
        .forEach(link => {

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
       21. NOTIFICATION
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
       22. LOGOUT
    ===================================================== */

    logoutBtn?.addEventListener(
        "click",
        () => {

            const confirmed =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmed) return;


            localStorage.removeItem(
                "fitzoneMemberFitness"
            );


            window.location.href =
                "../auth/member-login.html";

        }
    );


    /* =====================================================
       23. TOAST MESSAGE
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
       24. HTML ESCAPE
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
       25. INITIALIZE DASHBOARD
    ===================================================== */

    updateCurrentDate();

    updateGreeting();

    updateStreakDays();

    updateWeeklyProgress();

    updateAttendance();

});