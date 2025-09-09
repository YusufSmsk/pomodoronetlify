let duration = 50 * 60; // 50 dakika
let remaining = duration;
let interval;
let endTime = null;

function updateTimer() {
  const now = Date.now();
  if (endTime) {
    remaining = Math.max(0, Math.floor((endTime - now) / 1000));
  }
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  document.getElementById("timer").textContent =
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

document.getElementById("start").onclick = function () {
  if (!interval) {
    endTime = Date.now() + remaining * 1000;
    interval = setInterval(() => {
      updateTimer();
      if (remaining <= 0) {
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
  endTime = null;
};

document.getElementById("reset").onclick = function () {
  clearInterval(interval);
  interval = null;
  remaining = duration;
  endTime = null;
  updateTimer();
};

updateTimer();