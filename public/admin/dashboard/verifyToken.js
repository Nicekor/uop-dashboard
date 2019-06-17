'use strict';

const token = localStorage.getItem('token');
checkToken(token).then((tokenIsValid) => {
  if (!tokenIsValid) {
    window.location.replace('/admin');
  }
});
