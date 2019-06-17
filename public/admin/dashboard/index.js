'use strict';

// elements
const elTime = document.getElementById('time');
const elLocation = document.getElementById('location');
const elNewsList = document.getElementById('news-list');
const elBackgroundSelect = document.getElementById('option-background');
const elCategorySelect = document.getElementById('option-category');
const elResetButton = document.getElementById('option-reset');
const elBody = document.querySelector('body');
const elCloseButton = document.getElementById('close-button');
const elSettings = document.getElementById('settings');
const elSettingsButton = document.getElementById('settings-button');
const elLogoutButton = document.getElementById('logout-button');

//token
const getToken = () => localStorage.getItem('token');

window.addEventListener('load', init);

elSettingsButton.addEventListener('click', () => {
  const token = getToken();
  elSettings.style.display = 'block';
});

elCloseButton.addEventListener('click', () => {
  const token = getToken();
  elSettings.style.display = 'none';
});

elResetButton.addEventListener('click', async () => {
  await resetSettings();
  elBackgroundSelect.value = defaultSettings['background-color'];
  elBody.style.backgroundColor = defaultSettings['background-color'];
  elCategorySelect.value = defaultSettings['news-category'];
  setNewsHeadlines(defaultSettings['news-category']);
});

elBackgroundSelect.addEventListener('change', () => {
  const { value } = elBackgroundSelect;
  const token = getToken();

  elBody.style.backgroundColor = value;
  setSetting(token, 'background-color', value);
});

elCategorySelect.addEventListener('change', () => {
  const { value } = elCategorySelect;
  const token = getToken();
  setNewsHeadlines(value);
  setSetting(token, 'news-category', value);

});

elLogoutButton.addEventListener('click', () => {
  localStorage.setItem('token', null);
  window.location.replace('/admin');
});

function init() {
  initSettings().then(loadSettings);
  setTime();
  setlocationAddress();
  refreshLocation();
  refreshNews();
}

function loadSettings() {
  loadNamedColours();
  loadNewsCategories();
  setNewsHeadlines(loadedSettings['news-category']);
}

function loadNamedColours() {
  const isSet = loadedSettings['background-color'] !== null;
  const backgroundColourOptions = NAMED_COLOURS.map(
    ({ hex, name }) => new Option(
      name,
      hex,
      defaultSettings['background-color'] === hex,
      loadedSettings['background-color'] === hex
    )
  );
  elBackgroundSelect.append(...backgroundColourOptions);
  if (!isSet) {
    elBackgroundSelect.value = defaultSettings['background-color'];
  }
}

function loadNewsCategories() {
  const isSet = loadedSettings['news-category'] !== null;
  const newsCategoryOptions = NEWS_CATEGORIES.map(
    ( {option, name }) => new Option(
      name,
      option,
      defaultSettings['news-category'] === option,
      loadedSettings['news-category'] === option
    )
  );
  elCategorySelect.append(...newsCategoryOptions);
  if (!isSet) {
    elCategorySelect.value = defaultSettings['news-category'];
  }
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
