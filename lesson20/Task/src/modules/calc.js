let idChange;
const calc = (price = 100) => {

	const calcType = document.querySelector('.calc-type'),
		calcSquare = document.querySelector('.calc-square'),
		calcDay = document.querySelector('.calc-day'),
		calcCount = document.querySelector('.calc-count'),
		totalValue = document.getElementById('total');

	const countSum = () => {
		let total = 0,
			countValue = 1,
			dayValue = 1;
		const typeValue = calcType.options[calcType.selectedIndex].value;
		let squareValue = +calcSquare.value;

		if (calcCount.value > 1) {
			countValue += (calcCount.value - 1) / 10;
		} else if (calcCount.value == '0') {
			countValue = 0;
		}

		if (calcDay.value && calcDay.value < 5) {
			dayValue *= 2;
		} else if (calcDay.value && calcDay.value < 10) {
			dayValue *= 1.5;
		}

		if (typeValue && squareValue) {
			total = Math.round(price * typeValue * squareValue * countValue * dayValue);
		}

		// Эффект перечисления чисел 
		let newTotal = totalValue.textContent;

		const changeTotal = () => {
			if (total > newTotal) {
				newTotal++;
			} else if (total < newTotal) {
				newTotal--;
			} else {
				clearInterval(idChange);
			}
			totalValue.textContent = newTotal;
		};

		if (idChange) {
			clearInterval(idChange);
		}

		idChange = setInterval(changeTotal);
	};

	calcBlock.addEventListener('change', (event) => {
		const target = event.target;

		if (target === calcType || target === calcSquare ||
			target === calcDay || target === calcCount) {
			countSum();
		}
	});
};

const calcBlock = document.querySelector('.calc-block');

calcBlock.addEventListener('keypress', (event) => {
	let keyCode = event.keyCode;
	if (!/[0-9]/.test(String.fromCharCode(keyCode))) {
		event.preventDefault();
	}
});

export default calc;