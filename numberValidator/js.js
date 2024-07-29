const input = document.querySelector("#user-input");
const check = document.querySelector("#check-btn");
const resultWrapper = document.querySelector(".results-div");
const clear = document.querySelector("#clear-btn");
const signl = document.querySelector("#signal");

check.addEventListener("click", (ev)=>{
    ev.preventDefault();
    const result = document.createElement("p");
    const userValue = input.value.trim();
    if (userValue === "") {
        alert("Please provide a phone number")
    }
    else{
        const checked =  checkValid(userValue);
        if (!checked) {
            signl.style.backgroundColor = "red";
            result.textContent = `Invalid US number: ${userValue}`;
        }
        else{
            signl.style.backgroundColor = "green";
            result.textContent = `Valid US number: ${userValue}`;
        }
    }
    resultWrapper.appendChild(result);
})

clear.addEventListener("click", ()=>{
    resultWrapper.innerHTML = "";
    input.value = "";
    signl.style.backgroundColor = "#dfdfe2"
});


function checkValid(number){
    const regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;
    if (number.match(regex)){
        return true;
    }
}