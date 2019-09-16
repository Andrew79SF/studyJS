window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Identify Mobile Device
  let isMobile = {
    Android: () => {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: () => {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: () => {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: () => {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: () => {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: () => {
      return (isMobile.Android() || isMobile.BlackBerry() ||
        isMobile.iOS() || isMobile.Opera() || isMobile.Windows()) === null;
    }
  };

  // Timer
  const deadLine = '20 october 2019';

  setInterval(() => {
    let timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds'),
      dateStop = new Date(deadLine).getTime(),
      dateNow = new Date().getTime(),
      timeRemaining = (dateStop - dateNow) / 1000;

    timeRemaining = timeRemaining < 0 ? 0 : timeRemaining;

    let setTime = (timeRemaining) => {
      let seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);

      timerHours.textContent = hours < 10 ? '0' + hours : hours;
      timerMinutes.textContent = minutes < 10 ? '0' + minutes : minutes;
      timerSeconds.textContent = seconds < 10 ? '0' + seconds : seconds;
    };

    setTime(timeRemaining);
  }, 1000, deadLine);

  // Menu
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul>li');

    btnMenu.addEventListener('click', () => {
      handlerMenu();
    });
    closeBtn.addEventListener('click', () => {
      handlerMenu();
    });
    menuItems.forEach((item) => {
      item.addEventListener('click', () => {
        handlerMenu();
      });
    });

    const handlerMenu = () => {
      if (isMobile.any()) {
        menu.classList.toggle('active-menu');
      } else {
        if (!menu.style.transform) {
          menu.style.transform = 'translate(0)';
        } else {
          menu.style.transform = '';
        }
      }
    };
  };

  toggleMenu();

  // PopUp
  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popUpClose = document.querySelector('.popup-close');

    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        if (isMobile.any()) {
          fade(popup, false);
        } else {
          popup.style.display = 'block';
        }
      });
    });
    popUpClose.addEventListener('click', () => {
      if (isMobile.any()) {
        fade(popup, true);
      } else {
        popup.style.display = '';
      }
    });
  };

  togglePopUp();

  // PopUp Animation
  const fade = (popup, fade) => {
    let count = 50,
      op = 0;
    if (!fade) {
      popup.style.opacity = 0;
      popup.style.display = 'block';
    } else {
      op = 1;
    }
    let idInterval = setInterval(() => {
      op = fade ? op - 0.02 : op + 0.02;
      popup.style.opacity = op;
      count--;
      if (count < 0) {
        clearInterval(idInterval);
        if (fade) {
          popup.style.display = 'none';
          popup.style.opacity = 1;
        }
      }
    }, 5);
  };

});
