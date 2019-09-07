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
		leftside = document.querySelector('.data'),
		inputName = leftside.querySelectorAll("input[placeholder='Наименование']"),
		inputSum = leftside.querySelectorAll("input[placeholder='Сумма']");

let appData = {
	  budget: 0,
	  budgetDay: 0,
	  budgetMonth: 0,
	  expensesMonth: 0,
		income: {},
		incomeMonth: 0,
	  addIncome: [],
	  expenses: {},
	  addExpenses: [],
		deposit: false,
		start: function() {
			if (isNaN(salaryAmount.value) || salaryAmount.value.trim() === '') {
				salaryAmount.value = '';
				return;
			}
			appData.budget = +salaryAmount.value;
			
			appData.getExpenses();
			appData.getIncome();
			appData.getExpensesMonth();
			appData.getAddExpenses();
			appData.getAddIncome();
			appData.getBudget();
			appData.showResult();

			appData.blockFields();
		},
		showResult: function() {
			budgetMonthValue.value = appData.budgetMonth;
			budgetDayValue.value = Math.floor(appData.budgetDay);
			expensesMonthValue.value = appData.expensesMonth;
			additionalExpensesValue.value = appData.addExpenses.join(', ');
			additionalIncomeValue.value = appData.addIncome.join(', ');
			targetMonthValue.value = Math.ceil(appData.getTargetMonth());
			incomePeriodValue.value = appData.calcPeriod();
		},
		addIncomeBlock: function() {
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
			appData.addEventListenerName(cloneTitle);
			appData.addEventListenerSum(cloneAmount);
		},
		getIncome: function() {
			incomeItems.forEach(function(item) {
				let itemIncome = item.querySelector('.income-title').value;
				let cashIncome = item.querySelector('.income-amount').value;
				if (itemIncome !== '' && cashIncome !== '') {
					appData.income[itemIncome] = +cashIncome;
				}
			});

			for (let key in appData.income) {
				appData.incomeMonth += appData.income[key];
			}
		},
		addExpensesBlock: function() {
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
			appData.addEventListenerName(cloneTitle);
			appData.addEventListenerSum(cloneAmount);
		},
		getExpenses: function() {
			expensesItems.forEach(function(item) {
				let itemExpenses = item.querySelector('.expenses-title').value;
				let cashExpenses = item.querySelector('.expenses-amount').value;
				if (itemExpenses !== '' && cashExpenses !== '') {
					appData.expenses[itemExpenses] = +cashExpenses;
				}
			});
		},
		getAddExpenses: function() {
			let addExpenses = additionalExpensesItem.value.split(',');
			addExpenses.forEach(function(item) {
				item = item.trim();
				if (item !== '') {
					appData.addExpenses.push(item);
				}
			});
		},
		getAddIncome: function() {
			additionalIncomeItem.forEach(function(item) {
				let itemValue = item.value.trim();
				if (itemValue != '') {
					appData.addIncome.push(itemValue);
				}
			});
		},
	  getExpensesMonth: function() {
	    for (let key in appData.expenses) {
	      appData.expensesMonth += appData.expenses[key];
	    }
	  },
	  getBudget: function() {
	    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
	    appData.budgetDay = appData.budgetMonth / 30;
	  },
	  getTargetMonth: function() {
	    return targetAmount.value / appData.budgetMonth;
	  },
	  getStatusIncome: function() {
	    return (appData.budgetDay < 0) ? 'Что то пошло не так' :
	      (appData.budgetDay < 300) ? 'Низкий уровень дохода' :
	      (appData.budgetDay < 800) ? 'Средний уровень дохода' : 'Высокий уровень дохода';
		},
		calcPeriod: function() {
			return appData.budgetMonth * periodSelect.value;
		},
		changePeriod: function() {
			periodAmount.innerHTML = periodSelect.value;
			incomePeriodValue.value = appData.calcPeriod();
		},
	  getTargetMonthText: function() {
	    if (appData.targetMonth < 0) {
	      return 'Цель не будет достигнута';
	    } else {
	      return 'Вы достигните цели за ' +
	        Math.floor(appData.targetMonth) + ' месяцев';
	    }
		},
		blockFields: function() {
			let inputFields = leftside.querySelectorAll("input[type='text']");
			inputFields.forEach(function(item, index) {
				item.setAttribute('disabled', '');
			});
			start.style.display = 'none';
			cancel.style.display = 'inline';
		},
		addEventListenerName: function(item) {
			item.addEventListener('keypress', (e) => {
			  var keyCode = e.keyCode;
			  if (!/[а-яА-Я,. ]/.test(String.fromCharCode(keyCode))) {
			    e.preventDefault();
			  }
			});
		},
		addEventListenerSum: function (item) {
		  item.addEventListener('keypress', (e) => {
		    var keyCode = e.keyCode;
		    if (!/[0-9]/.test(String.fromCharCode(keyCode))) {
		      e.preventDefault();
		    }
		  });
		}
};

start.addEventListener('click', appData.start);

expensePlus.addEventListener('click', appData.addExpensesBlock);

incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('mousemove', appData.changePeriod);

inputName.forEach(function(item) {
	appData.addEventListenerName(item);
});

inputSum.forEach(function (item) {
  appData.addEventListenerSum(item);
});