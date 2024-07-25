let check = document.querySelector("#check-btn");
let input = document.querySelector("#text-input");
let result = document.querySelector("#result");
check.addEventListener("click", ()=>{
  if(input.value == ""){
    alert("Please input a value");
  }
  else if (Number(input.value) == input.value) {
    alert("Please enter a string");
    input.value = "";
    result.innerText = "";
  }
  else if(input.value.length > 0){
     let str = input.value;
     const word = isPalindrome(str);
     if(word){
       result.innerText = `${str} is a palindrome`
     }
     else{
       result.innerText = `${str} is not a palindrome`
     }
  }
})

function isPalindrome(str) {
    const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const reversedStr = cleanedStr.split('').reverse().join('');
    return cleanedStr === reversedStr;
}   