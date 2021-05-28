async function getDateTime() {
  let today = new Date();
  return today.toISOString();
}
async function checkStatus(stat, index, body) {
  if (stat[index + 1] && stat[index + 1] === body.status) {
    let finalBody = setDateTime(body);
    return finalBody;
  }
}

async function setDateTime(body) {
  if (body.status === "inprogress") {
    body.start_date = await getDateTime();
  } else if (body.status === "done") {
    body.completion_date = await getDateTime();
  }
  return body;
}
module.exports = { getDateTime: getDateTime, checkStatus: checkStatus };
