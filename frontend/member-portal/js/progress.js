/* =========================================================
   FITZONE MEMBER PROGRESS
   Frontend Demo Logic
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. ELEMENTS
    ===================================================== */

    const progressDate =
        document.getElementById("progressDate");

    const currentWeight =
        document.getElementById("currentWeight");

    const weightChange =
        document.getElementById("weightChange");

    const totalWorkouts =
        document.getElementById("totalWorkouts");

    const currentStreak =
        document.getElementById("currentStreak");

    const attendanceDays =
        document.getElementById("attendanceDays");

    const chartXAxis =
        document.getElementById("chartXAxis");

    const chartPoints =
        document.querySelectorAll(".chart-point");

    const timeRange =
        document.getElementById("timeRange");

    const editMeasurementsBtn =
        document.getElementById("editMeasurementsBtn");

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const sidebar =
        document.querySelector(".sidebar");

    const notificationBtn =
        document.getElementById("notificationBtn");

    const logoutBtn =
        document.getElementById("logoutBtn");


    /* =====================================================
       02. DEMO PROGRESS DATA
    ===================================================== */

    const defaultProgress = {

        currentWeight: 68.5,

        startingWeight: 70.0,

        attendance: 18,

        workouts: 18,

        measurements: {

            chest: 38,

            waist: 31,

            arms: 14,

            thighs: 22

        },

        strength: {

            bench: 60,

            squat: 80,

            deadlift: 90

        },

        history: {

            "1m": [
                71.0,
                70.5,
                70.0,
                69.4,
                68.5
            ],

            "3m": [
                73.0,
                72.5,
                71.8,
                71.0,
                70.5,
                70.0,
                69.4,
                68.5
            ],

            "6m": [
                76.0,
                75.2,
                74.0,
                73.0,
                72.5,
                71.8,
                71.0,
                70.5,
                70.0,
                69.4,
                68.5
            ],

            "1y": [
                80.0,
                78.5,
                77.0,
                76.0,
                75.2,
                74.0,
                73.0,
                72.5,
                71.8,
                71.0,
                70.5,
                70.0,
                69.4,
                68.5
            ]

        }

    };


    let progressData =
        JSON.parse(
            localStorage.getItem(
                "fitzoneProgress"
            )
        ) || defaultProgress;


    /* =====================================================
       03. SAVE DATA
    ===================================================== */

    function saveProgress() {

        localStorage.setItem(
            "fitzoneProgress",
            JSON.stringify(progressData)
        );

    }


    /* =====================================================
       04. CURRENT DATE
    ===================================================== */

    function updateDate() {

        if (!progressDate) return;


        const today =
            new Date();


        progressDate.textContent =
            today.toLocaleDateString(
                "en-IN",
                {
                    weekday: "long",
                    month: "long",
                    day: "numeric"
                }
            );

    }


    /* =====================================================
       05. CALCULATE CHANGE
    ===================================================== */

    function getWeightChange() {

        return (
            progressData.currentWeight -
            progressData.startingWeight
        );

    }


    /* =====================================================
       06. GET STREAK FROM DASHBOARD DATA
    ===================================================== */

    function getCurrentStreak() {

        const dashboardData =
            JSON.parse(
                localStorage.getItem(
                    "fitzoneMemberFitness"
                )
            );


        if (
            !dashboardData ||
            !Array.isArray(
                dashboardData.workouts
            )
        ) {

            return 0;

        }


        const workouts =
            new Set(
                dashboardData.workouts
            );


        let streak = 0;


        const today =
            new Date();


        let date =
            new Date(today);


        if (
            !workouts.has(
                formatDateKey(date)
            )
        ) {

            date.setDate(
                date.getDate() - 1
            );

        }


        while (
            workouts.has(
                formatDateKey(date)
            )
        ) {

            streak++;

            date.setDate(
                date.getDate() - 1
            );

        }


        return streak;

    }


    /* =====================================================
       07. FORMAT DATE KEY
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
       08. UPDATE OVERVIEW
    ===================================================== */

    function updateOverview() {

        const change =
            getWeightChange();


        if (currentWeight) {

            currentWeight.innerHTML = `
                ${progressData.currentWeight.toFixed(1)}
                <small>kg</small>
            `;

        }


        if (weightChange) {

            const absoluteChange =
                Math.abs(change).toFixed(1);


            if (change < 0) {

                weightChange.textContent =
                    `-${absoluteChange} kg this month`;

                weightChange.style.color =
                    "var(--success)";

            } else if (change > 0) {

                weightChange.textContent =
                    `+${absoluteChange} kg this month`;

                weightChange.style.color =
                    "#ff8d8d";

            } else {

                weightChange.textContent =
                    "No change this month";

                weightChange.style.color =
                    "#686e77";

            }

        }


        if (totalWorkouts) {

            totalWorkouts.textContent =
                progressData.workouts;

        }


        const streak =
            getCurrentStreak();


        if (currentStreak) {

            currentStreak.innerHTML = `
                ${streak}
                <small>days</small>
            `;

        }


        if (attendanceDays) {

            attendanceDays.innerHTML = `
                ${progressData.attendance}
                <small>days</small>
            `;

        }

    }


    /* =====================================================
       09. UPDATE CHART
    ===================================================== */

    function updateChart(range = "1m") {

        const values =
            progressData.history[range];


        if (
            !values ||
            values.length === 0
        ) {

            return;

        }


        /* -----------------------------------------------
           Find min/max
        ------------------------------------------------ */

        const max =
            Math.max(...values);


        const min =
            Math.min(...values);


        const difference =
            max - min || 1;


        /* -----------------------------------------------
           Update chart points
        ------------------------------------------------ */

        chartPoints.forEach(
            (point, index) => {

                const value =
                    values[
                        Math.min(
                            index,
                            values.length - 1
                        )
                    ];


                point.dataset.value =
                    value;


                const percentage =
                    (
                        (max - value) /
                        difference
                    ) * 72 + 14;


                point.style.setProperty(
                    "--point-position",
                    `${percentage}%`
                );


                point.title =
                    `${value.toFixed(1)} kg`;

            }
        );


        /* -----------------------------------------------
           X axis
        ------------------------------------------------ */

        if (chartXAxis) {

            chartXAxis.innerHTML =
                createXAxisLabels(
                    values.length,
                    range
                );

        }

    }


    /* =====================================================
       10. CREATE X AXIS LABELS
    ===================================================== */

    function createXAxisLabels(
        count,
        range
    ) {

        let labels;


        if (range === "1m") {

            labels = [
                "Week 1",
                "Week 2",
                "Week 3",
                "Week 4",
                "Now"
            ];

        } else if (range === "3m") {

            labels = [
                "Month 1",
                "Month 2",
                "Month 3",
                "Now"
            ];

        } else if (range === "6m") {

            labels = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun"
            ];

        } else {

            labels = [
                "Jan",
                "Mar",
                "May",
                "Jul",
                "Sep",
                "Nov",
                "Now"
            ];

        }


        return labels
            .map(
                label =>
                    `<span>${label}</span>`
            )
            .join("");

    }


    /* =====================================================
       11. TIME RANGE BUTTONS
    ===================================================== */

    timeRange?.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".time-range-btn"
                );


            if (!button) return;


            timeRange
                .querySelectorAll(
                    ".time-range-btn"
                )
                .forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );


            button.classList.add(
                "active"
            );


            const range =
                button.dataset.range ||
                "1m";


            updateChart(range);

        }
    );


    /* =====================================================
    12. MEASUREMENT MODAL
    ===================================================== */

    const measurementModal =
        document.getElementById(
            "measurementModal"
        );

    const measurementModalOverlay =
        document.getElementById(
            "measurementModalOverlay"
        );

    const closeMeasurementModal =
        document.getElementById(
            "closeMeasurementModal"
        );

    const cancelMeasurementBtn =
        document.getElementById(
            "cancelMeasurementBtn"
        );

    const measurementForm =
        document.getElementById(
            "measurementForm"
        );

    const measurementChest =
        document.getElementById(
            "measurementChest"
        );

    const measurementWaist =
        document.getElementById(
            "measurementWaist"
        );

    const measurementArms =
        document.getElementById(
            "measurementArms"
        );

    const measurementThighs =
        document.getElementById(
            "measurementThighs"
        );


    /* =====================================================
    13. OPEN MEASUREMENT MODAL
    ===================================================== */

    function openMeasurementModal() {

        if (!measurementModal) return;


        /* -----------------------------------------------
        Fill current values
        ------------------------------------------------ */

        measurementChest.value =
            progressData.measurements.chest;

        measurementWaist.value =
            progressData.measurements.waist;

        measurementArms.value =
            progressData.measurements.arms;

        measurementThighs.value =
            progressData.measurements.thighs;


        measurementModal.hidden =
            false;


        document.body.style.overflow =
            "hidden";


        setTimeout(() => {

            measurementChest?.focus();

        }, 100);

    }


    /* =====================================================
    14. CLOSE MEASUREMENT MODAL
    ===================================================== */

    function closeMeasurementModalWindow() {

        if (!measurementModal) return;


        measurementModal.hidden =
            true;


        document.body.style.overflow =
            "";

    }


    /* =====================================================
    15. OPEN BUTTON
    ===================================================== */

    editMeasurementsBtn?.addEventListener(
        "click",
        openMeasurementModal
    );


    /* =====================================================
    16. CLOSE BUTTONS
    ===================================================== */

    closeMeasurementModal?.addEventListener(
        "click",
        closeMeasurementModalWindow
    );

    cancelMeasurementBtn?.addEventListener(
        "click",
        closeMeasurementModalWindow
    );

    measurementModalOverlay?.addEventListener(
        "click",
        closeMeasurementModalWindow
    );


    /* =====================================================
    17. ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                measurementModal &&
                !measurementModal.hidden
            ) {

                closeMeasurementModalWindow();

            }

        }
    );


    /* =====================================================
    18. SAVE MEASUREMENTS
    ===================================================== */

    measurementForm?.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const chest =
                parseFloat(
                    measurementChest.value
                );

            const waist =
                parseFloat(
                    measurementWaist.value
                );

            const arms =
                parseFloat(
                    measurementArms.value
                );

            const thighs =
                parseFloat(
                    measurementThighs.value
                );


            /* -----------------------------------------------
            Validate
            ------------------------------------------------ */

            if (
                !Number.isFinite(chest) ||
                !Number.isFinite(waist) ||
                !Number.isFinite(arms) ||
                !Number.isFinite(thighs)
            ) {

                showToast(
                    "Please enter valid measurements."
                );

                return;

            }


            if (
                chest <= 0 ||
                waist <= 0 ||
                arms <= 0 ||
                thighs <= 0
            ) {

                showToast(
                    "Measurements must be greater than zero."
                );

                return;

            }


            /* -----------------------------------------------
            Update data
            ------------------------------------------------ */

            progressData.measurements = {

                chest,
                waist,
                arms,
                thighs

            };


            /* -----------------------------------------------
            Save
            ------------------------------------------------ */

            saveProgress();


            /* -----------------------------------------------
            Update page
            ------------------------------------------------ */

            updateMeasurements();


            /* -----------------------------------------------
            Close modal
            ------------------------------------------------ */

            closeMeasurementModalWindow();


            /* -----------------------------------------------
            Success message
            ------------------------------------------------ */

            showToast(
                "Body measurements updated successfully."
            );

        }
    );


    /* =====================================================
       19. UPDATE MEASUREMENTS
    ===================================================== */

    function updateMeasurements() {

        const rows =
            document.querySelectorAll(
                ".measurement-row"
            );


        if (rows.length < 4) return;


        const values = [

            progressData.measurements.chest,

            progressData.measurements.waist,

            progressData.measurements.arms,

            progressData.measurements.thighs

        ];


        rows.forEach(
            (row, index) => {

                const value =
                    row.querySelector(
                        "strong"
                    );


                if (!value) return;


                value.innerHTML = `
                    ${values[index]}
                    <small>in</small>
                `;

            }
        );

    }


    /* =====================================================
       20. UPDATE STRENGTH
    ===================================================== */

    function updateStrength() {

        const rows =
            document.querySelectorAll(
                ".strength-row"
            );


        const values = [

            progressData.strength.bench,

            progressData.strength.squat,

            progressData.strength.deadlift

        ];


        rows.forEach(
            (row, index) => {

                const value =
                    row.querySelector(
                        ".strength-value strong"
                    );


                if (!value) return;


                value.textContent =
                    `${values[index]} kg`;

            }
        );

    }


    /* =====================================================
       21. MOBILE SIDEBAR
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
       22. NOTIFICATIONS
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
       23. LOGOUT
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
       24. TOAST
    ===================================================== */

    function showToast(message) {

        document
            .querySelector(
                ".progress-toast"
            )
            ?.remove();


        const toast =
            document.createElement(
                "div"
            );


        toast.className =
            "progress-toast";


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
                boxShadow: "0 12px 30px rgba(0,0,0,.3)",
                fontFamily: "Poppins, sans-serif",
                fontSize: "9px",
                fontWeight: "600",
                transition: "opacity .2s ease"
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
                    () => toast.remove(),
                    220
                );

            },
            2500
        );

    }


    /* =====================================================
       25. HTML ESCAPE
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
       26. INITIALIZE
    ===================================================== */

    updateDate();

    updateOverview();

    updateChart("1m");

    updateMeasurements();

    updateStrength();

});