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

class AppData {
  constructor() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.targetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.block = false;
  }

  start() {
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
    this.getTargetMonth();
    this.showResult();
    this.blockFields();
    this.setCookie();
    this.setLocalStorage();
  }

  setCookie() {
    document.cookie = "budgetMonth=" + this.budgetMonth;
    document.cookie = "budgetDay=" + this.budgetDay;
    document.cookie = "expensesMonth=" + this.expensesMonth;
    document.cookie = "addExpenses=" + this.addExpenses;
    document.cookie = "addIncome=" + this.addIncome;
    document.cookie = "incomePeriod=" + incomePeriodValue.value;
    document.cookie = "target=" + this.targetMonth;
    document.cookie = "period=" + periodSelect.value;
    document.cookie = "isLoad=" + true;
  }

  setLocalStorage() {
    localStorage.setItem('budgetMonth', this.budgetMonth);
    localStorage.setItem('budgetDay', this.budgetDay);
    localStorage.setItem('expensesMonth', this.expensesMonth);
    localStorage.setItem('addExpenses', this.addExpenses);
    localStorage.setItem('addIncome', this.addIncome);
    localStorage.setItem('incomePeriod', incomePeriodValue.value);
    localStorage.setItem('target', this.targetMonth);
    localStorage.setItem('period', periodSelect.value);
    localStorage.setItem('isLoad', true);
  }

  showResult() {
    budgetMonthValue.value = Math.floor(this.budgetMonth);
    budgetDayValue.value = Math.floor(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses;
    additionalIncomeValue.value = this.addIncome;
    targetMonthValue.value = this.targetMonth;
    incomePeriodValue.value = this.budgetMonth * periodSelect.value;
    periodSelect.addEventListener('mousemove', this.getIncomePeriodValue);
  }

  addBlock(title, amount, itemsClass, items, btnPlus) {
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
  }

  getIncome() {
    incomeItems.forEach((item) => {
      const itemIncome = item.querySelector('.income-title').value,
        cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = +cashIncome;
      }
    }, this);

    for (let key in this.income) {
      this.incomeMonth += this.income[key];
    }
  }

  getExpenses() {
    expensesItems.forEach((item) => {
      const itemExpenses = item.querySelector('.expenses-title').value,
        cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = +cashExpenses;
      }
    }, this);

    for (let key in this.expenses) {
      this.expensesMonth += this.expenses[key];
    }
  }

  getAddExpenses() {
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    }, this);
    this.addExpenses.join(', ');
  }

  getAddIncome() {
    additionalIncomeItem.forEach((item) => {
      const itemValue = item.value.trim();
      if (itemValue != '') {
        this.addIncome.push(itemValue);
      }
    }, this);
    this.addIncome.join(', ');
  }

  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }

  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth +
      (this.moneyDeposit * this.percentDeposit / 12);
    this.budgetDay = this.budgetMonth / 30;
  }

  getTargetMonth() {
    this.targetMonth = Math.ceil(targetAmount.value / this.budgetMonth);
  }

  getIncomePeriodValue() {
    incomePeriodValue.value = budgetMonthValue.value * periodSelect.value;
  }

  changePeriod() {
    periodAmount.innerHTML = periodSelect.value;
  }

  blockFields() {
    const inputFields = leftSide.querySelectorAll("input[type='text']");
    inputFields.forEach((item) => {
      item.setAttribute('disabled', '');
    });
    start.style.display = 'none';
    cancel.style.display = 'inline';
    this.block = true;
    depositBank.disabled = true;
    depositCheck.disabled = true;
  }

  addEventListenerName(item) {
    item.addEventListener('keypress', (e) => {
      var keyCode = e.keyCode;
      if (!/[а-яА-Я,. ]/.test(String.fromCharCode(keyCode))) {
        e.preventDefault();
      }
    });
  }

  addEventListenerSum(item) {
    item.addEventListener('keypress', (e) => {
      var keyCode = e.keyCode;
      if (!/[0-9]/.test(String.fromCharCode(keyCode))) {
        e.preventDefault();
      }
    });
  }

  resetValues() {
    localStorage.clear();
    const _this = this;
    inputFields = leftSide.querySelectorAll("input[type='text']");
    inputFields.forEach((item) => {
      item.value = '';
      item.disabled = false;
    });

    inputFields = rightSide.querySelectorAll("input[type='text']");
    inputFields.forEach((item) => {
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
    this.targetMonth = 0;
    this.income = {};
    this.expenses = {};
    additionalIncomeValue.value = '';
    this.addIncome = [];
    additionalExpensesValue.value = '';
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
  }

  checkCookies() {
    let cookies = document.cookie.split('; ');
    let map = new Map();
    cookies.forEach((item) => {
      let newItem = item.split('=');
      map.set(newItem[0], newItem[1]);
    });

    if (localStorage.getItem('budgetMonth') == map.get('budgetMonth') &&
      localStorage.getItem('budgetDay') == map.get('budgetDay') &&
      localStorage.getItem('expensesMonth') == map.get('expensesMonth') &&
      localStorage.getItem('addExpenses') == map.get('addExpenses') &&
      localStorage.getItem('addIncome') == map.get('addIncome') &&
      localStorage.getItem('incomePeriod') == map.get('incomePeriod') &&
      localStorage.getItem('target') == map.get('target') &&
      localStorage.getItem('period') == map.get('period')) {
        return true;
      }
      return false;
  }
  
  deleteCookies() {
    deleteCookie('budgetMonth');
    deleteCookie('budgetDay');
    deleteCookie('expensesMonth');
    deleteCookie('addExpenses');
    deleteCookie('addIncome');
    deleteCookie('incomePeriod');
    deleteCookie('target');
    deleteCookie('period');
    deleteCookie('isLoad');

    function deleteCookie(name) {
      let date = new Date();
      date.setTime(date.getTime() - 1);
      document.cookie = name += "=; expires=" + date.toGMTString();
    }
  }

  eventListeners() {
    const _this = this;

    const newStart = this.start.bind(this),
      newAddBlock = this.addBlock.bind(this),
      newResetValues = this.resetValues.bind(this),
      newChangePeriod = this.changePeriod.bind(this);

    start.addEventListener('click', newStart);
    cancel.addEventListener('click', newResetValues);

    expensePlus.addEventListener('click', () => {
      expensesItems = newAddBlock(".expenses-title", ".expenses-amount", ".expenses-items", expensesItems, expensePlus);
    });

    incomePlus.addEventListener('click', () => {
      incomeItems = newAddBlock(".income-title", ".income-amount", ".income-items", incomeItems, incomePlus);
    });

    periodSelect.addEventListener('mousemove', newChangePeriod);

    depositCheck.addEventListener('change', () => {
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

    inputName.forEach((item) => {
      _this.addEventListenerName(item);
    });
    inputSum.forEach((item) => {
      _this.addEventListenerSum(item);
    });

    if (localStorage.getItem('isLoad') && this.checkCookies()) {
    this.budgetMonth = localStorage.getItem('budgetMonth');
    this.budgetDay = localStorage.getItem('budgetDay');
    this.expensesMonth = localStorage.getItem('expensesMonth');
    this.addExpenses = localStorage.getItem('addExpenses');
    this.addIncome = localStorage.getItem('addIncome');
    incomePeriodValue.value = localStorage.getItem('incomePeriod');
    this.targetMonth = localStorage.getItem('target');
    periodSelect.value = localStorage.getItem('period');
    this.changePeriod();
    this.showResult();
    this.blockFields();
    } else {
      this.deleteCookies();
      localStorage.clear();
    }
  }
}

const appData = new AppData();

appData.eventListeners();