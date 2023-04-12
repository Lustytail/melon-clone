import "../scss/styles.scss";
import "./list.js";
// import "../img/그대라는 시.jpeg";
// import "../img/겨울잠.jpeg";
// import "../img/응급실.jpeg";
// import "../img/INVU.jpeg";
// import "../img/Love Dive.jpeg";
// import "../img/Love letter.jpeg";
// import "../img/드라마.jpeg";
function importAll(r) {
    r.keys().forEach(r);
  }
  
  importAll(require.context('../img/', true, /\.(jpe?g|svg)$/));


console.log("hi");
