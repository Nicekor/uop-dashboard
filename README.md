# Configurable Dashboard
### Introduction
This is a simple configurable dashboard developed with HTML, CSS, Javascript,
 NodeJS and MySQL. This dashboard has a single widget (for now) which displays
 the news headlines of the user(s) current location (country). The admin is able
 to configure what is displayed to the user(s) as for example the background-colour
 or the news category.

### Requirements
* Node.js and npm - https://nodejs.org/en/
* MySQL - https://dev.mysql.com/doc/mysql-installation-excerpt/5.5/en/installing.html

### Local Installation Guide
To install the Node.js modules run: `npm install`

Then the SQL database must be installed with: `npm run setup`

And finally to run simply type: `npm start`

This will start the server with `nodemon` in the port `:8080`.

### Key Features

On the startup of this app, which is (`http://localhost:8080/`) the user is
requested to allow the server to know his location. (This is the only input
that this page has).
As this is supposed to not have any inputs this page is for displaying purposes
only.

 * On the header we can find the current day, month and year followed by the
 current user's location address (if allowed by the user).
 * In the body we can find a table with recent news headlines from the current
 country (if location is allowed as well as It's based on user location).

### Key Features - Admin

Now if the admin wants to configure what's displayed in the index page he must go to
this link: `http://localhost:8080/admin/` and a Login form is displayed.
The admin should enter his credentials which are the following:
`username: admin`
`password: 4b_JecSr`
(These are located in the database).
If the admin enters his credentials wrong a feedback is returned to him.

After the user Logs In he is redirected to `http://localhost:8080/admin/dashboard/`
and his session is on for 1 hour, after this time he is logged out automatically.

* Settings - On the header (top left corner) we have a settings icon, if we click
 on it the Settings form is displayed and the admin is able to change:
  * The Background Colour - It has a list of multiple colours that can be chosen,
  it changes the page background colour both in the admin and the index page.
  * The News Category - It has a list with multiple news categories that can be chosen,
  it changes the news category both in admin and the index page.
  * Reset - If this button is clicked the settings go back to their default.
  * Quit - To quit this form we click on the `X` symbol on the top right corner.
* Logout - On the header (top right corner) we have a logout icon, if we click on
it we end our session.
* Widgets - For now there is only one widget which is the `News Headlines` and
this can be dragged and dropped anywhere in the page although it's not changing
its position in the index page.

API
-----
* /admin
  * POST: Confirm if the credentials match the database and if so creates a token.
* /api/checkToken
  * POST: Send the current token in order to check it.
* /api/locationAddress
  * GET: Retrieve the user's current location.
* /api/newsHeadlines
 * GET: Retrieve news headlines based in location and optionally a news category.
* /api/settings
 * GET: Retrieve current dashboard settings.
 * POST: Send a new dashboard setting.
 * DELETE: Reset to dashboard default settings.
* /auth/verify-token
 * This is used as middleware for some action that needs requires authentication.
