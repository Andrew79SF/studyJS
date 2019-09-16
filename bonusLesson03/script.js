'use strict';

const btnNewColor = document.querySelector('#change'),
	body = document.querySelector('body'),
	textColor = document.querySelector('#color');

let setNewColor = () => {
		let newColor = Math.floor(Math.random() * 0xFFFFFF),
		decToHex = Number(newColor).toString(16).toUpperCase();

		if (decToHex.length < 6) {
			for (let i = 0; i < 7 - decToHex.length; i++) {
				decToHex = '0' + decToHex;
			}
		}
		
		body.style.backgroundColor = `#${decToHex}`;
		textColor.innerHTML = `#${decToHex}`;
};

btnNewColor.addEventListener('click', setNewColor);
