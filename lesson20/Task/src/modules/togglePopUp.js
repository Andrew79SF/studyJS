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

const openPopUp = (popup) => {
	if (isMobile.any()) {
		fade(popup, false);
	} else {
		popup.style.display = 'block';
	}
};

const closePopUp = (popup) => {
	if (isMobile.any()) {
		fade(popup, true);
	} else {
		popup.style.display = 'none';
	}

	const form3 = document.getElementById('form3');
	const allInput = form3.querySelectorAll('input');
	allInput.forEach((elem) => {
		elem.classList.remove('success');
		elem.classList.remove('error');
		if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
			elem.nextElementSibling.remove();
		}
		elem.value = '';
	});
};

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

export default togglePopUp;