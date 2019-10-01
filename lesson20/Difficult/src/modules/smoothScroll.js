const smoothScroll = () => {
	document.body.addEventListener('click', (event) => {
		let target = event.target,
			targetHref = target.closest('a[href*="#"]');

		if (target.matches('.close-btn') || target.matches('.portfolio-btn') ||
			target.closest('footer') != null) {
			return;
		}

		if (targetHref) {
			if (targetHref.matches('a[href*="#"]')) {
				event.preventDefault();
				const blockID = targetHref.getAttribute('href').substr(1);
				document.getElementById(blockID).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		}
	});
};

export default smoothScroll;