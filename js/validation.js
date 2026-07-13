// ==========================================
// FITZONE Validation Library
// Version 1.0
// ==========================================


// ---------- Required Field ----------

function isRequired(value){

    return value.trim() !== "";

}


// ---------- Minimum Length ----------

function minLength(value,length){

    return value.trim().length >= length;

}


// ---------- Email ----------

function isValidEmail(email){

    const pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}


// ---------- Phone ----------

function isValidPhone(phone){

    const pattern=/^[0-9]{10}$/;

    return pattern.test(phone);

}


// ---------- Password ----------

function isStrongPassword(password){

    const pattern=
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    return pattern.test(password);

}


// ---------- Match ----------

function isMatch(value1,value2){

    return value1===value2;

}


// ==========================================
// UI Helpers
// ==========================================

function showError(input,message){

    input.classList.remove("input-success");

    input.classList.add("input-error");

    let error=input.parentElement.querySelector(".error-message");

    if(!error){

        error=document.createElement("small");

        error.className="error-message";

        input.parentElement.appendChild(error);

    }

    error.innerText=message;

}



function showSuccess(input){

    input.classList.remove("input-error");

    input.classList.add("input-success");

    const error=input.parentElement.querySelector(".error-message");

    if(error){

        error.remove();

    }

}