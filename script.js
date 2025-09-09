let sessions = [
  { work: 50 * 60, break: 10 * 60 },
  { work: 30 * 60, break: 5 * 60 },
  { work: 25 * 60, break: 5 * 60 }
];

let currentIndex = 0;
let isWork = true;
let remaining = sessions[currentIndex].work;
let interval;
let endTime = null;

function updateTimer() {
  if (endTime) {
    remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
  }
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  document.getElementById("timer").textContent =
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Sonraki buton yazısını güncelle
  const next = sessions[(currentIndex + 1) % sessions.length];
  document.getElementById("skip").textContent =
    `${next.work/60}dk-${next.break/60}dk`;
}

function startTimer() {
  if (!interval) {
    endTime = Date.now() + remaining * 1000;
    interval = setInterval(() => {
      updateTimer();
      if (remaining <= 0) {
        clearInterval(interval);
        interval = null;
        if (isWork) {
          // Çalışma bittiyse mola
          isWork = false;
          remaining = sessions[currentIndex].break;
          startTimer();
        } else {
          // Mola bittiyse sıradaki şablon
          isWork = true;
          currentIndex = (currentIndex + 1) % sessions.length;
          remaining = sessions[currentIndex].work;
          startTimer();
        }
      }
    }, 1000);
  }
}

document.getElementById("start").onclick = startTimer;

document.getElementById("pause").onclick = function () {
  clearInterval(interval);
  interval = null;
  endTime = null;
};

document.getElementById("reset").onclick = function () {
  clearInterval(interval);
  interval = null;
  isWork = true;
  currentIndex = 0;
  remaining = sessions[currentIndex].work;
  endTime = null;
  updateTimer();
};

document.getElementById("skip").onclick = function () {
  clearInterval(interval);
  interval = null;
  isWork = true;
  currentIndex = (currentIndex + 1) % sessions.length;
  remaining = sessions[currentIndex].work;
  endTime = null;
  updateTimer();
};

updateTimer();