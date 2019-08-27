(function () {
    'use strict';

// Solution

let test = function(arg) {
	if (typeof arg !== 'string') {
		return (arg + ' - Это не строка!!! Это - ' + typeof arg);
	} else {
		let newString = arg.trim();
		if (newString.length > 30) {
			newString = newString.slice(0, 30) + '...';
		}
		return newString;
	}
};

// Test

console.log(test(true));
console.log(test(12345));
console.log(test(null));
console.log(test(undefined));
console.log(test('   Hello world!!!   '));
console.log(test('    123456789012345678901234567890123   '));

})();