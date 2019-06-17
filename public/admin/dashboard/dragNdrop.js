'use strict';

const dm = document.getElementsByClassName('dragme');

function dragstart(e) {
  const style = window.getComputedStyle(e.target, null);
  e.dataTransfer.setData("text/plain", (parseInt(style.getPropertyValue("left"), 10) - e.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - e.clientY) + ',' + e.target.getAttribute('data-item'));
}

function dragover(e) {
  e.preventDefault();
  return false;
}

// offset[2] is the data-item defined in the html
function drop(e) {
  const offset = e.dataTransfer.getData("text/plain").split(',');
  dm[parseInt(offset[2])].style.left = (e.clientX + parseInt(offset[0], 10)) + 'px';
  dm[parseInt(offset[2])].style.top = (e.clientY + parseInt(offset[1], 10)) + 'px';
  e.preventDefault();
  return false;
}

for (let i = 0; i < dm.length; i++) {
  dm[i].addEventListener('dragstart', dragstart, false);
}
document.body.addEventListener('dragover', dragover, false);
document.body.addEventListener('drop', drop, false);
