'use strict';
let elem;

function DomElement (selector, height, width, bg, fontSize) {
	this.selector = selector;
	this.height = height;
	this.width = width;
	this.bg = bg;
	this.fontSize = fontSize;
}

DomElement.prototype.createElement = function() {
	if (this.selector[0] == '.') {
		elem = document.createElement('div');
		elem.className = this.selector.slice(1);
	} else if (this.selector[0] == '#') {
		elem = document.createElement('p');
	}
	elem.innerHTML = this.selector.slice(1);
	document.body.append(elem);
	elem.style.height = this.height;
	elem.style.width = this.width;
	elem.style.backgroundColor = this.bg;
	elem.style.fontSize = this.fontSize;
};

DomElement.prototype.addPosition = function() {
	elem.style.position = this.position;
};

DomElement.prototype.addListeners = function() {
	let box = elem.getBoundingClientRect();
	
	addEventListener('keydown', function (event) {
	  if (event.keyCode == 37) {
	    elem.style.left = box.left - 10 + 'px';
	  } else if (event.keyCode == 39) {
			elem.style.left = box.left + 10 + 'px';
		} else if (event.keyCode == 38) {
			elem.style.top = box.top - 10 + 'px';
		} else if (event.keyCode == 40) {
			elem.style.top = box.top + 10 + 'px';
		}
		box = elem.getBoundingClientRect();
	});
};

function NewDomElement(selector, height, width, bg, fontSize, position) {
	DomElement.apply(this, arguments);
	this.position = position;
}

NewDomElement.prototype = Object.create(DomElement.prototype);

let newDomElement = new NewDomElement('.hello', '100px', '100px', 'red', '40px', 'absolute');

document.addEventListener("DOMContentLoaded", function() {
			alert("DOM готов!");
		});

newDomElement.createElement();
newDomElement.addPosition();
newDomElement.addListeners();