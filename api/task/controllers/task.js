"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
const stat = require("../../../helper-functions/status");
const helper = require("../../../helper-functions/helperFunctions");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    let entity;
    const users_permissions_user = ctx.state.user.id;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.task.create(
        { ...data, users_permissions_user },
        { files }
      );
    } else {
      entity = await strapi.services.task.create({
        ...ctx.request.body,
        users_permissions_user,
      });
    }
    return sanitizeEntity(entity, { model: strapi.models.task });
  },
  async find(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }

    const data = await strapi.services.task.find({
      users_permissions_user: user.id,
    });

    if (!data) {
      return ctx.notFound();
    }
    ctx.send(data);
  },

  async update(ctx) {
    const user = ctx.state.user;
    const { id } = ctx.params;

    const entity = await strapi.services.task.findOne({
      id,
      users_permissions_user: user.id,
    });
    const array = Object.values(stat);
    const existingState = entity.status.toLowerCase();
    const indexOfExistingState = array.indexOf(existingState);
    let entiti;
    if (array[indexOfExistingState + 1]) {
      if (
        array[indexOfExistingState + 1] === entity.status &&
        entity.status === "inprogress"
      ) {
        ctx.request.body.start_date = helper.getDateTime();
      } else if (
        array[indexOfExistingState + 1] === entity.status &&
        entity.status === "done"
      ) {
        ctx.request.body.completion_date = helper.getDateTime();
      }
    }
    entiti = await strapi.services.task.update({ id }, ctx.request.body);
    return sanitizeEntity(entiti, { model: strapi.models.task });
  },
};
