'use strict';

// elements
const elTime = document.getElementById('time');
const elLocation = document.getElementById('location');
const elNewsList = document.getElementById('news-list');

window.addEventListener('load', init);

function init() {
  initSettings().then(loadSettings);
  refreshSettings();
  setTime();
  setlocationAddress();
  refreshLocation();
  setNewsHeadlines();
  refreshNews();
}

function loadSettings() {
  setNewsHeadlines(loadedSettings['news-category']);
}

function refreshSettings() {
  setInterval(initSettings, 1000);
}

function setTime() {
  const now = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const weekDay = days[now.getDay()];
  const month = months[now.getMonth()];
  const day = now.getDate();
  const year = now.getFullYear();

  const outputString = weekDay + ', ' + day + ' ' + month + ' ' + year;

  elTime.textContent = outputString;
}

function geoFindMe() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      error('Geolocation is not supported by your browser');
    } else {
      elLocation.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(resolve, error);
    }
  });

  function error() {
    elLocation.textContent = 'Unable to retrieve your location';
    elNewsList.firstElementChild.textContent = 'Unable to retrieve your country news';
  }
}

async function setlocationAddress() {
  const { latitude, longitude } = (await geoFindMe()).coords;
  const locationAddress = await getLocationAddress(latitude, longitude);
  const locationAddressValues = Object.values(locationAddress);

  if(locationAddress.village === undefined && locationAddress.city === undefined && locationAddress.country === undefined) {
    elLocation.textContent = 'Unable to retrieve your location';
    return;
  }

  elLocation.textContent = '';

  // length-1 because I don't want to output the last value which is the country code
  for(let i = 0; i < locationAddressValues.length - 1; i++) {
    if(locationAddressValues[i]) {
      elLocation.textContent += `${locationAddressValues[i]} | `;
    }
  }
  const lastIndex = elLocation.textContent.lastIndexOf(' |');
  elLocation.textContent = elLocation.textContent.substring(0, lastIndex);
}

function refreshLocation() {
  setInterval(setlocationAddress, 300000);
}

async function setNewsHeadlines(category) {
  const { latitude, longitude } = (await geoFindMe()).coords;
  const newsHeadlines = await getNewsHeadlines(latitude, longitude, category);
  const newsElements = elNewsList.children;
  for (let i = 0; i < elNewsList.childElementCount; i++) {
    newsElements[i].textContent = newsHeadlines[i];
  }
}

function refreshNews(){
  setInterval(setNewsHeadlines, 300000);
}
