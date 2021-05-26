async function getDateTime() {
  let today = new Date();
  let dateTime =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    " " +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds;

  return dateTime;
}

module.exports = { getDateTime: getDateTime };
