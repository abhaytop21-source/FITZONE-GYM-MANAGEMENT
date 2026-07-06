let members = JSON.parse(localStorage.getItem("members")) || [];

let editIndex = -1;

const memberTable = document.getElementById("memberTable");

const addMemberBtn = document.getElementById("addMemberBtn");

const memberName = document.getElementById("memberName");
const memberPhone = document.getElementById("memberPhone");
const memberPlan = document.getElementById("memberPlan");


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

}


// Add Member

addMemberBtn.addEventListener("click", () => {

    if (
        memberName.value === "" ||
        memberPhone.value === "" ||
        memberPlan.value === ""
    ) {

        alert("Please fill all fields.");

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

}

localStorage.setItem("members", JSON.stringify(members));

    memberName.value = "";
    memberPhone.value = "";
    memberPlan.value = "";

    displayMembers();

});


// Delete Member

function deleteMember(index){

    members.splice(index,1);

    localStorage.setItem("members", JSON.stringify(members));

    displayMembers();

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