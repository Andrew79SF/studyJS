'use strict';

// TASK 1

let lang = confirm('Выберите язык. "OK" - Русский, "Cancel" - Английский') ?
	'ru' : 'en';

if (lang == 'ru') {
	console.log('Понедельник, Вторник, Среда, Четверг...');
} else {
	console.log('Monday, Tuesday, Wednesday, Thursday...');
}

switch (lang) {
	case 'ru':
		console.log('Понедельник, Вторник, Среда, Четверг...');
		break;
	case 'en':
		console.log('Monday, Tuesday, Wednesday, Thursday...');
}

let arr = {
	'en': ['Monday, Tuesday, Wednesday, Thursday...'],
	'ru': ['Понедельник, Вторник, Среда, Четверг...']
};
console.log(arr[lang]);

// TASK 2

let namePerson = prompt('Введите имя (Артем, Максим или другое)');

let message = (namePerson == 'Артем') ? 'директор' :
	(namePerson == 'Максим') ? 'преподаватель' : 'студент';
console.log(message);