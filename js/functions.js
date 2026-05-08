function totalMonthlyHours(dailyWorkingHours, weeklyDays, monthlyWeeks) {
    return dailyWorkingHours * weeklyDays * monthlyWeeks;
}

function hourlyRate(salary, totalMonthlyHours) {
    return salary / totalMonthlyHours;
}

function extraValue(extraHours, hourlyRate, jobTitle) {
    let multiplier = 1;
    if (jobTitle === 'Salesman') multiplier = 1.5;
    if (jobTitle === 'Admin') multiplier = 2;
    return extraHours * hourlyRate * multiplier;
}

function grossSalary(basicSalary, bonus, penalties, extra) {
    return parseFloat(basicSalary) + parseFloat(bonus) - penalties + extra;
}

function taxValue(gross, taxRate) {
    return gross * taxRate;
}

function netSalary(gross, taxes) {
    return gross - taxes;
}

async function getCurrencyRate(crncy) {
    let apiKey = '8e16d6ee9fcc36ea3920a01a';
    let response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${crncy}`);
    let data = await response.json();
    return data.conversion_rates.EGP;
}

function convertNumbers(nums = [], rate) {
    return nums.map(num => (num * rate).toFixed(2));
}

function createAccount(name, password = '123') {
    if (localStorage.getItem('accounts') == null) {
        localStorage.setItem('accounts', JSON.stringify([{ name: 'Admin', password: '12345' }]));
    }
    let currentAccounts = JSON.parse(localStorage.getItem('accounts'));
    currentAccounts.push({ name, password });
    localStorage.setItem('accounts', JSON.stringify(currentAccounts));
}
