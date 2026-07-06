// Session Check
const isLoggedIn = localStorage.getItem("isLoggedIn");

if (isLoggedIn !== "true") {
    alert("Please login first!");
    window.location.href = "login.html";
}

// Logout
const logoutBtn = document.querySelector(".log-btn");

logoutBtn.addEventListener("click", function (e) {

    e.preventDefault();

    localStorage.removeItem("isLoggedIn");

    window.location.href = "index.html";

});

// Load Data
const members = JSON.parse(localStorage.getItem("members")) || [];
const attendance = JSON.parse(localStorage.getItem("attendance")) || {};
const payments = JSON.parse(localStorage.getItem("payments")) || {};

// Dashboard Elements
const dashboardMembers = document.getElementById("dashboardMembers");
const dashboardPresent = document.getElementById("dashboardPresent");
const dashboardRevenue = document.getElementById("dashboardRevenue");
const dashboardPending = document.getElementById("dashboardPending");
const recentMembers = document.getElementById("recentMembers");

// Membership Prices
const planPrice = {

    Basic: 999,
    Premium: 1999,
    VIP: 3999

};

// Statistics
let present = 0;
let revenue = 0;
let pending = 0;

members.forEach((member, index) => {

    // Attendance
    if (attendance[index] === "Present") {
        present++;
    }

    // Payments
    if (payments[index] === "Paid") {

        revenue += planPrice[member.plan] || 0;

    } else {

        pending++;

    }

});

// Update Dashboard Cards
dashboardMembers.innerText = members.length;
dashboardPresent.innerText = present;
dashboardRevenue.innerText = "₹" + revenue;
dashboardPending.innerText = pending;

// Recent Members
recentMembers.innerHTML = "";

members.slice(-5).reverse().forEach((member, index) => {

    recentMembers.innerHTML += `

    <tr>

        <td>${members.length - index}</td>

        <td>${member.name}</td>

        <td>${member.plan}</td>

        <td>Active</td>

    </tr>

    `;

});