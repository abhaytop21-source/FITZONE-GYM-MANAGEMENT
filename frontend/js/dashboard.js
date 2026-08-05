
// Logged In Gym
const gym = JSON.parse(localStorage.getItem("gym"));

if (!gym) {
    window.location.href = "../owner-login.html";
}

const gymName = document.getElementById("gymName");
const gymCode = document.getElementById("gymCode");

if (gymName) {
    gymName.textContent = gym.gymName;
}

if (gymCode) {
    gymCode.textContent = `Gym Code : ${gym.gymCode}`;
}



// Session Check
const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first!");
    window.location.href = "../owner-login.html";
}

// Logout
const logoutBtn = document.querySelector(".log-btn");

logoutBtn.addEventListener("click", function (e) {

    e.preventDefault();

    localStorage.removeItem("token");
    localStorage.removeItem("gym");

    window.location.href = "index.html";

});

// Load Data
const members = JSON.parse(localStorage.getItem("members")) || [];
const attendance = JSON.parse(localStorage.getItem("attendance")) || {};
const payments = JSON.parse(localStorage.getItem("payments")) || {};

// Dashboard Elements
const dashboardMembers =
    document.getElementById("dashboardMembers");

const dashboardPresent =
    document.getElementById("dashboardPresent");

const dashboardRevenue =
    document.getElementById("dashboardRevenue");

const dashboardActiveMemberships =
    document.getElementById("dashboardActiveMemberships");

    
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

    const memberCards =
    document.getElementById("memberCards");

    memberCards.innerHTML="";

    members.slice(-6).reverse().forEach((member,index)=>{

    memberCards.innerHTML +=`

    <div class="member-card">

    <div class="member-avatar">

    👤

    </div>

    <h3>${member.name}</h3>

    <p>📞 ${member.phone}</p>

    <p class="member-plan">🏋 ${member.plan} Member</p>

    <div class="status-badge">

        🟢 Active

    </div>


    <button onclick="viewMember(${members.length-1-index})">

    Member Profile

    </button>

    </div>

    `;

});

 function viewMember(index){

    toast("🚧 Member Control Center - Coming in Phase 3");

}   

function closeMemberModal(){

    document.getElementById("memberModal").style.display="none";

}