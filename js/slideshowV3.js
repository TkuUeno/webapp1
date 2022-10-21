
const Suf = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19'];
const Min = 1;
const Max = 19;

const mainElement = document.querySelector("div.main>img");
const thumbnailsElement = document.querySelector("div.thumbnails");

let count = 1;

// let timer;
const Interval = 1000;
let nowPlaying = false;


window.onload = function() {
  thumbnailsElement.children[0].classList.add('selected');
}

// common functions: posのサムネイルのselectedクラス除去
function removeSelected() {
  thumbnailsElement.children[count-1].classList.remove('selected');
}
// common functions: posのサムネイルにselectedクラス付与
function addSelcted() {
  thumbnailsElement.children[count-1].classList.add('selected');
}
// common functions: メイン写真セットとサムネイル選択
function setMain() {
  url = "https://www.takushoku-u.ac.jp/summary/images/summary_successive-chancellor_img_" + Suf[count-1] + ".jpg";
  mainElement.setAttribute('src', url);

  addSelcted();
}

// 次の写真へ
const nxt = document.querySelector("#right")  // #next
function next() {
  // 現selectedをクリア
  removeSelected();
  // 移動（next）
  ++count;
  if (count > Max) {
    count = Min;
  }

  // メイン写真セットとサムネイル選択
  setMain();
}
nxt.addEventListener('click', next);

// まえの写真へ
const prv = document.querySelector("#left")  // #prev
function prev() {
  // 現selectedをクリア
  removeSelected();
  // 移動（next）
  --count;
  if (count < Min) {
    count = Max;
  }

  // メイン写真セットとサムネイル選択
  setMain();
}
prv.addEventListener('click', prev);


function autoPlay() {
  next();
  timer = setTimeout(autoPlay, Interval);
}

const ply = document.querySelector("#play")
function play() {
  if (!nowPlaying) {

    nowPlaying = true;

    setTimeout(autoPlay, Interval); // Interval待って自動再生を呼び出し
    // autoPlay();  // すぐに呼び出し→ボタンを押した瞬間、次の写真になる
    
  }
}
ply.addEventListener('click', play);

const stp = document.querySelector("#stop")
function stop() {
  clearTimeout(timer);
  nowPlaying = false;
}
stp.addEventListener('click', stop);

rst = document.querySelector('#reset');
function reset() {
  stop();

  removeSelected();
  count = 1;
  setMain();
}
rst.addEventListener('click', reset);
