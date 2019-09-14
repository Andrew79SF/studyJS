window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Timer
  const deadLine = '15 september 2019';

  setInterval(function () {
    let timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds'),
      dateStop = new Date(deadLine).getTime(),
      dateNow = new Date().getTime(),
      timeRemaining = (dateStop - dateNow) / 1000;

    timeRemaining = timeRemaining < 0 ? 0 : timeRemaining;

    setTime(timeRemaining);

    function setTime(timeRemaining) {
      let seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);

      timerHours.textContent = hours < 10 ? '0' + hours : hours;
      timerMinutes.textContent = minutes < 10 ? '0' + minutes : minutes;
      timerSeconds.textContent = seconds < 10 ? '0' + seconds : seconds;
    }
  }, 1000, deadLine);
});
