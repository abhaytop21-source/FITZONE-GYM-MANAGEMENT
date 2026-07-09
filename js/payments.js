// Load Members
let members = JSON.parse(localStorage.getItem("members")) || [];

// Load Payments
let payments = JSON.parse(localStorage.getItem("payments")) || {};

const paymentTable = document.getElementById("paymentTable");

const totalRevenue = document.getElementById("totalRevenue");
const pendingPayments = document.getElementById("pendingPayments");
const paidMembers = document.getElementById("paidMembers");
const paymentMembers = document.getElementById("paymentMembers");

// Plan Prices
const planPrice = {

    "Basic":999,
    "Premium":1999,
    "VIP":3999

};

function displayPayments(){

    paymentTable.innerHTML="";

    let revenue = 0;
    let paid = 0;

    members.forEach((member,index)=>{

        let status = payments[index] || "Pending";

        let amount = planPrice[member.plan] || 0;

        if(status==="Paid"){

            revenue += amount;
            paid++;

        }

        paymentTable.innerHTML += `

        <tr>

            <td>${index+1}</td>

            <td>${member.name}</td>

            <td>${member.plan}</td>

            <td>₹${amount}</td>

            <td>${status}</td>

            <td>

            <button onclick="payNow(${index})">

            💳 Pay

            </button>

            </td>

        </tr>

        `;

    });

    totalRevenue.innerText="₹"+revenue;

    paidMembers.innerText=paid;

    paymentMembers.innerText=members.length;

    pendingPayments.innerText=members.length-paid;

}

function payNow(index){

    payments[index]="Paid";

    localStorage.setItem(

        "payments",

        JSON.stringify(payments)

    );

    displayPayments();

    showToast(
        "💳 Payment",
        "Payment recorded successfully."
    );

}

displayPayments();