'use strict';

const elUsername = document.getElementById('username');
const elPassword = document.getElementById('password');
const elLogin = document.getElementById('login');
const elError = document.getElementById('error');

async function loginUser(e) {
  e.preventDefault();
  try {
    const token = await login(elUsername.value, elPassword.value);
    localStorage.setItem('token', token);
    window.location.replace('dashboard');
  } catch(err) {
    if (err instanceof AuthException) {
      elError.style.display = 'inline-block';
      elError.textContent = err.message;
    } else {
      console.error(err);
    }
  }
}

elLogin.addEventListener('submit', loginUser);
window.addEventListener('load', async () => {
  const token = localStorage.getItem('token');
  const tokenIsValid = await checkToken(token);
  if (tokenIsValid) {
    window.location.replace('dashboard');
  } else {
    localStorage.clear();
  }
});
