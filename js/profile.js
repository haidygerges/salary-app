if (!localStorage.getItem('loggedInUser') || localStorage.getItem('loggedInUser') == '') {
    window.location.href = 'login.html';
}

let name = localStorage.getItem('loggedInUser');
let data = JSON.parse(localStorage.getItem('show'));
let emptyState = document.getElementById('emptyState');

if (data && data.length > 0) {
    let found = false;
    data.forEach(emp => {
        if (emp[0] == name) {
            found = true;
            let row = document.createElement('tr');
            emp.forEach(item => {
                let td = document.createElement('td');
                td.innerText = item;
                row.appendChild(td);
            });
            document.querySelector('table tbody').appendChild(row);
        }
    });
    if (found && emptyState) emptyState.style.display = 'none';
} else {
    if (emptyState) emptyState.style.display = 'block';
}
