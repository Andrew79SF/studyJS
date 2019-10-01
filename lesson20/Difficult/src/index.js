'use strict';
import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'element-remove';
import 'fetch-polyfill';
import 'es6-promise';

import addDots from './modules/addDots';
import addListeners from './modules/addListeners';
import addValidators from './modules/addValidators';
import calc from './modules/calc';
import checkInputs from './modules/checkInputs';
import countTimer from './modules/countTimer';
import sendForm from './modules/sendForm';
import slider from './modules/slider';
import smoothScroll from './modules/smoothScroll';
import tabs from './modules/tabs';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';

// Timer
countTimer();

// Menu
toggleMenu();

// PopUp
togglePopUp();

// Smooth Scroll
smoothScroll();

// Tabs
tabs();

// Add dots
addDots();

// Start Slider
slider();

// Change Image by mouse (Our command)
addListeners();

// Calculator 
calc(100);

// Validator
addValidators();

// send-ajax-form
sendForm();

// Check inputs: Name, Email, Phone, Message
checkInputs();