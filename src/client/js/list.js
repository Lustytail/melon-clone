import "../scss/styles.scss";

const btn = document.querySelector(".custom-btn");

console.dir(btn);

function playMusic() {
    const parent = $(this).parent().parent();
    console.dir(parent);
}

btn.addEventListener("click",playMusic);