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
		inputSum = leftSide.querySelectorAll("input[placeholder='Сумма']");

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
};

AppData.prototype.start = function() {
			if (isNaN(salaryAmount.value) || salaryAmount.value.trim() === '') {
			  salaryAmount.value = '';
			  return;
			}

			this.budget = +salaryAmount.value;
			this.getExpenses();
			this.getIncome();
			this.getExpensesMonth();
			this.getAddExpenses();
			this.getAddIncome();
			this.getBudget();
			this.showResult();
			this.blockFields();
		};

AppData.prototype.showResult = function() {
			const _this = this;
			budgetMonthValue.value = this.budgetMonth;
			budgetDayValue.value = Math.floor(this.budgetDay);
			expensesMonthValue.value = this.expensesMonth;
			additionalExpensesValue.value = this.addExpenses.join(', ');
			additionalIncomeValue.value = this.addIncome.join(', ');
			targetMonthValue.value = Math.ceil(this.getTargetMonth());
			incomePeriodValue.value = this.budgetMonth * periodSelect.value;
			periodSelect.addEventListener('mousemove', _this.getIncomePeriodValue);
		};

AppData.prototype.addIncomeBlock = function() {
			let cloneIncomeItem = incomeItems[0].cloneNode(true),
					cloneTitle = cloneIncomeItem.querySelector('.income-title'),
					cloneAmount = cloneIncomeItem.querySelector('.income-amount');
			cloneTitle.value = '';
			cloneAmount.value = '';
			incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
			incomeItems = document.querySelectorAll('.income-items');

			if (incomeItems.length === 3) {
			  incomePlus.style.display = 'none';
			}
			this.addEventListenerName(cloneTitle);
			this.addEventListenerSum(cloneAmount);
		};

AppData.prototype.getIncome = function() {
			incomeItems.forEach(function(item) {
				let itemIncome = item.querySelector('.income-title').value;
				let cashIncome = item.querySelector('.income-amount').value;
				if (itemIncome !== '' && cashIncome !== '') {
					this.income[itemIncome] = +cashIncome;
				}
			}, this);

			for (let key in this.income) {
				this.incomeMonth += this.income[key];
			}
		};

AppData.prototype.addExpensesBlock = function() {
			let cloneExpensesItem = expensesItems[0].cloneNode(true),
					cloneTitle = cloneExpensesItem.querySelector('.expenses-title'),
					cloneAmount = cloneExpensesItem.querySelector('.expenses-amount');
			cloneTitle.value = '';
			cloneAmount.value = '';
			expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensePlus);
			expensesItems = document.querySelectorAll('.expenses-items');

			if (expensesItems.length === 3) {
				expensePlus.style.display = 'none';
			}
			this.addEventListenerName(cloneTitle);
			this.addEventListenerSum(cloneAmount);
		};

AppData.prototype.getExpenses = function() {
			expensesItems.forEach(function(item) {
				let itemExpenses = item.querySelector('.expenses-title').value;
				let cashExpenses = item.querySelector('.expenses-amount').value;
				if (itemExpenses !== '' && cashExpenses !== '') {
					this.expenses[itemExpenses] = +cashExpenses;
				}
			}, this);
		};

AppData.prototype.getAddExpenses = function() {
			let addExpenses = additionalExpensesItem.value.split(',');
			addExpenses.forEach(function(item) {
				item = item.trim();
				if (item !== '') {
					this.addExpenses.push(item);
				}
			}, this);
		};

AppData.prototype.getAddIncome = function() {
			additionalIncomeItem.forEach(function(item) {
				let itemValue = item.value.trim();
				if (itemValue != '') {
					this.addIncome.push(itemValue);
				}
			}, this);
		};

AppData.prototype.getExpensesMonth = function() {
	    for (let key in this.expenses) {
	      this.expensesMonth += this.expenses[key];
	    }
		};
		
AppData.prototype.getBudget = function() {
	    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
	    this.budgetDay = this.budgetMonth / 30;
		};
		
AppData.prototype.getTargetMonth = function() {
	    return targetAmount.value / this.budgetMonth;
		};
		
AppData.prototype.getStatusIncome = function() {
	    return (this.budgetDay < 0) ? 'Что то пошло не так' :
	      (this.budgetDay < 300) ? 'Низкий уровень дохода' :
	      (this.budgetDay < 800) ? 'Средний уровень дохода' : 'Высокий уровень дохода';
		};

AppData.prototype.getIncomePeriodValue = function () {
			incomePeriodValue.value = budgetMonthValue.value * periodSelect.value;
		};

AppData.prototype.changePeriod = function() {
			periodAmount.innerHTML = periodSelect.value;
		};

AppData.prototype.getTargetMonthText = function() {
	    if (this.targetMonth < 0) {
	      return 'Цель не будет достигнута';
	    } else {
	      return 'Вы достигните цели за ' +
	        Math.floor(this.targetMonth) + ' месяцев';
	    }
		};

AppData.prototype.blockFields = function() {
			const _this = this;
			let inputFields = leftSide.querySelectorAll("input[type='text']");
			inputFields.forEach(function(item, index) {
				item.setAttribute('disabled', '');
			});
			start.style.display = 'none';
			cancel.style.display = 'inline';
			expensePlus.removeEventListener('click', _this.addExpensesBlock);
			incomePlus.removeEventListener('click', _this.addIncomeBlock);
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

			this.budget = 0;
			this.budgetMonth = 0;
			this.budgetDay = 0;
			this.incomeMonth = 0;
			this.expensesMonth = 0;
			this.income = {};
			this.expenses = {};
			additionalIncomeValue = [];
			additionalExpensesValue  = [];


			expensePlus.addEventListener('click', _this.addExpensesBlock);
			incomePlus.addEventListener('click', _this.addIncomeBlock);
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
	
	let newStart = this.start.bind(this),
	  newAddExpensesBlock = this.addExpensesBlock.bind(this),
	  newAddIncomeBlock = this.addIncomeBlock.bind(this),
	  newResetValues = this.resetValues.bind(this),
	  newChangePeriod = this.changePeriod.bind(this);
	
	start.addEventListener('click', newStart);
	cancel.addEventListener('click', newResetValues);
	expensePlus.addEventListener('click', newAddExpensesBlock);
	incomePlus.addEventListener('click', newAddIncomeBlock);
	periodSelect.addEventListener('mousemove', newChangePeriod);

	inputName.forEach(function (item) {
	  _this.addEventListenerName(item);
	});
	inputSum.forEach(function (item) {
	  _this.addEventListenerSum(item);
	});
};

const appData = new AppData();

appData.eventListeners();