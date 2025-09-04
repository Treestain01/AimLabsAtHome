const imageUrl = "target.png";
let width = window.innerWidth > 0 ? window.innerWidth : screen.width;
let height = window.innerHeight > 0 ? window.innerHeight : screen.height;
let xValue = 0;
let yValue = 0;
const targetDiameter = 100;

let timerValue = 30;
let errorPenalty = 3;
let targetClicked = 3;

let totalClicks = 0;
let targetsHit = 0;
let lastTargetsHit = 0;
let targetsPerSec = 0;

const intervalId = setInterval(function () {
  timerValue -= 1;
  targetsPerSec = targetsHit - lastTargetsHit;
  lastTargetsHit = targetsHit;
  updateGame();
  updateStatsWidget();
}, 1000);

const gameContainer = document.querySelector(".game-container");

function getRandomLocation() {
  xValue = Math.floor(Math.random() * (width - targetDiameter));
  yValue = Math.floor(Math.random() * (height - targetDiameter));
}

function createTarget() {
  getRandomLocation();
  const targetImage = `<img src=${imageUrl} id="target" style="position: absolute; height: ${targetDiameter}px; width: ${targetDiameter}px; top: ${yValue}px; left: ${xValue}px">`;
  gameContainer.innerHTML += targetImage;
}

function updateTarget() {
  getRandomLocation();
  const target = document.querySelector("#target");
  target.style.top = yValue + "px";
  target.style.left = xValue + "px";
}

function updateGame() {
  if (timerValue <= 0) {
    clearInterval(intervalId);
    alert("Game Over");
    location.reload();
    return;
  }

  const timerLabel = document.querySelector("#timerlabel");
  const timerbar = document.querySelector("#timerbar");

  timerLabel.innerText = timerValue;
  timerbar.style.width = (timerValue / 30) * 100 + "%";
}

function updateStatsWidget() {
  const accuracy =
    totalClicks > 0 ? ((targetsHit / totalClicks) * 100).toFixed(1) : 0;
  document.getElementById("targets-per-sec").innerText = targetsPerSec;
  document.getElementById("accuracy").innerText = `${accuracy}%`;
}

const onClick = (e) => {
  totalClicks++;
  if (e.srcElement.id == "target") {
    targetsHit++;
    timerValue += targetClicked;
    if (timerValue > 30) timerValue = 30;
    updateTarget();
  } else if (e.srcElement.id == "game-container") {
    timerValue -= targetClicked;
  }
  updateGame();
};

document.addEventListener("click", onClick);

createTarget();
