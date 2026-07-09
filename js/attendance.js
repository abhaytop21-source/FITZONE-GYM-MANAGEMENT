// Load Members
let members = JSON.parse(localStorage.getItem("members")) || [];

// Load Attendance
let attendance =
JSON.parse(localStorage.getItem("attendance")) || {};

const attendanceTable =
document.getElementById("attendanceTable");

// Dashboard Cards
const totalMembers =
document.getElementById("totalMembers");

const presentMembers =
document.getElementById("presentMembers");

const absentMembers =
document.getElementById("absentMembers");

function displayAttendance(){

    attendanceTable.innerHTML="";

    let present = 0;

    members.forEach((member,index)=>{

        let status =
        attendance[index] || "Absent";

        if(status==="Present")
            present++;

        attendanceTable.innerHTML +=`

        <tr>

        <td>${index+1}</td>

        <td>${member.name}</td>

        <td>${member.plan}</td>

        <td>${status}</td>

        <td>

        <button onclick="markPresent(${index})">

        ✅ Present

        </button>

        <button onclick="markAbsent(${index})">

        ❌ Absent

        </button>

        </td>

        </tr>

        `;

    });

    totalMembers.innerText = members.length;

    presentMembers.innerText = present;

    absentMembers.innerText =
    members.length-present;

}

function markPresent(index){

    attendance[index]="Present";

    localStorage.setItem(
        "attendance",
        JSON.stringify(attendance)
    );

    displayAttendance();

    showToast(
        "📅 Attendance",
        "Marked as Present."
    );

}

function markAbsent(index){

    attendance[index]="Absent";

    localStorage.setItem(
        "attendance",
        JSON.stringify(attendance)
    );

    displayAttendance();

    showToast(
        "📅 Attendance",
        "Marked as Absent."
    );

}

displayAttendance();