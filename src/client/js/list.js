import "../scss/styles.scss";

const btn = document.querySelector(".custom-btn");

console.dir(btn);

function playMusic() {
    const parent = (this).parentNode.parentNode;
    const artist = parent.childNodes[3].childNodes[1].innerText;
    const song = parent.childNodes[3].childNodes[3].innerText;

    console.dir(artist + "  " + song);
}

[].forEach.call(btn, function(button) {
    button.addEventListener("click",playMusic);
})
