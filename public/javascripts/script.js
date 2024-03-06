/** @type {HTMLInputElement} */
let topCkBox;
/** @type {HTMLInputElement} */
let bottomCkBox;
/** @type {Timeout | null} */
let updateTimer = null;
/** @type {NodeListOf<Element>} */
let updateCounters;

/**
 * decrease counters by one and reloads when counters reach zero
 * sets counter to ten if it hasn't already ben set
 * @returns {void}
 */
function timerFunc() {
  let count = parseInt(updateCounters[0].innerText);
  if (isNaN(count)) {
    count = 11;
  }

  if (count <= 0) {
    location.reload();
    updateCounters.forEach((el) => {
      el.innerText = "10";
    });
  } else {
    count--;
    updateCounters.forEach((el) => {
      el.innerText = `${count}`;
    });
  }
}

/**
 * syncs both check boxes and sets local storage to maintain state between reloads
 * @param {Event} e
 * @returns {void}
 */
function checkFunc(e) {
  topCkBox.checked = e.target.checked;
  bottomCkBox.checked = e.target.checked;

  if (e.target.checked) {
    updateCounters.forEach((el) => {
      el.innerText = "10";
    });

    if (updateTimer === null) {
      localStorage.setItem("AUTO", "TRUE");
      updateTimer = setInterval(timerFunc, 1000);
    }
  } else {
    updateCounters.forEach((el) => {
      el.innerText = "";
    });

    if (updateTimer !== null) {
      clearInterval(updateTimer);
      updateTimer = null;
      localStorage.setItem("AUTO", "FALSE");
    }
  }
}

function main() {
  topCkBox = document.querySelector("input[name='auto-top']");
  bottomCkBox = document.querySelector("input[name='auto-bottom']");
  updateCounters = document.querySelectorAll(".update-counter");

  if (localStorage.getItem("AUTO") === "TRUE") {
    if (updateTimer === null) {
      timerFunc();
      updateTimer = setInterval(timerFunc, 1000);

      topCkBox.checked = true;
      bottomCkBox.checked = true;
    }
  }

  topCkBox.addEventListener("click", checkFunc);
  bottomCkBox.addEventListener("click", checkFunc);

  document.querySelectorAll(".update-btn").forEach((el) => {
    el.addEventListener("click", () => window.location.reload());
  });
}

document.addEventListener("DOMContentLoaded", main);
