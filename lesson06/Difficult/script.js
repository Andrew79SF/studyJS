(function () {
    'use strict';

let week = ['Понедельник', 'Вторник', 'Среда', 'Четверг',
	 'Пятница', 'Суббота', 'Воскресенье'];

let date = new Date();
let weekDay = date.getDay() - 1;

for (let i = 0; i < week.length; i++) {
	if (weekDay == i) {
		document.write('<b>' + week[i] + '</b></br>');
	} else if (i < 5) {
			document.write(week[i] + '</br>');
	} else {
		document.write('<i>' + week[i] + '</i></br>');
	}
}

})();