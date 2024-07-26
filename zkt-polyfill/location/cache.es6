/** @format */

// 后面重构出底层的storage
// eslint-disable-next-line @typescript-eslint/no-unused-vars
/**
 *
 */
function setLocationToStorage(res) {
  try {
    sessionStorage.setItem('pvPosition', JSON.stringify(res));
  } catch (e) {
    console.log(e);
  }
}

function getLocationFromStorage () {
  let position = null;
  try {
    position = JSON.parse(sessionStorage.getItem('pvPosition'));
  } catch (e) {
    console.log(e);
  }
  return position;
}

module.exports = {
  getLocationFromStorage,
  setLocationToStorage,
};
