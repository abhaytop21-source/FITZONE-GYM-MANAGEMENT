const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");
const overlay = document.getElementById("overlay");

if(menuBtn){

menuBtn.addEventListener("click",()=>{

sidebar.classList.toggle("active");

overlay.classList.toggle("show");

});

}

if(overlay){

overlay.addEventListener("click",()=>{

sidebar.classList.remove("active");

overlay.classList.remove("show");

});

}

// Date

const todayDate=document.getElementById("todayDate");

if(todayDate){

const today=new Date();

todayDate.innerHTML=today.toDateString();

}