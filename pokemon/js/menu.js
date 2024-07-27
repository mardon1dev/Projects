let button = document.querySelector(".header__burger");
let closeButton = document.querySelector(".header__burger2");
const menu = document.querySelector(".header__list");
button.addEventListener("click", function(){
    menu.classList.toggle("active");
})
closeButton.addEventListener("click", ()=>{
    menu.classList.remove("active");
})

