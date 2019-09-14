window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const dayWeek = document.querySelector('#day-week'),
    time = document.querySelector('#time'),
    dayTime = document.querySelector('#day-time'),
    nyDay = document.querySelector('#ny-day'),
		dateNY = new Date('1 january 2020').getTime();
		
		setInterval(counter, 1000);

  function counter() {
    let date = new Date(),
      timeRemaining = dateNY - date.getTime(),
      hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds(),
      day = date.getDay(),
      amPmValue = hours > 11 ? 'PM' : 'AM',
      dayTimeValue = getDayTime(hours);

    day = getDay(day);

    timeRemaining = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);

    hours = hours > 12 ? hours - 12 : hours;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    dayWeek.textContent = day;
    time.textContent = `${hours}:${minutes}:${seconds} ${amPmValue}`;
    dayTime.textContent = dayTimeValue;
    nyDay.textContent = timeRemaining;
  }

  function getDayTime(hours) {
    if (hours > 4 && hours < 11) {
      return 'Доброе утро';
    } else if (hours > 10 && hours < 17) {
      return 'Добрый день';
    } else if (hours > 16 & hours < 23) {
      return 'Добрый вечер';
    } else {
      return 'Доброй ночи';
    }
  }

  function getDay(day) {
    switch (day) {
      case 0:
        return 'Понедельник';
      case 1:
        return 'Вторник';
      case 2:
        return 'Среда';
      case 3:
        return 'Четверг';
      case 4:
        return 'Пятница';
      case 5:
        return 'Суббота';
      case 6:
        return 'Воскресенье';
    }
  }
});