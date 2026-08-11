/* =========================================================
   FITZONE — ACHIEVEMENTS
   Frontend Demo Logic
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. ELEMENTS
    ===================================================== */

    const achievementGrid =
        document.getElementById("achievementGrid");

    const achievementFilters =
        document.getElementById("achievementFilters");

    const achievementResultCount =
        document.getElementById("achievementResultCount");

    const unlockedCount =
        document.getElementById("unlockedCount");

    const totalCount =
        document.getElementById("totalCount");

    const completionPercent =
        document.getElementById("completionPercent");


    /* Modal */

    const achievementModal =
        document.getElementById("achievementModal");

    const achievementModalOverlay =
        document.getElementById(
            "achievementModalOverlay"
        );

    const closeAchievementModal =
        document.getElementById(
            "closeAchievementModal"
        );

    const modalAchievementIcon =
        document.getElementById(
            "modalAchievementIcon"
        );

    const modalAchievementStatus =
        document.getElementById(
            "modalAchievementStatus"
        );

    const modalAchievementTitle =
        document.getElementById(
            "modalAchievementTitle"
        );

    const modalAchievementDescription =
        document.getElementById(
            "modalAchievementDescription"
        );

    const modalAchievementProgress =
        document.getElementById(
            "modalAchievementProgress"
        );

    const modalProgressFill =
        document.getElementById(
            "modalProgressFill"
        );

    const modalProgressText =
        document.getElementById(
            "modalProgressText"
        );

    const modalProgressPercent =
        document.getElementById(
            "modalProgressPercent"
        );

    const modalAchievementDate =
        document.getElementById(
            "modalAchievementDate"
        );


    /* Navigation */

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


    /* =====================================================
       02. ACHIEVEMENT DATA
    ===================================================== */

    const achievementData = {

        "first-workout": {

            title:
                "First Workout",

            description:
                "Complete your first workout and officially begin your FITZONE journey.",

            category:
                "WORKOUT",

            icon:
                "fa-dumbbell",

            status:
                "UNLOCKED",

            progress:
                100,

            progressText:
                "Workout completed",

            date:
                "Unlocked Jul 28, 2026"

        },


        "seven-day-streak": {

            title:
                "7 Day Streak",

            description:
                "Work out for 7 consecutive days and build your first consistency streak.",

            category:
                "CONSISTENCY",

            icon:
                "fa-fire",

            status:
                "UNLOCKED",

            progress:
                100,

            progressText:
                "7 / 7 days",

            date:
                "Unlocked Aug 04, 2026"

        },


        "ten-workouts": {

            title:
                "10 Workouts",

            description:
                "Complete 10 total workouts to prove your consistency.",

            category:
                "WORKOUT",

            icon:
                "fa-layer-group",

            status:
                "IN PROGRESS",

            progress:
                70,

            progressText:
                "7 / 10 workouts",

            date:
                "3 workouts remaining"

        },


        "goal-crusher": {

            title:
                "Goal Crusher",

            description:
                "Complete 5 fitness goals and turn your plans into results.",

            category:
                "GOALS",

            icon:
                "fa-bullseye",

            status:
                "LOCKED",

            progress:
                40,

            progressText:
                "2 / 5 goals",

            date:
                "3 goals remaining"

        },


        "fourteen-day-streak": {

            title:
                "14 Day Streak",

            description:
                "Maintain your workout consistency for 14 consecutive days.",

            category:
                "CONSISTENCY",

            icon:
                "fa-fire-flame-curved",

            status:
                "IN PROGRESS",

            progress:
                57,

            progressText:
                "8 / 14 days",

            date:
                "6 days remaining"

        },


        "weight-milestone": {

            title:
                "Weight Milestone",

            description:
                "Reach your first tracked weight milestone and celebrate your progress.",

            category:
                "PROGRESS",

            icon:
                "fa-weight-scale",

            status:
                "LOCKED",

            progress:
                72,

            progressText:
                "72% progress",

            date:
                "Keep tracking"

        },


        "consistent": {

            title:
                "Consistent",

            description:
                "Complete 20 workouts in one month.",

            category:
                "CONSISTENCY",

            icon:
                "fa-calendar-check",

            status:
                "LOCKED",

            progress:
                55,

            progressText:
                "11 / 20 workouts",

            date:
                "9 workouts remaining"

        },


        "stronger": {

            title:
                "Getting Stronger",

            description:
                "Improve your tracked strength and keep pushing your limits.",

            category:
                "PROGRESS",

            icon:
                "fa-dumbbell",

            status:
                "LOCKED",

            progress:
                45,

            progressText:
                "45% progress",

            date:
                "Keep training"

        },


        "early-bird": {

            title:
                "Early Bird",

            description:
                "Complete 10 morning workouts.",

            category:
                "CONSISTENCY",

            icon:
                "fa-sun",

            status:
                "LOCKED",

            progress:
                30,

            progressText:
                "3 / 10 workouts",

            date:
                "7 workouts remaining"

        },


        "goal-setter": {

            title:
                "Goal Setter",

            description:
                "Create your first fitness goal and start working toward it.",

            category:
                "GOALS",

            icon:
                "fa-bullseye",

            status:
                "UNLOCKED",

            progress:
                100,

            progressText:
                "Goal created",

            date:
                "Unlocked Aug 09, 2026"

        },


        "progress-tracker": {

            title:
                "Progress Tracker",

            description:
                "Record your first body measurement and start tracking your transformation.",

            category:
                "PROGRESS",

            icon:
                "fa-chart-line",

            status:
                "UNLOCKED",

            progress:
                100,

            progressText:
                "Measurement recorded",

            date:
                "Unlocked Aug 10, 2026"

        },


        "unstoppable": {

            title:
                "Unstoppable",

            description:
                "Complete 50 workouts and become one of FITZONE's most consistent members.",

            category:
                "WORKOUT",

            icon:
                "fa-bolt",

            status:
                "LOCKED",

            progress:
                14,

            progressText:
                "7 / 50 workouts",

            date:
                "43 workouts remaining"

        }

    };


    /* =====================================================
       03. GET ACHIEVEMENT CARDS
    ===================================================== */

    const getAchievementCards = () => {

        return Array.from(
            document.querySelectorAll(
                ".achievement-card"
            )
        );

    };


    /* =====================================================
       04. UPDATE SUMMARY
    ===================================================== */

    function updateSummary() {

        const cards =
            getAchievementCards();

        const total =
            cards.length;

        const unlocked =
            cards.filter(
                card =>
                    card.classList.contains(
                        "unlocked"
                    )
            ).length;

        const percentage =
            total > 0
                ? Math.round(
                    (unlocked / total) * 100
                )
                : 0;


        if (totalCount) {

            totalCount.textContent =
                total;

        }


        if (unlockedCount) {

            unlockedCount.textContent =
                unlocked;

        }


        if (completionPercent) {

            completionPercent.textContent =
                `${percentage}%`;

        }

    }


    /* =====================================================
       05. FILTER ACHIEVEMENTS
    ===================================================== */

    function filterAchievements(
        selectedFilter
    ) {

        const cards =
            getAchievementCards();

        let visibleCount = 0;


        cards.forEach(
            card => {

                const category =
                    card.dataset.category;


                const shouldShow =
                    selectedFilter === "all" ||
                    category === selectedFilter;


                if (shouldShow) {

                    card.style.display =
                        "";

                    visibleCount++;

                }

                else {

                    card.style.display =
                        "none";

                }

            }
        );


        if (achievementResultCount) {

            achievementResultCount.textContent =
                `${visibleCount} ${
                    visibleCount === 1
                        ? "achievement"
                        : "achievements"
                }`;

        }

    }


    /* =====================================================
       06. FILTER BUTTON EVENTS
    ===================================================== */

    achievementFilters?.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".achievement-filter"
                );


            if (!button) return;


            const filter =
                button.dataset.filter;


            document
                .querySelectorAll(
                    ".achievement-filter"
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


            filterAchievements(
                filter
            );

        }
    );


    /* =====================================================
       07. OPEN ACHIEVEMENT MODAL
    ===================================================== */

    function openAchievementModal(
        achievementId
    ) {

        const data =
            achievementData[
                achievementId
            ];


        if (!data) {

            showToast(
                "Achievement details unavailable."
            );

            return;

        }


        if (!achievementModal) return;


        /* -----------------------------------------------
           Icon
        ------------------------------------------------ */

        if (modalAchievementIcon) {

            modalAchievementIcon.className =
                `fa-solid ${data.icon}`;

        }


        /* -----------------------------------------------
           Status
        ------------------------------------------------ */

        if (modalAchievementStatus) {

            modalAchievementStatus.textContent =
                data.status;

        }


        /* -----------------------------------------------
           Title
        ------------------------------------------------ */

        if (modalAchievementTitle) {

            modalAchievementTitle.textContent =
                data.title;

        }


        /* -----------------------------------------------
           Description
        ------------------------------------------------ */

        if (modalAchievementDescription) {

            modalAchievementDescription.textContent =
                data.description;

        }


        /* -----------------------------------------------
           Progress
        ------------------------------------------------ */

        if (
            modalAchievementProgress &&
            modalProgressFill &&
            modalProgressText &&
            modalProgressPercent
        ) {

            modalAchievementProgress.style.display =
                "block";


            modalProgressFill.style.width =
                `${data.progress}%`;


            modalProgressText.textContent =
                data.progressText;


            modalProgressPercent.textContent =
                `${data.progress}%`;

        }


        /* -----------------------------------------------
           Date / remaining
        ------------------------------------------------ */

        if (modalAchievementDate) {

            modalAchievementDate.textContent =
                data.date;

        }


        /* -----------------------------------------------
           Show
        ------------------------------------------------ */

        achievementModal.hidden =
            false;


        document.body.style.overflow =
            "hidden";

    }


    /* =====================================================
       08. ACHIEVEMENT CARD CLICK
    ===================================================== */

    achievementGrid?.addEventListener(
        "click",
        event => {

            const card =
                event.target.closest(
                    ".achievement-card"
                );


            if (!card) return;


            const achievementId =
                card.dataset.achievement;


            openAchievementModal(
                achievementId
            );

        }
    );


    /* =====================================================
       09. CLOSE MODAL
    ===================================================== */

    function closeModal() {

        if (!achievementModal) return;


        achievementModal.hidden =
            true;


        document.body.style.overflow =
            "";

    }


    closeAchievementModal?.addEventListener(
        "click",
        closeModal
    );


    achievementModalOverlay?.addEventListener(
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
                achievementModal &&
                !achievementModal.hidden
            ) {

                closeModal();

            }

        }
    );


    /* =====================================================
       11. MOBILE SIDEBAR
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
       12. NOTIFICATIONS
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
       13. LOGOUT
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
       14. TOAST
    ===================================================== */

    function showToast(message) {

        document
            .querySelector(
                ".achievement-toast"
            )
            ?.remove();


        const toast =
            document.createElement(
                "div"
            );


        toast.className =
            "achievement-toast";


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
                border:
                    "1px solid rgba(0,229,255,.18)",
                borderRadius: "9px",
                boxShadow:
                    "0 12px 30px rgba(0,0,0,.3)",
                fontFamily:
                    "Poppins, sans-serif",
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

                toast.style.transition =
                    "opacity .2s ease";


                setTimeout(
                    () =>
                        toast.remove(),
                    220
                );

            },
            2400
        );

    }


    /* =====================================================
       15. HTML ESCAPE
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
       16. INITIALIZE
    ===================================================== */

    updateSummary();

    filterAchievements(
        "all"
    );

});