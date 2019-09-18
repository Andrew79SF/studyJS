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
    const menu = document.querySelector('menu');
    const body = document.querySelector('body');

    body.addEventListener('click', (event) => {
      let menu = document.querySelector('menu'),
        closeMenu = event.target.closest('menu'),
        openMenu = event.target.closest('.menu'),
        containMenu = event.target.matches('menu'),
        menuIsOpen = menu.classList.contains('active-menu');

      if (((closeMenu && !containMenu) || menuIsOpen && closeMenu == null) || openMenu) {
        handlerMenu();
      }
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
      popupBtn = document.querySelectorAll('.popup-btn');

    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        openPopUp(popup);
      });
    });

    popup.addEventListener('click', (event) => {
      let target = event.target;
      console.log(target);

      if (!target || target.classList.contains('popup-close')) {
        closePopUp(popup);
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          closePopUp(popup);
        }
      }
    });
  };

  togglePopUp();

  // Close PopUp
  const closePopUp = (popup) => {
    if (isMobile.any()) {
      fade(popup, true);
    } else {
      popup.style.display = 'none';
    }
  };

  // Open PopUp
  const openPopUp = (popup) => {
    if (isMobile.any()) {
      fade(popup, false);
    } else {
      popup.style.display = 'block';
    }
  };

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

  // Smooth Scroll
  const anchors = document.querySelectorAll('a[href*="#"]');

  anchors.forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.classList[0] === 'close-btn') {
        return;
      }
      const blockID = anchor.getAttribute('href').substr(1);
      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  // Tabs
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tabContent[i].classList.add('d-none');
          tab[i].classList.remove('active');
        }
      }
    };

    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };

  tabs();

});
