
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



let members = JSON.parse(localStorage.getItem("members")) || [];

let editIndex = -1;

const memberTable = document.getElementById("memberTable");

const addMemberBtn = document.getElementById("addMemberBtn");

const memberName = document.getElementById("memberName");
const memberPhone = document.getElementById("memberPhone");
const memberPlan = document.getElementById("memberPlan");

const totalMembers = document.getElementById("totalMembers");
const activeMembers = document.getElementById("activeMembers");
const expiringMembers = document.getElementById("expiringMembers");
const premiumMembers = document.getElementById("premiumMembers");

/* ==========================================
        MEMBER MODAL
========================================== */

const memberModal = document.getElementById("memberModal");

const closeModal = document.getElementById("closeModal");

const existingTab = document.getElementById("existingTab");

const newTab = document.getElementById("newTab");

const existingMemberSection = document.getElementById("existingMemberSection");

const newMemberSection = document.getElementById("newMemberSection");



addMemberBtn.addEventListener("click", () => {

    memberModal.classList.add("active");

});

closeModal.addEventListener("click", () => {

    memberModal.classList.remove("active");

});

memberModal.addEventListener("click", (e) => {

    if(e.target === memberModal){

        memberModal.classList.remove("active");

    }

});

existingTab.addEventListener("click", () => {

    existingTab.classList.add("active");
    newTab.classList.remove("active");

    existingMemberSection.classList.remove("hidden");
    newMemberSection.classList.add("hidden");

});

newTab.addEventListener("click", () => {

    newTab.classList.add("active");
    existingTab.classList.remove("active");

    newMemberSection.classList.remove("hidden");
    existingMemberSection.classList.add("hidden");

});


// Update Overview Cards
function updateOverviewCards() {

    totalMembers.textContent = members.length;

    activeMembers.textContent = members.length;

    expiringMembers.textContent = 0;

    premiumMembers.textContent = members.filter(
        member => member.plan === "Premium"
    ).length;

}


// Display Members
function displayMembers() {

    memberTable.innerHTML = "";

    members.forEach((member, index) => {

        memberTable.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${member.name}</td>

            <td>${member.phone}</td>

            <td>${member.plan}</td>

            <td>Active</td>

            <td>

                <button onclick="editMember(${index})">
                    ✏ Edit
                </button>

                <button onclick="deleteMember(${index})">
                    🗑 Delete
                </button>

            </td>

        </tr>

        `;

    });

    updateOverviewCards();

}


// Add Member

addMemberBtn.addEventListener("click", () => {

    if (
        memberName.value === "" ||
        memberPhone.value === "" ||
        memberPlan.value === ""
    ) {

        showToast(
            "⚠ Missing Information",
            "Please fill all fields."
        );

        return;

    }

    if(editIndex === -1){

        members.push({

            name: memberName.value,
            phone: memberPhone.value,
            plan: memberPlan.value

        });

    }
else{

    members[editIndex] = {

        name: memberName.value,
        phone: memberPhone.value,
        plan: memberPlan.value

    };

    editIndex = -1;

    addMemberBtn.innerText = "Add Member";

    showToast(
        "✏️ Member Updated",
        "Member information updated successfully."
    );

}

localStorage.setItem("members", JSON.stringify(members));

    memberName.value = "";
    memberPhone.value = "";
    memberPlan.value = "";

    displayMembers();

    showToast(
        "✅ Success",
        "Member Added Successfully."
    );

});


// Delete Member

function deleteMember(index){

    members.splice(index,1);

    localStorage.setItem("members", JSON.stringify(members));

    displayMembers();

    showToast(
        "🗑 Member Deleted",
        "Member removed successfully."
    );

}

function editMember(index){

    memberName.value = members[index].name;
    memberPhone.value = members[index].phone;
    memberPlan.value = members[index].plan;

    editIndex = index;

    addMemberBtn.innerText = "Update Member";

}


// First Load

displayMembers();

const searchMember = document.getElementById("searchMember");

searchMember.addEventListener("keyup", () => {

    const value = searchMember.value.toLowerCase();

    const rows = document.querySelectorAll("#memberTable tr");

    rows.forEach(row => {

        const text = row.innerText.toLowerCase();

        if(text.includes(value)){
            row.style.display = "";
        }
        else{
            row.style.display = "none";
        }

    });

});