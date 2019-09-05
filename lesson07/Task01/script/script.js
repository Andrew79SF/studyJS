'use strict';

changeBooks();
changeBackPicture('background-image: url(./image/you-dont-know-js.jpg');
changeHeaderBook3('Книга 3. this и Прототипы Объектов');
removeAd();
changeChaptersBooks25();
addChapterBook6('Глава 8: За пределами ES6');

// Functions

function changeBooks() {
	let books = document.querySelector('.books'),
		bookList = document.querySelectorAll('.book');

	books.insertBefore(bookList[0], bookList[2]);
	books.insertBefore(bookList[2], null);
	books.insertBefore(bookList[4], bookList[3]);
}

function changeBackPicture(pictureUrl) {
	let myBody = document.querySelector('body');

	myBody.setAttribute('style', pictureUrl);
}

function changeHeaderBook3(newHeader) {
	let header = document.querySelectorAll('h2')[2],
		tagA = header.querySelector('a');
	tagA.textContent = newHeader;
}

function removeAd() {
	let ad = document.querySelector('.adv');
	ad.remove();
}

function changeChaptersBooks25() {
	let book = document.querySelectorAll('ul'),
		chapter;

	chapter = book[1].querySelectorAll('li');
	book[1].insertBefore(chapter[2], chapter[10]);
	book[1].insertBefore(chapter[6], chapter[4]);
	book[1].insertBefore(chapter[8], chapter[4]);

	chapter = book[4].querySelectorAll('li');
	book[4].insertBefore(chapter[9], chapter[2]);
	book[4].insertBefore(chapter[2], chapter[6]);
	book[4].insertBefore(chapter[5], chapter[8]);
}

function addChapterBook6(chapterName) {
	let book = document.querySelectorAll('ul'),
		chapter = book[5].querySelectorAll('li');
		
		let clone = chapter[5].cloneNode(true);
		clone.textContent = chapterName;
		book[5].appendChild(clone);
		book[5].insertBefore(chapter[9], null);
}