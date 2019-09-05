'use strict';

getCalculateButtonById();
getPlusButtonByTag();
getCheckboxById();
getAdditionalIncomeFields();
getAllRightBlocks();
getAnotherFields();

// Functions

function getCalculateButtonById() {
	let buttonStart = document.getElementById('start');
	console.log(buttonStart);
}

function getPlusButtonByTag() {
	let buttons = document.getElementsByTagName('button'),
		buttonIncomePlus = buttons[0],
		buttonExpensePlus = buttons[1];

	console.log(buttonIncomePlus);
	console.log(buttonExpensePlus);
}

function getCheckboxById() {
	let checkBox = document.querySelector('#deposit-check');
	console.log(checkBox);
}

function getAdditionalIncomeFields() {
	let incomeFields = document.querySelectorAll('.additional_income-item');
	console.log(incomeFields);
	incomeFields.forEach(element => {
		console.log(element);
	});
}

function getAllRightBlocks() {
	let blockDayBudget = document.getElementsByClassName('budget_day-value'),
		blockMonthExpenses = document.getElementsByClassName('expenses_month-value'),
		blockAddIncome = document.getElementsByClassName('additional_income-value'),
		blockAddExpenses = document.getElementsByClassName('additional_expenses-value'),
		blockIncomePeriod = document.getElementsByClassName('income_period-value'),
		blockTargetMonth = document.getElementsByClassName('target_month-value');
	
	console.log(blockDayBudget);
	console.log(blockMonthExpenses);
	console.log(blockAddIncome);
	console.log(blockAddExpenses);
	console.log(blockIncomePeriod);
	console.log(blockTargetMonth);
}

function getAnotherFields() {
	let salryAmount = document.querySelector('.salary-amount'),
		incomeItem = document.querySelector('.income-items'),
		expensesItem = document.querySelector('.expenses-items'),
		addExpensesItem = document.querySelector('.additional_expenses-item'),
		targetAmount = document.querySelector('.target-amount'),
		periodSelect = document.querySelector('.period-select'),
		budgetMonthValue = document.querySelector('.budget_month-value');

	console.log(salryAmount);
	console.log(incomeItem);
	console.log(expensesItem);
	console.log(addExpensesItem);
	console.log(targetAmount);
	console.log(periodSelect);
	console.log(budgetMonthValue);
}