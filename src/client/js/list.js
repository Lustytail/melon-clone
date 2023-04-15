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
  if( document.querySelector(`#${artist}_${id}`) == null) {

    const element = document.createElement("div");

    const src = "static/img/" + id + ".jpeg";

    element.classList.add("song", "fx", "fade-in");
    element.id = artist+"_"+id;
    /* element.innerHTML = `
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
    */

    const text_div = document.createTextNode("");

    const img_div = document.createElement("div");
    img_div.classList.add("song-img");
    const img = document.createElement("img");
    img.classList.add("img-round");
    img.src = src;
    img_div.appendChild(img);


    const info_div = document.createElement("div");
    info_div.classList.add("song-text", "fx");
    const artist_div = document.createElement("div");
    const song_h3 = document.createElement("h3");
    artist_div.classList.add("song-info");
    song_h3.classList.add("song-info", "song-name");
    artist_div.innerText = artist;
    song_h3.innerText = song;
    info_div.appendChild(artist_div);
    info_div.appendChild(song_h3);

    const btn_div = document.createElement("div");
    btn_div.classList.add("song-btn");
    const btn_btn = document.createElement("button");
    btn_btn.classList.add("custom-btn", "btn-2");
    btn_btn.id = id;
    btn_btn.innerText = "▶";
    btn_div.appendChild(btn_btn);

    const span_div = document.createElement("span");
    span_div.classList.add("close");

    element.appendChild(text_div);
    element.appendChild(img_div);
    element.appendChild(info_div);
    element.appendChild(btn_div);
    element.appendChild(span_div);


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
  const usrId = (this).id;

  for(var i=0; i<=list.length-1;i++) {
    const artist = list[i].childNodes[2].childNodes[0].innerText;
    const song = list[i].childNodes[2].childNodes[1].innerText;
    const id = list[i].childNodes[3].childNodes[0].id;

    const track = {
      "song" : song,
      "artist" : artist,
      "ytube_id": id
    };

    saveData.push(track);
    console.log(track);
  }

  console.log(saveData);

  const sendData = 
    fetch("/save", {
      method: "post",
      headers: {
        "Content-type": "application/json",
        "usrId": usrId
      },
      body: JSON.stringify({
        "usrId": usrId,
        "tracks": saveData
      } )
    }).then((response) => {
      if(response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    }).then((json) => {
      alert(json.msg);
    }).catch(function (err){
      alert("I can't save playlist.");
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