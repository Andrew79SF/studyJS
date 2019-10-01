	const chekInputs = () => {
		document.body.addEventListener('keypress', (event) => {
			const target = event.target.getAttribute('name'),
				targetValue = event.target.value,
				keyValue = event.key;

			if (target === 'user_name') {
				if (!/[а-я А-Я]/.test(keyValue)) {
					event.preventDefault();
				}
			}
			if (target === 'user_message') {
				if (!/[а-я А-Я.,?!]/.test(keyValue)) {
					event.preventDefault();
				}
			}
			if (target === 'user_phone') {
				if (!/[0-9+]/.test(keyValue)) {
					event.preventDefault();
				} else {
					if ((targetValue.length > 0 && keyValue === '+') ||
						(targetValue[0] === '+' && targetValue.length == 1 && keyValue !== '7') ||
						(targetValue.length === 0 && (keyValue !== '+' && keyValue !== '8'))) {
						event.preventDefault();
					}
				}
			}
			if (target === 'user_email') {
				if (target === 'user_email') {
					if (!/[0-9a-zA-Z@!#$%&'*+-/=?^_`{}|~]/.test(keyValue)) {
						event.preventDefault();
					}
				}
			}
		});
	};

	export default chekInputs;