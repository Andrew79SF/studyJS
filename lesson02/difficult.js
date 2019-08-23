let num = 266219,
		arr = num.toString().split(''),
		mult = arr.reduce(function (previous, current) {
			return previous * current;
		});

console.log(mult);

// Exponentiation
let exp = mult ** 3;

alert(exp.toString().substr(0, 2));