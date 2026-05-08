if (!localStorage.getItem('loggedInUser') || localStorage.getItem('loggedInUser') == '') {
    window.location.href = 'login.html';
}

document.querySelectorAll('form button')[0].addEventListener('click', calculateSalary);
document.querySelectorAll('form button')[1].addEventListener('click', clearEmployees);

async function calculateSalary() {
    let name     = document.getElementById('name').value;
    let basic    = document.getElementById('basic').value;
    let bonus    = document.getElementById('bonus').value;
    let Penalty  = document.getElementById('Penalty').value;
    let extra    = document.getElementById('extra').value;
    let jobTitle = document.getElementById('jobTitle').value;
    let currency = document.getElementById('currency').value;

    let monthHours = totalMonthlyHours(8, 5, 4);
    let hour       = hourlyRate(basic, monthHours);
    let extraV     = extraValue(extra, hour, jobTitle);
    let gross      = grossSalary(basic, bonus, Penalty, extraV);
    let tax        = taxValue(gross, 0.22);
    let net        = netSalary(gross, tax);

    let convRate         = await getCurrencyRate(currency);
    let convertedNumbers = convertNumbers([basic, bonus, Penalty, extraV, gross, tax, net], convRate);

    let rowData = [
        name,
        convertedNumbers[0],
        convertedNumbers[1],
        convertedNumbers[2],
        extra,
        hour.toFixed(2),
        convertedNumbers[3],
        convertedNumbers[4],
        '22%',
        convertedNumbers[5],
        convertedNumbers[6]
    ];

    if (localStorage.getItem('show') == null) {
        localStorage.setItem('show', JSON.stringify([]));
    }

    let myData = JSON.parse(localStorage.getItem('show'));
    myData.push(rowData);
    localStorage.setItem('show', JSON.stringify(myData));

    createAccount(name, '123');
    showData();
}

function showData() {
    let tbody      = document.querySelector('table tbody');
    let emptyState = document.getElementById('emptyState');

    if (localStorage.getItem('show') != null) {
        let data = JSON.parse(localStorage.getItem('show'));
        tbody.innerHTML = '';

        if (data.length === 0) {
            if (emptyState) emptyState.style.display = 'block';
            return;
        }

        if (emptyState) emptyState.style.display = 'none';

        data.forEach(rowData => {
            let row = document.createElement('tr');
            rowData.forEach(item => {
                let td = document.createElement('td');
                td.innerText = item;
                row.appendChild(td);
            });
            tbody.appendChild(row);
        });
    } else {
        if (emptyState) emptyState.style.display = 'block';
    }
}

function clearEmployees() {
    localStorage.clear();
    localStorage.setItem('show', JSON.stringify([]));
    localStorage.setItem('accounts', JSON.stringify([{ name: 'Admin', password: '12345' }]));
    showData();
}

showData();
