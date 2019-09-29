document.addEventListener('DOMContentLoaded', () => {
	'use strict';

	const img = document.getElementById('pic');
	const video = document.getElementById('video');
	let target;
	let picture;

	document.body.addEventListener('click', (event) => {
		target = event.target.innerHTML;
		let serverName;
		event.preventDefault();
		if (target === 'DOG') {
			serverName = 'https://random.dog/woof.json';
		} else if (target === 'CAT') {
			serverName = 'https://aws.random.cat/meow';
		} else {
			return;
		}
		fetch(serverName, {
				method: 'GET',
				mode: 'cors'
			})
			.then((response) => {
				if (response.status !== 200) {
					throw new Error('Status network not 200');
				}
				return (response.json());
			})
			.then((data) => {
				if (target === 'DOG') {
					picture = data.url;
				} else {
					picture = data.file;
				}
				if (picture.indexOf('mp4') == -1) {
					video.style.display = 'none';
					img.style.display = 'block';
					img.src = picture;
				} else {
					img.style.display = 'none';
					video.style.display = 'block';
					video.src = picture;
				}
			})
			.catch((error) => console.error(error));

	});

});