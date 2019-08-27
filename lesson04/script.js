'use strict';

let income = 'Freelance',
  mission = +prompt('Какую сумму хотите накопить?', 100000),
  period = +prompt('За какой период хотите накопить эту сумму?', 6),
  money = +prompt('Ваш месячный доход?', 30000),
  addExpenses = prompt('Перечислите возможные расходы за ' +
    'рассчитываемый период через запятую', 'Магазин, Лотерея, Кредит'),
	deposit = confirm('Есть ли у вас депозит в банке?'),
	spendType1 = prompt('Какие обязательные ежемесячные расходы у вас есть?',
		'Интернет'),
  spend1 = +prompt('Во сколько это обойдется?', 450),
	spendType2 = prompt('Какие обязательные ежемесячные расходы у вас есть?',
		'Телефон'),
  spend2 = +prompt('Во сколько это обойдется?', 600),
	budgetMonth = money - spend1 - spend2,
	budgetDay = budgetMonth / 30;

let showTypeOf = function(data) {
	console.log(data, typeof(data));
};

let getStatusIncome = function(budgetDay) {
	return (budgetDay < 0) ? 'Что то пошло не так' :
  (budgetDay < 300) ? 'Низкий уровень дохода' :
  (budgetDay < 800) ? 'Средний уровень дохода' : 'Высокий уровень дохода';
};

let getExpensesMonth = function(spend1, spend2) {
	return spend1 + spend2;
};

let getAccumulatedMonth = function(money, spends) {
	return money - spends;
};

let accumulateMonth = getAccumulatedMonth(money, getExpensesMonth(spend1, spend2));

let getTargetMonth = function(accumulateMonth, mission) {
	return mission / accumulateMonth;
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(getStatusIncome(budgetDay));

console.log('Ваш чистый доход за месяц = ', accumulateMonth);

console.log('Вы достигните цели за ' + 
	Math.floor(getTargetMonth(accumulateMonth, mission)) + ' месяцев');