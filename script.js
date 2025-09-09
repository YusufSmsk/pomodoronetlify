let sessions = [
  { work: 50 * 60, break: 10 * 60 }, // 50 dk ders, 10 dk mola
  { work: 30 * 60, break: 5 * 60 }   // 30 dk ders, 5 dk mola
];

let currentSession = 0;
let isWork = true;
let remaining = sessions[currentSession].work;
let interval;
let endTime = null;

function updateTimer() {
  if (endTime) {
    remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
  }
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  document.getElementById("timer").textContent =
    `${isWork ? "Çalış" : "Mola"} - ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
  if (!interval) {
    endTime = Date.now() + remaining * 1000;
    interval = setInterval(() => {
      updateTimer();
      if (remaining <= 0) {
        clearInterval(interval);
        interval = null;
        // Çalışma -> Mola geçişi
        if (isWork) {
          isWork = false;
          remaining = sessions[currentSession].break;
          startTimer();
        } else {
          // Mola bittiyse yeni şablona geç
          isWork = true;
          currentSession = (currentSession + 1) % sessions.length;
          remaining = sessions[currentSession].work;
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
  currentSession = 0;
  remaining = sessions[currentSession].work;
  endTime = null;
  updateTimer();
};

updateTimer();