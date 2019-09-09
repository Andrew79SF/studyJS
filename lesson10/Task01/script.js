'use strict';

function DomElement(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}

DomElement.prototype.createElement = function () {
  let elem;
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

let domElement = new DomElement('.hello', '300px', '500px', 'red', '40px');

domElement.createElement();

let domElement2 = new DomElement('#Hello World!!!', '200px', '400px', 'green', '32px');

domElement2.createElement();