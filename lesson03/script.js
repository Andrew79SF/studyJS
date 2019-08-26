'use strict';

let income = 'freelance',
	mission = +prompt('Какую сумму хотите накопить?'),
	period = +prompt('За какой период хотите накопить эту сумму?'),
	money = +prompt('Ваш месячный доход?'),
	addExpenses = prompt('Перечислите возможные расходы за ' +
		'рассчитываемый период через запятую');

console.log('Возможные расходы: ', addExpenses.split(','));

let deposit = confirm('Есть ли у вас депозит в банке?');

console.log('money: ', typeof money);
console.log('income: ', typeof income);
console.log('deposit: ', typeof deposit);

let spendType1 = prompt('Какие обязательные ежемесячные расходы у вас есть?'),
	spend1 = +prompt('Во сколько это обойдется?'),
	spendType2 = prompt('Какие обязательные ежемесячные расходы у вас есть?'),
	spend2 = +prompt('Во сколько это обойдется?');

let budgetMonth = money - spend1 - spend2;
console.log('Ваш доход минус расход: ' + budgetMonth);

console.log('Вы достигните цели за ' + Math.ceil(mission / budgetMonth) + 
	' месяцев');

let budgetDay = budgetMonth / 30;
console.log('Ваш доход в день: ' + Math.floor(budgetDay));

let message = (budgetDay < 0) ? 'Что то пошло не так' :
	(budgetDay < 300) ? 'Низкий уровень дохода' :
	(budgetDay < 800) ? 'Средний уровень дохода' : 'Высокий уровень дохода';

console.log(message);