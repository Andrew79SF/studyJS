'use strict';

function DomElement (selector, height, width, bg, fontSize) {
	this.selector = selector;
	this.height = height;
	this.width = width;
	this.bg = bg;
	this.fontSize = fontSize;
}

DomElement.prototype.createElement = function() {
	if (this.selector[0] == '.') {
		let div = document.createElement('div');
		div.className = this.selector.slice(1);
		div.innerHTML = 'Create div with class = ' + this.selector.slice(1);
		document.body.append(div);
		div.style.height = this.height;
		div.style.width = this.width;
		div.style.backgroundColor = this.bg;
		div.style.fontSize = this.fontSize;

	} else if (this.selector[0] == '#') {
		let p = document.createElement('p');
		p.innerHTML = this.selector.slice(1);
		document.body.append(p);
		p.style.height = this.height;
		p.style.width = this.width;
		p.style.backgroundColor = this.bg;
		p.style.fontSize = this.fontSize;
	}
};

let domElement = new DomElement('.hello', '300px', '500px', 'red', '24px');

domElement.createElement();

let domElement2 = new DomElement('#Hello World!!!','200px', '400px', 'green', '32px');

domElement2.createElement();