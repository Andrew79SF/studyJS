'use strict';

let date = newDate();

document.body.setAttribute
	('style', 'margin-top: 100px;' +
	'color: red; font-weight: bold; font-size: 22px; text-align: center');

document.body.innerHTML = date;


function newDate() {
		let date = new Date(),
			newDate = [];

		newDate.push(date.getHours());
		newDate.push(date.getMinutes());
		newDate.push(date.getSeconds());
		newDate.push(date.getDate());
		newDate.push(date.getMonth() + 1);
		newDate.push(date.getFullYear());

		newDate.forEach(function(element, index) {
			if (element < 10) {
				newDate[index] = '0' + element;
			}
		});

		return (newDate[0] + ':' + newDate[1] + ':' + newDate[2] + ' ' +
			newDate[3] + '.' + newDate[4] + '.' + newDate[5]);
}