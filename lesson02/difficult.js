let num = 266219;

let arr = num.toString().split('');

let mult = arr.reduce(function (previous, current) {
			return previous * current;
});

console.log(mult);

// Exponentiation
let exp = mult ** 3;

alert(exp.toString().substr(0, 2));