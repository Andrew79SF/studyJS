let money = 50000;
let income = 'freelance';
let addExpenses = 'Пятьсот, Одна тысяча, Сто пятьдесят';
let deposit = true;
let mission = 1000000;
let period = 5;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(income.length);

console.log('Период ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money / 30;
console.log(budgetDay);
console.log(money % 30);