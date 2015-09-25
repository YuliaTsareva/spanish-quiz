'use strict';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getUrlHash() {
  return window.location.hash.substr(1);
}

module.exports.getRandomInt = getRandomInt;
module.exports.getUrlHash = getUrlHash;
