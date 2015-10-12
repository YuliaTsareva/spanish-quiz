export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function getUrlHash() {
  return window.location.hash.substr(1);
}
