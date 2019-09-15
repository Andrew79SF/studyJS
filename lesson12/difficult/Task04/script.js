'use strict';

let fish = document.querySelector('.fish'),
  elem = document.querySelector('#elem'),
  startBtn = document.querySelector('#start'),
  resetBtn = document.querySelector('#reset'),
	backBtn = document.querySelector('#back'),
  statusStart = false,
	countX = 0,
	countY = 25,
	down = true,
  idAnimate,
	reverse = false,

	swimAnimate = function () {
		countX = getCountX(countX);
		countY = getCountY(countY);
		fish.style.left = countX + 'vw';
		fish.style.top = countY + 'vh';
		idAnimate = requestAnimationFrame(swimAnimate);
	};

elem.style.transform = 'scaleX(-1)';

startBtn.addEventListener('click', start);
resetBtn.addEventListener('click', reset);
backBtn.addEventListener('click', back);

function start() {
  if (!statusStart) {
    statusStart = true;
		idAnimate = requestAnimationFrame(swimAnimate);
  } else {
    statusStart = false;
    cancelAnimationFrame(idAnimate);
  }
}

function reset() {
	if (reverse) {
		back();
	}
	countX = 0;
	countY = 25;
  if (statusStart) {
    cancelAnimationFrame(idAnimate);
    statusStart = false;
  }
	fish.style.left = countX + 'vw';
	fish.style.top = countY + 'vh';
}

function back() {
  if (!reverse) {
    elem.style.transform = '';
    reverse = true;
  } else {
    elem.style.transform = 'scaleX(-1)';
		reverse = false;
	}
}

function getCountX(countX) {
	countX = (reverse) ? countX - 0.14 : countX + 0.14;
	if (countX < 0 || countX > 83) {
		back();
	}
	return countX;
}

function getCountY(countY) {
	if (countY < 35 && down) {
	  countY += 0.1;
	} else if (countY > 25) {
	  down = false;
	  countY -= 0.1;
	} else {
	  down = true;
	}
	return countY;
}