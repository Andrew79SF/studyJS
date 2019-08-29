'use strict';

let money,
	start = function() {
		do {
		  money = +prompt('Ваш месячный доход?', 30000);
		}
		while (isNaN(money) || money === null || money === '');
	};

start();

let appData = {
	budget: money,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	income: {},
	addIncome: [],
	expenses: {},
	addExpenses: [],
	deposit: false,
	mission: 100000,
	period: 6,
	asking: function() {
		let addExpenses = prompt('Перечислите возможные расходы');
		appData.addExpenses = addExpenses.split(',');
		appData.deposit = confirm('Есть ли у вас депозит в банке?');

		let expense,
			amount;
		for (let i = 0; i < 2; i++) {
		  expense = prompt('Введите обязательную статью расходов', 'Расход' + (i + 1));
		  do {
		    amount = prompt('Во сколько это обойдется?', 500);
		  }
			while (isNaN(amount) || amount === '' || amount === null);
			appData.expenses[expense] = +amount;
		}
	},
	getExpensesMonth: function() {
		for (let key in appData.expenses) {
			appData.expensesMonth += appData.expenses[key];
		}
	},
	getBudget: function() {
		appData.budgetMonth = appData.budget - appData.expensesMonth;
		appData.budgetDay = appData.budgetMonth / 30;
	},
	getTargetMonth: function() {
		appData.targetMonth = appData.mission / appData.budgetMonth;
	},
	getStatusIncome: function() {
		return (appData.budgetDay < 0) ? 'Что то пошло не так' :
		  (appData.budgetDay < 300) ? 'Низкий уровень дохода' :
		  (appData.budgetDay < 800) ? 'Средний уровень дохода' : 'Высокий уровень дохода';
	},
	getTargetMonthText: function() {
		if (appData.targetMonth < 0) {
		  return 'Цель не будет достигнута';
		} else {
		  return 'Вы достигните цели за ' +
		    Math.floor(appData.targetMonth) + ' месяцев';
		}
	}
};

appData.asking();

appData.getExpensesMonth();

appData.getBudget();

appData.getTargetMonth();

console.log('Ваши расхожы за месяц = ' + appData.expensesMonth);

console.log(appData.getTargetMonthText());

console.log('Ваш чистый доход за месяц = ', appData.budgetMonth);

console.log(appData.getStatusIncome());

console.log('');
console.log('Наша программа включает в себя данные:');

for (let key in appData) {
	if (typeof appData[key] == "object") {
		console.log(key + ' : ');
		for (let key2 in appData[key]) {
			console.log('	' + key2 + ' : ' + appData[key][key2]);
		}
		} else {
			console.log(key + ' : ' + appData[key]);
	}
}