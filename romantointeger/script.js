let romans = ["I","IV", "V","IX", "X","XL", "L", "XC", "C", "CD", "D","CM", "M"];
let numbers = [1,4,5,9,10,40,50,90,100,400,500,900,1000];

let input = document.querySelector("#number");
let button = document.querySelector("#convert-btn");
let output = document.querySelector("#output");

button.addEventListener("click", (e)=>{
    e.preventDefault()
    let number = input.value;
    if (number == "") {
        output.classList.remove("hidden");
        output.classList.add("alert");
        output.textContent = "Please enter a number";
    }
    else if (number < 1) {
        output.classList.remove("hidden");
        output.classList.add("alert");
        output.textContent = "Please enter a number greater than or equal to 1";

    }
    else if (number > 3999) {
        output.classList.remove("hidden");
        output.classList.add("alert");
        output.textContent = "Please enter a number less than or equal to 3999";
    }
    else {
        output.classList.remove("alert");
        output.classList.remove("hidden");
        let roman = "";
        let num = parseInt(number);
        let i=12;
        while(num>0){
            let div = Math.floor(num/numbers[i]);
            num = num%numbers[i];
            while(div--){
                roman += romans[i];
            }
            i--;
        }
        output.textContent = roman;
    }
})

