 const addDots = () => {
 	const qtySlides = document.querySelectorAll('.portfolio-item').length;
 	let ul = document.querySelector('.portfolio-dots');

 	for (let i = 0; i < qtySlides; i++) {
 		let li = document.createElement('li');
 		li.appendChild(document.createTextNode(''));
 		li.setAttribute('class', 'dot');
 		ul.appendChild(li);
 	}

 	let li = document.querySelector('.dot');
 	li.setAttribute('class', 'dot dot-active');
 };

 export default addDots;