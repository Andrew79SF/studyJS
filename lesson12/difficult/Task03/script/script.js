window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Timer
  const date = new Date(),
    timerHours = document.querySelector('#timer-hours'),
    timerMinutes = document.querySelector('#timer-minutes'),
    timerSeconds = document.querySelector('#timer-seconds'),
    hours = 23 - date.getUTCHours(),
    minutes = 59 - date.getUTCMinutes(),
    seconds = 59 - date.getUTCSeconds();

  timer(hours, minutes, seconds);

  function timer(hours, minutes, seconds) {
    timerHours.textContent = hours < 10 ? '0' + hours : hours;
    timerMinutes.textContent = minutes < 10 ? '0' + minutes : minutes;
    timerSeconds.textContent = seconds < 10 ? '0' + seconds : seconds;

    seconds--;
    
    if (seconds < 0) {
      seconds = 59;
      minutes--;
    }

    if (minutes < 0) {
      minutes = 59;
      hours--;
    }

    if (hours < 0) {
      hours = 23;
    }

    setTimeout(timer, 1000, hours, minutes, seconds);
  }
});
