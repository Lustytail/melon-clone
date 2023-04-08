import "../scss/styles.scss";

const API_KEY = '80cd9d5efe057bdfe5c8cc78ae900887';


const btn = document.querySelectorAll(".custom-btn");

console.dir(btn);

function playMusic() {
  const video = document.querySelector("#ytplayer");
  const url = `https://www.youtube.com/embed/${(this).id}`;

  video.src = url;


  /* last.fm api 연동 소스 
    const parent = (this).parentNode.parentNode;
    const artist = parent.childNodes[2].childNodes[0].innerText;
    const song = parent.childNodes[2].childNodes[1].innerText;

    console.dir(artist + "  " + song);
    searchVideos(song, artist);
    */
}

[].forEach.call(btn, function(button) {
    button.addEventListener("click",playMusic);
})



/* last.fm api function */
function searchVideos(song, artist) {
  const url = ` http://ws.audioscrobbler.com/2.0/?method=track.search&track=${song}&artist=${artist}&api_key=${API_KEY}&format=json`;
  
  fetch(url)
  .then(response => response.json())
  .then(data => {
    const track = data.results.trackmatches.track[0];

    console.log(track);
    })
  .catch(error => console.error(error));
}