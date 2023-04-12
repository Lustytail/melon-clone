import "../scss/styles.scss";


/* 차트, 플레이리스트 toggle 구현 */
const chart_t = document.querySelector("#chart-title");
const plist_t = document.querySelector("#playlist-title");

console.log(chart_t);
console.dir(plist_t);
const chart_div = document.querySelector("#chart-div");
const plist_div = document.querySelector("#playlist-div");

function chartTitleClick() {
  chart_t.classList.remove("color-disable");
  chart_div.classList.remove("hide");
  
  plist_div.classList.add("hide");
  plist_t.classList.add("color-disable");

  addplaylist("song", "artist", "idid");
}

function plistTitleClick() {
  plist_div.classList.remove("hide");
  plist_t.classList.remove("color-disable");
  
  chart_div.classList.add("hide");
  chart_t.classList.add("color-disable");
}

chart_t.addEventListener("click",chartTitleClick);
plist_t.addEventListener("click",plistTitleClick);


/* play button 구현 */
const btn = document.querySelectorAll(".custom-btn");

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


/* 블록 만들기 */
function addplaylist(song, artist, id) {

  if(plist_div.querySelector("#idid") == null) {

    const element = document.createElement("div");

    const src = "static/img/" + song + ".jpeg";

    element.classList.add("song", "fx", "fade-in");
    element.id = id;
    element.innerHTML = `
    ${element.innerHTML}
    <div class="song-img">
      <img class="img-round" src=${src}></img>
    </div>
    <div class="song-text fx">
      <div class="song-info">${artist}</div>
      <h3 class="song-info">${song}</h3>
    </div>
    <div class="song-btn">
      <button class="custom-btn btn-2" id=${id}>▶</button>
    </div>
    `;

    element.onclick = function() {
      plist_div.removeChild(this);
    }

    plist_div.appendChild(element);
  }
}

/* 찜하기 기능 구현 */
/*
const like_btn = document.querySelector("#like-btn");

function likeBtnClick() {

}

like_btn.addEventListener("click",likeBtnClick);
*/












/* 미사용 */

/*last.fm api key */
const API_KEY = '80cd9d5efe057bdfe5c8cc78ae900887';

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