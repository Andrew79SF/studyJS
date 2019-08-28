'use strict';

let income = 'Freelance',
  mission = +prompt('Какую сумму хотите накопить?', 100000),
  period = +prompt('За какой период хотите накопить эту сумму?', 6),
  money = start(),
  addExpenses = prompt('Перечислите возможные расходы за ' +
    'рассчитываемый период через запятую', 'Магазин, Лотерея, Кредит'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
	expenses1,
	expenses2;
  
	
function start() {
	let money;
	do {
		money = prompt('Ваш месячный доход?', 30000);
	}
	while (isNaN(money) || money === null || money === '');
	return money;
}

let showTypeOf = function (data) {
  console.log(data, typeof (data));
};

let getStatusIncome = function (budgetDay) {
  return (budgetDay < 0) ? 'Что то пошло не так' :
    (budgetDay < 300) ? 'Низкий уровень дохода' :
    (budgetDay < 800) ? 'Средний уровень дохода' : 'Высокий уровень дохода';
};

// let getExpensesMonth = function (spend1, spend2) {
//   return spend1 + spend2;
// };
let getExpensesMonth = function() {
	let sum = 0,
		amount;

	for (let i = 0; i < 2; i++) {
		if (i === 0) {
			expenses1 = prompt('Введите обязательную статью расходов', 'Квартплата');
		}
		if (i === 1) {
		  expenses1 = prompt('Введите обязательную статью расходов', 'Бензин');
		}
		
		do {
			amount = prompt('Во сколько это обойдется?', 500);
		}
		while (isNaN(amount) || amount === '' || amount === null);
		sum += +amount;
	}

	return sum;
};

let expensesAmount = getExpensesMonth();

let budgetMonth = money - expensesAmount,
  budgetDay = budgetMonth / 30;

let getAccumulatedMonth = function (money, expensesAmount) {
  return money - expensesAmount;
};

let accumulateMonth = getAccumulatedMonth(money, expensesAmount);

let getTargetMonth = function (accumulateMonth, mission) {
  return mission / accumulateMonth;
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(getStatusIncome(budgetDay));

console.log('Ваш чистый доход за месяц = ', accumulateMonth);

let targetMonth = getTargetMonth(accumulateMonth, mission);

if (targetMonth < 0) {
	console.log('Цель не будет достигнута');
} else {
	console.log('Вы достигните цели за ' +
		Math.floor(targetMonth) + ' месяцев');
}