if (localStorage.getItem('accounts') == null) {
    localStorage.setItem('accounts', JSON.stringify([{ name: 'Admin', password: '12345' }]));
}

document.getElementsByTagName('button')[0].addEventListener('click', login);

function login() {
    
    let oldErr = document.querySelector('form p.alert');
    if (oldErr) oldErr.remove();

    let name     = document.getElementById('name').value;
    let password = document.getElementById('password').value;
    let accounts = JSON.parse(localStorage.getItem('accounts'));

    for (let acc of accounts) {
        if (acc.name == name && acc.password == password) {
            localStorage.setItem('loggedInUser', name);
            window.location.href = (name == 'Admin') ? 'index.html' : 'profile.html';
            return;
        }
    }

    
    let err = document.createElement('p');
    err.innerText = '⚠ Invalid Username or Password';
    err.classList.add('alert');
    err.style.cssText = `
        margin-top: 12px;
        padding: 10px 16px;
        border-radius: 10px;
        font-size: 0.85rem;
        color: #f87171;
        background: rgba(239,68,68,0.12);
        border: 1px solid rgba(239,68,68,0.25);
        text-align: center;
    `;
    document.querySelector('form').appendChild(err);
}
