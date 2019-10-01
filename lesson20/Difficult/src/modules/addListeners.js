 const addListeners = () => {
 	const img = document.querySelector('.command');
 	let src;

 	img.addEventListener('mouseover', (event) => {
 		if (event.target.closest('.quote') == null) {
 			src = event.target.src;
 			event.target.src = event.target.dataset.img;
 		}
 	});

 	img.addEventListener('mouseout', (event) => {
 		if (event.target.closest('.quote') == null) {
 			event.target.src = src;
 		}
 	});

 	//  Check Calculator inputs
 	const calcBlock = document.querySelector('.calc-block');

 	calcBlock.addEventListener('keypress', (event) => {
 		let keyCode = event.keyCode;
 		if (!/[0-9]/.test(String.fromCharCode(keyCode))) {
 			event.preventDefault();
 		}
 	});
 };

 export default addListeners;