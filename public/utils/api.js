'use strict';

function AuthException() {
  this.message = 'Error: Wrong credentials';
  this.name = 'AuthException';
}

function FailedResponseException(message) {
  this.message = message;
  this.name = 'FailedResponseException';
}

async function login(username, password) {
  const response = await fetch(
    '/admin/',
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      })
    }
  );
  if (response.ok) {
    const json = await response.json();
    const { token } = json;
    return token;
  }
  throw new AuthException();
}

async function checkToken(token) {
  if(!token) {
    return false;
  }
  const response = await fetch(
    '/api/checkToken',
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        token
      })
    }
  );
  if (response.ok) {
    return true;
  }
  return false;
}

async function getSettings() {
  const response = await fetch('/api/settings');
  if(response.ok) {
    const json = await response.json();
    return json;
  }
  throw new FailedResponseException('Cannot GET settings');
}

async function setSetting(token, setting, value) {
  const response = await fetch('/api/settings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      setting,
      value,
    })
  });

  if (!response.ok) {
    throw new FailedResponseException(`Failed to set ${setting} to ${value}`);
  }
}

async function resetSettings() {
  const response = await fetch('/api/settings', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new FailedResponseException(`Failed to reset settings`);
  }
}

async function getLocationAddress(latitude, longitude) {
  let url = `/api/locationAddress?lat=${latitude}&long=${longitude}`;
  const response = await fetch(url);
  if(response.ok) {
    const json = await response.json();
    return json;
  }
  throw new FailedResponseException('Cannot GET location address');
}

async function getNewsHeadlines(latitude, longitude, category) {
  const locationAddress = await getLocationAddress(latitude, longitude);
  const countryCode = locationAddress.countryCode;
  const quantity = elNewsList.childElementCount;

  let url = `http://localhost:8080/api/newsHeadlines?country=${countryCode}&pageSize=${quantity}`;

  if (category) {
    url = `http://localhost:8080/api/newsHeadlines?country=${countryCode}&pageSize=${quantity}&category=${category}`;
  }

  const response = await fetch(url);
  if(response.ok) {
    const json = await response.json();
    return json;
  }
  throw new FailedResponseException('Cannot GET news headlines');
}
