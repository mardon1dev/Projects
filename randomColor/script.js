let letters = ["A", "B", "C", "D","E", "F"];
let numbers = [0,1,2,3,4,5,6,7,8,9];

function generateRandomColors(letters, numbers) {
    let colors = [];
  
    for (let i = 0; i < 1; i++) {
      let r = `${letters[Math.floor(Math.random() * letters.length)]}${numbers[Math.floor(Math.random() * numbers.length)]}`;
      let g = `${letters[Math.floor(Math.random() * letters.length)]}${numbers[Math.floor(Math.random() * numbers.length)]}`;
      let b = `${letters[Math.floor(Math.random() * letters.length)]}${numbers[Math.floor(Math.random() * numbers.length)]}`;
      colors.push(`#${r}${g}${b}`);
    }
    return colors;
  }  
  
const body = document.querySelector("body");
const bgHexCodeSpanElement = document.querySelector("#bg-hex-code");
const time = document.querySelector("#number");

function changeBackgroundColor() {
    let randomColors = generateRandomColors(letters, numbers);
    const color = randomColors;
    bgHexCodeSpanElement.innerText = color;
    body.style.backgroundColor = color;
}
const btn = document.querySelector("#btn");

let intervalId = null;
let isRunning = false;

btn.addEventListener("click", () => {
    if (time.value) {
        if (isRunning) {
            clearInterval(intervalId);
            isRunning = false;
        } else {
            intervalId = setInterval(changeBackgroundColor, time.value);
            isRunning = true;
        }
    } else {
            alert("Please enter a number");
    }
})

const copy = document.querySelector(".copy");
copy.addEventListener("click", () => {
    const copied = navigator.clipboard.writeText(bgHexCodeSpanElement.innerText);
    if (copied) {
        alert("Copied to clipboard");
    }
    copy.innerText = "Copied";
})