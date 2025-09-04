const imageUrl = "target.png";
let width = window.innerWidth > 0 ? window.innerWidth : screen.width;
let height = window.innerHeight > 0 ? window.innerHeight : screen.height;
let xValue = 0;
let yValue = 0;

let timerValue = 30;
let errorPenalty = 3;
let targetClicked = 3;

const intervalId = setInterval(function () {
  timerValue -= 1;
  updateGame();
}, 1000);

const gameContainer = document.querySelector(".game-container");

console.log(gameContainer);

// const targetImage = `<img src="${imageUrl}" style="height: 100px; width: 100px;">`;

function getRandomLocation() {
  xValue = Math.floor(Math.random() * width);
  yValue = Math.floor(Math.random() * height);
}

function createTarget() {
  getRandomLocation();
  const targetImage = `<img src=${imageUrl} id="target" style="position: absolute; height: 100px; width: 100px; top: ${yValue}px; left: ${xValue}px">`;
  gameContainer.innerHTML += targetImage;
}

function updateTarget() {
  getRandomLocation();
  const target = document.querySelector("#target");
  const computedStyle = window.getComputedStyle(target);
  computedStyle.top = yValue;
  computedStyle.left = xValue;
}

function updateGame() {
  const timer = document.querySelector("#timer");
  timer.innerText = timerValue;
}

const onClick = (e) => {
  if (e.srcElement.id == "target") {
    timerValue += targetClicked;
    console.log("target");
  } else if (e.srcElement.id == "game-container") {
    timerValue -= targetClicked;
    console.log("missed");
  }

  updateTarget();
  updateGame();
};

document.addEventListener("click", onClick);

createTarget();
