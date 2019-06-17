### Folder Structure (Architecture) ###

```bash
├── _models
│   ├── config.js - credentials for the database
│   └── mysql.js mysql database model
├── _routes
|   ├── session.js (check how auth is made)
|   └── other routes needed.js
├── public
|   ├── index.html
|   ├── style.css
|   ├── index.js
|   └── (basically front end)
├── server.js - all the packages and initialization of the server
├── REFLECTION.md - reflection on the encountered designs and technologies
                    and my learning.
└── README.md - explanation of key features and how to use them; Details of my
                design and implementation rationale.
```

- - - -

### Ideas ###
I'll create a dashboard which will be in the index route, with multiple widgets
on it without the option of being configured (this because this dashboard will
be display on a Unattended Display which has no inputs).

For them to be configured I'll create a route, something like
localhost:8080/admin with a simple authentication on it and then when the admin
logs in will have all the options to customize the dashboard.

In this /admin route, the admin won't be able to register as the app will only
have one admin, so this account will be pre-created and there will be only
one admin account.

- - - -

### Front End Ideas ###
All the widgets would be in a form of a box that I call containers.

* Widget - Live news headlines
  * API - https://newsapi.org/
  * Admin will be able to choose which category he wants
  * Users will get the news from their country (depending on user's location)
  * `getNewsHeadlines()`:
    * `category` is for default undefined, i.e there are news for any categories.
    The admin will be able to change it later.
* Time and Location of the user in the top of the page
 * At the time the user connects to the website, the time and location
 from which they are connected are sent to the server to be stored in the database
* Admin will be able to Drag n Drop on both mobile and desktop.

- - - -

### API Ideas ###
* Create an /admin route where the admin of the app can configure the dashboard (authentication)
* POST and GET time and location that the user accessed the website
* GET location address from latitude and longitude
* GET news headlines from current country
* POST, GET and DELETE dashboard settings so the admin can change the website settings

- - - -

### Bugs Fixes and New Learnings ###
* `setLocationData()`:
  * After an AJAX request, sometimes the data can not be fecth to the
    `locationAddress` variable so I applied this case:
    ```javascript
    if(locationAddress.village === undefined && locationAddress.city === undefined && locationAddress.country === undefined) {
      elLocation.textContent = 'Unable to retrieve your location';
      return;
    }
    ```
  * Another case would be if there is no data for one of the fields so I would
    output just the ones I have with this case:
    ```javascript
    for(let i = 0; i < locationAddressValues.length; i++) {
      if(locationAddressValues[i]) {
        elLocation.textContent += `${locationAddressValues[i]} | `;
      }
    }
    ```
    where
    ```javascript
    const locationAddressValues = Object.values(locationAddress);
    ```
  * Also, I realized that location is already a built-in variable so I changed it to
    `locationAddress`.

* `geoFindMe()` and `setLocationData()` :
  * I was trying to split the code from `geoFindMe()` into a `setLocationData()`
  function, I tried to return the `function success(position)` so then I could
  return a coords array with the latitude and longitude of the user. But as
  `navigator.geolocation.getCurrentPosition(success, error);` is an async function
  I ended up not needing to use `localStorage` and instead returned a Promise
  with the latitude and longitude.

* Environment variables `.env`:
  * Trying to find a way to hide my api key just found about environment variables.
  I stored my api key in a `.env` file, made git ignore this file so I would
  not accidentally push it to github and I can obtain this variables on the server
  like this: `process.env.API_KEY` where API_KEY is the variable that I want
  from `.env` file. This way the key is hidden and I can later make a request
  for it on the front end.
  * Installed `dotenv` package so I don't need to `source .env` everytime I want
  to run the server.

* `node-fetch`:
  * I need to make api calls from the backend in order to not expose my api keys
  so, as `fetch()` is a DOM API function it won't work in nodejs. That's when
  I found about the `node-fetch` package to be able to use it.
* `JWT Authentication`
  * <!-- TODO  -->
* `Token Validity control)`
  * <!-- TODO -->
* `CSS Flex`
  * <!-- TODO -->
* `reduce function`
  * * <!-- TODO -->
