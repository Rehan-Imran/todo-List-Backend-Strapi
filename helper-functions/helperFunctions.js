async function getDateTime() {
  let today = new Date();
  return today.toISOString();
}

module.exports = { getDateTime: getDateTime };
