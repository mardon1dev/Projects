let editor = document.querySelector("#editor");
const preview = document.querySelector("#preview");

editor.addEventListener("keyup", (evt)=>{
    const text = editor.value;
    preview.innerHTML = marked.parse(text);
})

let editorBtn = document.querySelector(".editorBtn");
let previewWrapper = document.querySelector(".previewWrap")
editorBtn.addEventListener("click", ()=>{
    editor.focus();
    editor.style.height = "auto "
    previewWrapper.classList.toggle("view")
})