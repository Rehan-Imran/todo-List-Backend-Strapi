"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
const stat = require("../../../helper-functions/status");
const helper = require("../../../helper-functions/helperFunctions");
const taskService = require("../services/task");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    let entity;
    const users_permissions_user = ctx.state.user.id;
    entity = await taskService.createTask(
      ctx.request.body,
      users_permissions_user
    );
    return sanitizeEntity(entity, { model: strapi.models.task });
  },
  async find(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }

    const data = await taskService.findTasks(user.id);

    if (!data) {
      return ctx.notFound();
    }
    ctx.send(data);
  },

  async update(ctx) {
    const user = ctx.state.user;
    const { id } = ctx.params;

    const entity = await taskService.findOneTask(id, user.id);
    const existingState = entity.status.toLowerCase();
    const indexOfExistingState = stat.indexOf(existingState);
    let finalBody;
    let entiti;
    let state = false;
    finalBody = await helper.checkStatus(
      stat,
      indexOfExistingState,
      ctx.request.body
    );
    if (finalBody) {
      state = true;
    } else if (
      !stat[indexOfExistingState + 1] &&
      ctx.request.body.status === "todo"
    ) {
      finalBody = ctx.request.body;
      state = true;
    }
    if (state === true) {
      entiti = await taskService.updateTask(id, user.id, finalBody);
      return sanitizeEntity(entiti, { model: strapi.models.task });
    } else {
      return ctx.badRequest("No condition Satisfied");
    }
  },
};
