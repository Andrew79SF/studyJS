'use strict';

let start = document.getElementById('start'),
		cancel = document.getElementById('cancel'),
		btnPlus = document.getElementsByTagName('button'),
		incomePlus = btnPlus[0],
		expensePlus = btnPlus[1],
		additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
		depositCheck = document.querySelector('#deposit-check'),
		budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
		budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
		expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
		additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
		additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
		incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
		targetMonthValue = document.getElementsByClassName('target_month-value')[0],
		salaryAmount = document.querySelector('.salary-amount'),
		incomeTitle = document.querySelector('.income-title'),
		incomeItems = document.querySelectorAll('.income-items'),
		expensesTitle = document.querySelector('.expenses-title'),
		expensesItems = document.querySelectorAll('.expenses-items'),
		additionalExpensesItem = document.querySelector('.additional_expenses-item'),
		targetAmount = document.querySelector('.target-amount'),
		periodSelect = document.querySelector('.period-select'),
		periodAmount = document.querySelector('.period-amount'),
		leftSide = document.querySelector('.data'),
		rightSide = document.querySelector('.result'),
		inputFields = leftSide.querySelectorAll("input[type='text']"),
		inputName = leftSide.querySelectorAll("input[placeholder='Наименование']"),
		inputSum = leftSide.querySelectorAll("input[placeholder='Сумма']"),
		depositBank = document.querySelector('.deposit-bank'),
		depositAmount = document.querySelector('.deposit-amount'),
		depositPercent = document.querySelector('.deposit-percent');

const AppData = function() {
	  this.budget = 0;
	  this.budgetDay = 0;
	  this.budgetMonth = 0;
	  this.expensesMonth = 0;
		this.income = {};
		this.incomeMonth = 0;
	  this.addIncome = [];
	  this.expenses = {};
	  this.addExpenses = [];
		this.deposit = false;
		this.percentDeposit = 0;
		this.moneyDeposit = 0;
		this.block = false;
};

AppData.prototype.start = function() {
			if (isNaN(salaryAmount.value) || salaryAmount.value.trim() === '') {
			  salaryAmount.value = '';
			  return;
			}

			this.budget = +salaryAmount.value;
			this.getExpenses();
			this.getIncome();
			this.getAddExpenses();
			this.getAddIncome();
			this.getInfoDeposit();
			this.getBudget();
			this.showResult();
			this.blockFields();
		};

AppData.prototype.showResult = function() {
			budgetMonthValue.value = Math.floor(this.budgetMonth);
			budgetDayValue.value = Math.floor(this.budgetDay);
			expensesMonthValue.value = this.expensesMonth;
			additionalExpensesValue.value = this.addExpenses.join(', ');
			additionalIncomeValue.value = this.addIncome.join(', ');
			targetMonthValue.value = Math.ceil(this.getTargetMonth());
			incomePeriodValue.value = this.budgetMonth * periodSelect.value;
			periodSelect.addEventListener('mousemove', this.getIncomePeriodValue);
		};

AppData.prototype.addBlock = function (title, amount, itemsClass, items, btnPlus) {
			  if (this.block) {
		    return;
		  }
		  let cloneItem = items[0].cloneNode(true),
		    cloneTitle = cloneItem.querySelector(title),
				cloneAmount = cloneItem.querySelector(amount);
				
		  cloneTitle.value = '';
		  cloneAmount.value = '';
		  items[0].parentNode.insertBefore(cloneItem, btnPlus);
		  items = document.querySelectorAll(itemsClass);

		  if (items.length === 3) {
		    btnPlus.style.display = 'none';
		  }
		  this.addEventListenerName(cloneTitle);
			this.addEventListenerSum(cloneAmount);
			return items;
		};

AppData.prototype.getIncome = function() {
			incomeItems.forEach(function(item) {
				const itemIncome = item.querySelector('.income-title').value,
					cashIncome = item.querySelector('.income-amount').value;
				if (itemIncome !== '' && cashIncome !== '') {
					this.income[itemIncome] = +cashIncome;
				}
			}, this);

			for (let key in this.income) {
				this.incomeMonth += this.income[key];
			}
		};

AppData.prototype.getExpenses = function() {
			expensesItems.forEach(function(item) {
				const itemExpenses = item.querySelector('.expenses-title').value,
					cashExpenses = item.querySelector('.expenses-amount').value;
				if (itemExpenses !== '' && cashExpenses !== '') {
					this.expenses[itemExpenses] = +cashExpenses;
				}
			}, this);

			for (let key in this.expenses) {
				this.expensesMonth += this.expenses[key];
			}
		};

AppData.prototype.getAddExpenses = function() {
			const addExpenses = additionalExpensesItem.value.split(',');
			addExpenses.forEach(function(item) {
				item = item.trim();
				if (item !== '') {
					this.addExpenses.push(item);
				}
			}, this);
		};

AppData.prototype.getAddIncome = function() {
			additionalIncomeItem.forEach(function(item) {
				const itemValue = item.value.trim();
				if (itemValue != '') {
					this.addIncome.push(itemValue);
				}
			}, this);
		};
		
AppData.prototype.getInfoDeposit = function() {
	if (this.deposit) {
		this.percentDeposit = depositPercent.value;
		this.moneyDeposit = depositAmount.value;
	}
};

AppData.prototype.getBudget = function() {
			this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth +
				(this.moneyDeposit * this.percentDeposit / 12);
	    this.budgetDay = this.budgetMonth / 30;
		};
		
AppData.prototype.getTargetMonth = function() {
	    return targetAmount.value / this.budgetMonth;
		};
		
AppData.prototype.getIncomePeriodValue = function () {
			incomePeriodValue.value = budgetMonthValue.value * periodSelect.value;
		};

AppData.prototype.changePeriod = function() {
			periodAmount.innerHTML = periodSelect.value;
		};

AppData.prototype.blockFields = function() {
			const inputFields = leftSide.querySelectorAll("input[type='text']");
			inputFields.forEach(function(item) {
				item.setAttribute('disabled', '');
			});
			start.style.display = 'none';
			cancel.style.display = 'inline';
			this.block = true;
			depositBank.disabled = true;
			depositCheck.disabled = true;
		};

AppData.prototype.addEventListenerName = function(item) {
			item.addEventListener('keypress', (e) => {
			  var keyCode = e.keyCode;
			  if (!/[а-яА-Я,. ]/.test(String.fromCharCode(keyCode))) {
			    e.preventDefault();
			  }
			});
		};

AppData.prototype.addEventListenerSum = function (item) {
		  item.addEventListener('keypress', (e) => {
		    var keyCode = e.keyCode;
		    if (!/[0-9]/.test(String.fromCharCode(keyCode))) {
		      e.preventDefault();
		    }
		  });
		};

AppData.prototype.resetValues = function() {
			const _this = this;
			inputFields = leftSide.querySelectorAll("input[type='text']");
			inputFields.forEach(function(item) {
				item.value = '';
				item.disabled = false;
			});

			inputFields = rightSide.querySelectorAll("input[type='text']");
			inputFields.forEach(function (item) {
				item.value = '';
				item.disabled = false;
			});

			periodSelect.value = '1';
			periodAmount.innerHTML = '1';

			cancel.style.display = 'none';
			start.style.display = 'inline';

			incomePlus.style.display = 'inline';
			expensePlus.style.display = 'inline';

			depositCheck.checked = false;
			depositBank.disabled = false;
			depositCheck.disabled = false;

			this.budget = 0;
			this.budgetMonth = 0;
			this.budgetDay = 0;
			this.incomeMonth = 0;
			this.expensesMonth = 0;
			this.income = {};
			this.expenses = {};
			additionalIncomeValue.value = '';
			this.addIncome = [];
			additionalExpensesValue.value  = '';
			this.addExpenses = [];
			depositBank.style.display = 'none';
			depositAmount.style.display = 'none';
			depositPercent.style.display = 'none';
			depositPercent.value = '';
			depositBank.options.selectedIndex = 0;
			depositAmount.value = '';
			this.percentDeposit = 0;
			this.moneyDeposit = 0;
			this.block = false;

			periodSelect.removeEventListener('mousemove', _this.getIncomePeriodValue);

			let elements = document.querySelectorAll('.income-items');
			for (let i = 1; i < elements.length; i++) {
				elements[i].parentNode.removeChild(elements[i]);
			}
			elements = document.querySelectorAll('.expenses-items');
			for (let i = 1; i < elements.length; i++) {
			  elements[i].parentNode.removeChild(elements[i]);
			}
		};

AppData.prototype.eventListeners = function() {
	const _this = this;
	
	const newStart = this.start.bind(this),
	  newAddBlock = this.addBlock.bind(this),
	  newResetValues = this.resetValues.bind(this),
	  newChangePeriod = this.changePeriod.bind(this);
	
	start.addEventListener('click', newStart);
	cancel.addEventListener('click', newResetValues);

	expensePlus.addEventListener('click', function () {
		expensesItems = newAddBlock(".expenses-title", ".expenses-amount", ".expenses-items", expensesItems, expensePlus);
	});

	incomePlus.addEventListener('click', function() {
		incomeItems = newAddBlock(".income-title", ".income-amount", ".income-items", incomeItems, incomePlus);
	});

	periodSelect.addEventListener('mousemove', newChangePeriod);

	depositCheck.addEventListener('change', function() {
		if (depositCheck.checked) {
			depositBank.style.display = 'inline-block';
			depositAmount.style.display = 'inline-block';
			depositPercent.style.display = 'inline-block';
			_this.deposit = true;
			depositBank.addEventListener('change', function() {
				let selectIndex = this.options[this.selectedIndex].value;
				if (selectIndex === 'other') {
					depositPercent.disabled = false;
					depositPercent.value = '';
				} else {
					depositPercent.value = depositBank.value;
					depositPercent.disabled = true;
				}
			});
		} else {
			depositBank.style.display = 'none';
			depositAmount.style.display = 'none';
			depositPercent.style.display = 'none';
			depositAmount.value = '';
			depositPercent.value = '';
			depositBank.options.selectedIndex = 0;
			this.deposit = false;
			depositPercent.disabled = true;
		}
	});

	inputName.forEach(function (item) {
	  _this.addEventListenerName(item);
	});
	inputSum.forEach(function (item) {
	  _this.addEventListenerSum(item);
	});
};

const appData = new AppData();

appData.eventListeners();