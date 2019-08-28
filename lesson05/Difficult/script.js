(function () {
    'use strict';

// Task 1

let arr = ['145', '2076', '30654', '220', '500', '404', '25001'];

for (let i = 0; i < arr.length; i++) {
	let num = arr[i].slice(0, 1);
	if (num == '2' || num == '4') {
		console.log(arr[i]);
	}
}

// Task 2
console.log();

let temp = true;

for (let x = 2; x <= 100; x++) {
	for (let y = 2; y < x; y++) {
		if ((x % y) == 0 && x !== 2) {
			temp = false;
			break;
		} else {
			temp = true;
		}
	}
	if (temp) {
		console.log(x + ' : Делители этого числа 1 и ' + x);
	}
}

})();