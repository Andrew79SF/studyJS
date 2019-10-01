  const sendForm = () => {
  	const errorMessage = '<img src = "./images/status/error.png" height = "150vh">',
  		loadMessage = '<img src = "./images/status/loading.gif" height = "70vh">',
  		successMessage = '<img src = "./images/status/success.png" height = "70vh">';

  	const form = document.querySelector('body');

  	const statusMessage = document.createElement('div');
  	statusMessage.style.cssText = 'font-size: 2rem;';
  	statusMessage.style.color = 'white';

  	form.addEventListener('submit', (event) => {
  		event.preventDefault();

  		const hasError = event.target.querySelector('.error') !== null;
  		if (hasError) {
  			return;
  		}

  		let target = event.target;

  		target.appendChild(statusMessage);

  		statusMessage.innerHTML = loadMessage;

  		const formData = new FormData(target);
  		let body = {};

  		formData.forEach((val, key) => {
  			body[key] = val;
  		});

  		postData(body)
  			.then((response) => {
  				if (response.status !== 200) {
  					throw new Error('Status network not 200');
  				}
  				statusMessage.innerHTML = successMessage;
  				setTimeout(() => {
  					statusMessage.innerHTML = '';
  				}, 2000);
  				// Clear all inputs
  				const allInput = document.querySelectorAll('input');
  				allInput.forEach((elem) => {
  					elem.classList.remove('success');
  					elem.classList.remove('error');
  					if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
  						elem.nextElementSibling.remove();
  					}
  					elem.value = '';
  				});
  			})
  			.catch((error) => {
  				statusMessage.innerHTML = errorMessage;
  				console.error(error);
  			});
  	});

  	const postData = (body) => {
  		return fetch('./server.php', {
  			method: 'POST',
  			headers: {
  				'Content-Type': 'application/json'
  			},
  			body: JSON.stringify(body)
  		});
  	};

	};
	
	export default sendForm;