let auudios = [
    {
        id: 1,
        name:[
            "Heater-1",
            "Chord-1"
        ],
        src: [
            "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
            "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
        ],
        key: "Q",
    },
    {
        id: 2,
        name: [
            "Heater-2",
            "Chord-2"
        ],
        src: [
            "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
            "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
        ],
        key: "W",
    },
    {
        id: 3,
        name: [
            "Heater-3",
            "Chord-3"
        ],
        src: [
            "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
            "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
        ],
        key: "E",
    },
    {
        id: 4,
        name: [
            "Heater-4",
            "Shaker"
        ],
        src: [
            "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
            "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
        ],
        key: "A",
    },
    {
        id: 5,
        name: [
            "Clap",
            "Open-HH"
        ],
        src: [
            "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
            "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
        ],
        key: "S",
    },
    {
        id: 6,
        name: [
            "Open HH",
            "Closed HH"
        ],
        src: [
            "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
            "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
        ],
        key: "D",
    },
    {
        id: 7,
        name: [
            "Kick n' Hat",
            "Punchy Kick"
        ],
        src: [
            "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
            "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
        ],
        key: "Z",
    },
    {
        id: 8,
        name: [
            "Kick",
            "Side Stick"
        ],
        src: [
            "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
            "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
        ],
        key: "X",
    },
    {
        id: 9,
        name: [
            "Closed HH",
            "Snare"
        ],
        src: [
            "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
            "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
        ],
        key: "C",
    }    
]

let type = true;
let audio = new Audio();

let text = document.querySelector("#display");
let wrapper = document.querySelector(".wrapper");

function renderDisplay (arr, et){
    
    wrapper.innerHTML = arr.map(aud =>{
        return `<div class="drum-pad" id="${aud.id}">
        <p>${aud.key}</p>
        <span>${et ? aud.name[0] : aud.name[1]}</span>
        <audio src="${et ? aud.src[0] : aud.src[1]}" class="clip" id="${aud.key}"></audio>
        </div>`
    })
    .join("");
    
    let button = document.querySelectorAll(".drum-pad");
    
    button.forEach(item =>{
        item.addEventListener("click", ()=>{
            let key = item.querySelector("span").textContent;
            text.innerHTML = key
            item.classList.add("toggle");
            setTimeout(() => {
                item.classList.remove("toggle")
            }, 100);
            let audio = item.querySelector("audio");
            audio.play();
        })
    })
}
renderDisplay(auudios, type);


let range = document.querySelector(".volume");
range.addEventListener("input", (e) => {
    let value = e.target.value;
    let audio = document.querySelectorAll("audio");
    audio.forEach(item => {
        item.volume = value;
    })
    text.innerHTML = Math.round(value * 100);
    text.style.backgroundColor = "white";
    text.style.color = "black";
    range.disabled = false;
    
})
let power = document.querySelector(".power");
power.addEventListener("click", ()=>{
    let audios = document.querySelectorAll("audio");
    audios.forEach(item =>{
        item.muted = !item.muted;
    })
    let inner = power.querySelector(".inner");
    inner.classList.toggle("float");
    if(inner.classList.contains("float")){
        text.textContent = "Power Off";
        text.style.backgroundColor = "red";
        text.style.color = "white";
        range.disabled = true;
    }
    else{
        text.textContent = "Power On";
        text.style.backgroundColor = "green";
        text.style.color = "white";
        range.disabled = false;
    }
})

let bank = document.querySelector(".bank");
bank.addEventListener("click", ()=>{
    type = !type
    renderDisplay(auudios, type);
    let inner = bank.querySelector(".inner");
    inner.classList.toggle("float");    
    
})

document.addEventListener("keydown", (event) => {
    let pressedKey = event.key.toUpperCase();
    let button = Array.from(document.querySelectorAll(".drum-pad")).find(item => {
        return item.querySelector("p").textContent === pressedKey;
    });

    if (button) {
        button.click(); 
    }
});