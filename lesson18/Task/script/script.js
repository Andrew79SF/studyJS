document.addEventListener('DOMContentLoaded', () => {
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

    document.body.addEventListener('click', (event) => {
      let closeMenu = event.target.closest('menu'),
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
    const popup = document.querySelector('.popup');

    document.body.addEventListener('click', (event) => {
      const openTarget = event.target.matches('.popup-btn'),
        closeTarget = event.target.matches('.popup-close'),
        notTarget = event.target.matches('.popup');

      if (openTarget) {
        openPopUp(popup);
      }
      if (closeTarget || notTarget) {
        closePopUp(popup);
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

    document.getElementById('form3-name').value = '';
    document.getElementById('form3-phone').value = '';
    document.getElementById('form3-email').value = '';
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
  document.body.addEventListener('click', (event) => {
    let target = event.target,
      targetHref = target.closest('a[href*="#"]');

    if (target.matches('.close-btn') || target.matches('.portfolio-btn') ||
      target.closest('footer') != null) {
      return;
    }

    if (targetHref) {
      if (targetHref.matches('a[href*="#"]')) {
        event.preventDefault();
        const blockID = targetHref.getAttribute('href').substr(1);
        document.getElementById(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
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

  // Slider
  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
      dot = document.querySelectorAll('.dot'),
      slider = document.querySelector('.portfolio-content');

    let currentSlide = 0,
      interval;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();

      let target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;

      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      } else if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    });

    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') ||
        event.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') ||
        event.target.matches('.dot')) {
        startSlide();
      }
    });

    startSlide(3000);
  };

  // Add dots
  const qtySlides = document.querySelectorAll('.portfolio-item').length;
  let ul = document.querySelector('.portfolio-dots');

  for (let i = 0; i < qtySlides; i++) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(''));
    li.setAttribute('class', 'dot');
    ul.appendChild(li);
  }

  let li = document.querySelector('.dot');
  li.setAttribute('class', 'dot dot-active');

  // Start Slider
  slider();

  // Change Image by mouse (Our command)
  const img = document.querySelector('.command');
  let src;

  img.addEventListener('mouseover', (event) => {
    if (event.target.closest('.quote') == null) {
      src = event.target.src;
      event.target.src = event.target.dataset.img;
    }
  });

  img.addEventListener('mouseout', (event) => {
    if (event.target.closest('.quote') == null) {
      event.target.src = src;
    }
  });

  //  Check Calculator inputs
  const calcBlock = document.querySelector('.calc-block');

  calcBlock.addEventListener('keypress', (event) => {
    let keyCode = event.keyCode;
    if (!/[0-9]/.test(String.fromCharCode(keyCode))) {
      event.preventDefault();
    }
  });

  // Calculator ******************************************
  let idChange;
  const calc = (price = 100) => {

    const calcType = document.querySelector('.calc-type'),
      calcSquare = document.querySelector('.calc-square'),
      calcDay = document.querySelector('.calc-day'),
      calcCount = document.querySelector('.calc-count'),
      totalValue = document.getElementById('total');

    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value;
      let squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      } else if (calcCount.value == '0') {
        countValue = 0;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = Math.round(price * typeValue * squareValue * countValue * dayValue);
      }

      // Эффект перечисления чисел 
      let newTotal = totalValue.textContent;

      const changeTotal = () => {
        if (total > newTotal) {
          newTotal++;
        } else if (total < newTotal) {
          newTotal--;
        } else {
          clearInterval(idChange);
        }
        totalValue.textContent = newTotal;
      };

      if (idChange) {
        clearInterval(idChange);
      }

      idChange = setInterval(changeTotal);
    };

    calcBlock.addEventListener('change', (event) => {
      const target = event.target;

      if (target === calcType || target === calcSquare ||
        target === calcDay || target === calcCount) {
        countSum();
      }
    });
  };

  calc(100);

  // Validator
  const valid1 = new Validator({
    selector: '#form1',
    pattern: {
      phone: /^\+7\d{10}$/,
      name: /[а-яё]+/i
    },
    method: {
      'form1-name': [
        ['notEmpty'],
        ['pattern', 'name']
      ],
      'form1-phone': [
        ['notEmpty'],
        ['pattern', 'phone']
      ],
      'form1-email': [
        ['notEmpty'],
        ['pattern', 'email']
      ]
    }
  });

  const valid2 = new Validator({
    selector: '#form2',
    pattern: {
      phone: /^\+7\d{10}$/,
      name: /[а-яё]+/i,
      message: /[а-яё]+/i
    },
    method: {
      'form2-name': [
        ['notEmpty'],
        ['pattern', 'name']
      ],
      'form2-phone': [
        ['notEmpty'],
        ['pattern', 'phone']
      ],
      'form2-email': [
        ['notEmpty'],
        ['pattern', 'email']
      ],
      'form2-message': [
        ['notEmpty'],
        ['pattern', 'message']
      ]
    }
  });

  const valid3 = new Validator({
    selector: '#form3',
    pattern: {
      phone: /^\+7\d{10}$/,
      name: /[а-яё]+/i
    },
    method: {
      'form3-name': [
        ['notEmpty'],
        ['pattern', 'name']
      ],
      'form3-phone': [
        ['notEmpty'],
        ['pattern', 'phone']
      ],
      'form3-email': [
        ['notEmpty'],
        ['pattern', 'email']
      ]
    }
  });

  valid1.init();
  valid2.init();
  valid3.init();

  // send-ajax-form
  const sendForm = () => {
    const errorMessage = '<img src = "./images/status/error.png" height = "150vh">',
      loadMessage = '<img src = "./images/status/loading.gif" height = "70vh">',
      successMessage = '<img src = "./images/status/success.png" height = "70vh">';

    const form = document.querySelector('body');

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem;';
    statusMessage.style.color = 'white';

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const hasError = event.target.querySelector('.error') !== null;
      if (hasError) {
        return;
      }

      let target = event.target;

      target.appendChild(statusMessage);

      statusMessage.innerHTML = loadMessage;

      const formData = new FormData(target);
      let body = {};

      formData.forEach((val, key) => {
        body[key] = val;
      });

      postData(body)
        .then(() => {
          statusMessage.innerHTML = successMessage;
          // Clear all inputs
          const allInput = document.querySelectorAll('input');
          allInput.forEach((elem) => {
            elem.value = '';
          });
        })
        .catch((error) => {
          statusMessage.innerHTML = errorMessage;
          console.error(error);
        });
    });

    const postData = (body) => {
      return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();

        request.addEventListener('readystatechange', () => {

          if (request.readyState !== 4) {
            return;
          }
          if (request.status === 200) {
            resolve();
          } else {
            reject(request.status);
          }
        });

        request.open('POST', './server.php');
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(body));
      });
    };

  };

  sendForm();

  // Check inputs: Name, Email, Phone, Message
  document.body.addEventListener('keypress', (event) => {
    const target = event.target.getAttribute('name'),
      targetValue = event.target.value,
      keyValue = event.key;

    if (target === 'user_name' || target === 'user_message') {
      if (!/[а-я А-Я]/.test(keyValue)) {
        event.preventDefault();
      }
    }
    if (target === 'user_phone') {
      if (!/[0-9+]/.test(keyValue)) {
        event.preventDefault();
      } else {
        if (targetValue.length > 0 && keyValue === '+') {
          event.preventDefault();
        }
      }
    }
    if (target === 'user_email') {
      if (target === 'user_email') {
        if (!/[0-9a-zA-Z@!#$%&'*+-/=?^_`{}|~]/.test(keyValue)) {
          event.preventDefault();
        }
      }
    }
  });
});