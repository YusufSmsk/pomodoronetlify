let duration = 50 * 60;
let remaining = duration;
let interval;

function updateTimer() {
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  document.getElementById("timer").textContent =
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

document.getElementById("start").onclick = function () {
  if (!interval) {
    interval = setInterval(() => {
      if (remaining > 0) {
        remaining--;
        updateTimer();
      } else {
        clearInterval(interval);
        interval = null;
        document.getElementById("timer").textContent = "00:00";
      }
    }, 1000);
  }
};

document.getElementById("pause").onclick = function () {
  clearInterval(interval);
  interval = null;
};

document.getElementById("reset").onclick = function () {
  clearInterval(interval);
  interval = null;
  remaining = duration;
  updateTimer();
};

updateTimer();