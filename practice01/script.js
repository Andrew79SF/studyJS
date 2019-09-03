'use strict';

let money,
  start = function () {
    do {
      money = +prompt('Ваш месячный доход? (0 или Cancel - Нет дохода)', 30000);
    }
    while (isNaN(money) || money < 0);
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
	percentDeposit: 0,
	moneyDeposit: 0,
  mission: 100000,
  period: 6,
  asking: function () {
		if (confirm('Есть ли у вас дополнительный источник заработка?')) {
			let itemIncome,
				cashIncome;
			do {
				itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
			}
			while (itemIncome == null || itemIncome.trim() === '');

			do {
				cashIncome = +prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
			}
			while (isNaN(cashIncome) || cashIncome === 0);

			appData.income[itemIncome] = cashIncome;
		}

		let addExpenses;
		do {
			addExpenses = prompt('Перечислите возможные расходы', 'бар,казино,пиво');
		}
		while (addExpenses == null || addExpenses.trim() === '');

    appData.addExpenses = addExpenses.split(',');
    
    if (confirm('Есть ли у вас депозит в банке?')) {
      appData.deposit = true;
      do {
        appData.percentDeposit = +prompt('Какой у вас годовой процент?', 10);
      }
      while (isNaN(appData.percentDeposit) || appData.percentDeposit === 0);
      do {
        appData.moneyDeposit = +prompt('Какая у вас сумма депозита?', 100000);
      }
      while (isNaN(appData.moneyDeposit) || appData.moneyDeposit === 0);
    }


    let expense,
			amount;
			
    for (let i = 0; i < 2; i++) {
      do {
				expense = prompt('Введите обязательную статью расходов', 'Расход' + (i + 1));
			}
			while (expense == null || expense.trim() === '');

      do {
        amount = +prompt('Во сколько это обойдется?', 500);
      }
      while (isNaN(amount) || amount === 0);
      appData.expenses[expense] = +amount;
    }
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return appData.mission / appData.budgetMonth;
  },
  getStatusIncome: function () {
    return (appData.budgetDay < 0) ? 'Что то пошло не так' :
      (appData.budgetDay < 300) ? 'Низкий уровень дохода' :
      (appData.budgetDay < 800) ? 'Средний уровень дохода' : 'Высокий уровень дохода';
  },
  getTargetMonthText: function () {
    if (appData.getTargetMonth() < 0) {
      return 'Цель не будет достигнута';
    } else {
      return 'Вы достигните цели за ' +
        Math.ceil(appData.getTargetMonth()) + ' месяцев';
    }
	},
	getInfoDeposit: function() {
		if(appData.deposit) {
			do {
				appData.percentDeposit = +prompt('Какой годовой процент?', 10);
			}
      while (isNaN(appData.percentDepositnt) || appData.percentDepositount === 0);

			do {
				appData.moneyDeposit = +prompt('Какая сумма заложена?', 10000);
			}
      while (isNaN(appData.moneyDeposit) || appData.moneyDeposit === 0);
		}
	},
	calcSavedMoney: function() {
		return appData.budgetMonth * appData.period;
	}
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

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

// Task 2

console.log('');
let addExpensesString = '';

appData.addExpenses.forEach(function (element) {
  addExpensesString += element[0].toUpperCase() + element.slice(1) + ', ';
});

console.log(addExpensesString.slice(0, -2));