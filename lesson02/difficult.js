let num = 266219;

let arr = (num + '').split('');
let mult = 1;

for (let i = 0; i < arr.length; i++) {
	mult *= arr[i];
}

console.log(mult);

// Exponentiation
let exp = mult;

for (let pow = 3; pow > 1; pow--) {
		exp *= mult;
}

alert((exp + '').substr(0, 2));


// Method 2

// Привидение Number to String
// вместо (number + '') используем (number.toString)