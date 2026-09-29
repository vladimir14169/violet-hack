// ---------- Обратный отсчёт до старта ----------
// 5 ноября 2026, 12:00 по Киеву (в ноябре Киев живёт по UTC+2)
const START = new Date("2026-11-05T12:00:00+02:00");

function pad(n) {
  return String(n).padStart(2, "0");
}

function updateCountdown() {
  const diff = START - new Date();

  if (diff <= 0) {
    document.getElementById("countdown").innerHTML = "<p>Хакатон начался! 🚀</p>";
    clearInterval(timer);
    return;
  }

  document.getElementById("days").textContent = pad(Math.floor(diff / 86400000));
  document.getElementById("hours").textContent = pad(Math.floor(diff / 3600000) % 24);
  document.getElementById("minutes").textContent = pad(Math.floor(diff / 60000) % 60);
  document.getElementById("seconds").textContent = pad(Math.floor(diff / 1000) % 60);
}

const timer = setInterval(updateCountdown, 1000);
updateCountdown();

// ---------- Проверка заданий ----------
const tasks = document.querySelectorAll(".task");
const solvedCounter = document.getElementById("solved");
document.getElementById("total").textContent = tasks.length;

tasks.forEach((task) => {
  const form = task.querySelector("form");
  const input = task.querySelector("input");
  const result = task.querySelector(".result");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // не перезагружать страницу

    const answer = input.value.trim().toLowerCase();

    if (answer === task.dataset.answer) {
      result.textContent = "✓ Верно! Доступ разрешён.";
      result.className = "result ok";
      task.classList.add("solved");
      input.disabled = true;
    } else {
      result.textContent = "✗ Доступ запрещён. Попробуй ещё.";
      result.className = "result fail";
    }

    solvedCounter.textContent = document.querySelectorAll(".task.solved").length;
  });
});
