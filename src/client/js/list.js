import "../scss/styles.scss";


/* 차트, 플레이리스트 toggle 구현 */
const chart_t = document.querySelector("#chart-title");
const plist_t = document.querySelector("#playlist-title");

console.log(chart_t);
console.dir(plist_t);
const chart_div = document.querySelector("#chart-div");
const plist_div = document.querySelector("#playlist-div");
const save_btn = document.querySelector(".save");

function chartTitleClick() {
  chart_t.classList.remove("color-disable");
  chart_div.classList.remove("hide");
  
  plist_div.classList.add("hide");
  plist_t.classList.add("color-disable");
  save_btn.classList.add("hide");

}

function plistTitleClick() {
  plist_div.classList.remove("hide");
  plist_t.classList.remove("color-disable");
  save_btn.classList.remove("hide");
  
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

  //console.dir(plist_div.querySelector(`#${song}_${artist}`));
  if(plist_div.querySelector(`#${song}_${artist}`) == null) {

    const element = document.createElement("div");

    const src = "static/img/" + song + ".jpeg";

    element.classList.add("song", "fx", "fade-in");
    element.id = song+"_"+artist;
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
    <span class="close"></span>
    `;

    element.querySelector(".custom-btn").addEventListener("click",playMusic);
    element.querySelector(".close").addEventListener("click",delClick);

    plist_div.appendChild(element);
  }
}

/* 찜하기 기능 구현 */
const like_img = document.querySelectorAll(".img-btn");

function likeImgClick() {
  const parent = (this).parentNode.parentNode;
  const artist = parent.childNodes[2].childNodes[0].innerText;
  const song = parent.childNodes[2].childNodes[1].innerText;
  const id = (this).id;

  addplaylist(song, artist, id);
  console.log(song + " " + artist + " " + id);
}

[].forEach.call(like_img, function(button) {
  button.addEventListener("click",likeImgClick);
})


/* 찜 리스트 삭제 */
const del = document.querySelectorAll(".close");

function delClick() {
  const parent = (this).parentNode.parentNode;
  const this_node = (this).parentNode;
  parent.removeChild(this_node);
}

[].forEach.call(del, function(button) {
  button.addEventListener("click",delClick);
})


/* 플레이리스트 저장하기 */
const save = document.querySelector(".save-btn");

function savePlayList() {
  const list = document.querySelector("#playlist-div").childNodes;
  console.dir(list);
  let saveData = [];

  for(var i=0; i<=list.length-1;i++) {
    console.dir(list[i]);
    const artist = list[i].childNodes[3].childNodes[1].innerText;
    const song = list[i].childNodes[3].childNodes[3].innerText;
    const id = list[i].childNodes[5].childNodes[1].id;

    const track = {
      "song" : song,
      "artist" : artist,
      "ytube_id": id
    };

    console.log(track);
    saveData.push(track);
  }

  console.log(saveData);

  $.ajax({
    url: "/save",
    method: "post",
    data: {
      id: (this).id,
      tracks: JSON.stringify(saveData)
    },
    sucess: (result) => {
        console.log(result);
    }
  });
/*
  var form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("action","/save");

  var inputId = document.createElement("input");
  inputId.setAttribute("name", "id");
  inputId.setAttribute("value", (this).id);
  inputId.setAttribute("type", "hidden");
  form.appendChild(inputId);

  var inputTrack = document.createElement("input")
  inputTrack.setAttribute("name", "tracks");
  inputTrack.setAttribute("value", saveData.toString());
  inputTrack.setAttribute("type", "hidden");
  form.appendChild(inputTrack);

  console.dir(form);

  document.body.appendChild(form);
  //form.submit();
  */
}
save.addEventListener("click",savePlayList);









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