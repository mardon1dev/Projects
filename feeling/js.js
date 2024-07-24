let happy = document.querySelector(".happy");
let sad = document.querySelector(".sad");
let angry = document.querySelector(".angry");
let neutral = document.querySelector(".neutral");
let eyebrow = document.querySelector(".eyebrow-wrapper");
let body = document.querySelector("body");
let change = document.querySelector("#toggle");

change.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

happy.addEventListener("click", () => {
  eyebrow.classList.add("facehappy");
  eyebrow.classList.remove("faceangry");
  eyebrow.classList.remove("facesad");
});
sad.addEventListener("click", () => {
  eyebrow.classList.add("facesad");
  eyebrow.classList.remove("faceangry");
  eyebrow.classList.remove("facehapp");
});

angry.addEventListener("click", () => {
  eyebrow.classList.remove("facehappy");
  eyebrow.classList.add("faceangry");
  eyebrow.classList.remove("facesad");
});
neutral.addEventListener("click", () => {
  eyebrow.classList.remove("facehappy");
  eyebrow.classList.remove("faceangry");
  eyebrow.classList.remove("facesad");
});
