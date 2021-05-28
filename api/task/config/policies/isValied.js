const stat = require("../../../../helper-functions/helperFunctions");
module.exports = async (ctx, next) => {
  if (
    (ctx.request.body.status.toLowerCase() === "done" &&
      !ctx.request.body.deadline) ||
    (ctx.request.body.status.toLowerCase() === "inprogress" &&
      ctx.request.body.deadline) ||
    (ctx.request.body.status.toLowerCase() === "todo" &&
      !ctx.request.body.deadline)
  ) {
    await next();
  }

  // The code below will be executed after the controller's action.
  if (ctx.status === 404) {
    ctx.body = "Invalied Request. Kindly resend the request with correct body.";
  }
};
