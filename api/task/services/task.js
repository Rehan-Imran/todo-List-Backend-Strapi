"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async findOneTask(id, users_permissions_user) {
    try {
      let task = await strapi
        .query("task")
        .findOne({ id, users_permissions_user });
      return task;
    } catch (errror) {
      throw error;
    }
  },
  async updateTask(id, users_permissions_user, body) {
    try {
      let task = await strapi
        .query("task")
        .update({ id, users_permissions_user }, body);
      return task;
    } catch (errror) {
      throw error;
    }
  },
  async findTasks(users_permissions_user) {
    try {
      let task = await strapi.query("task").find({ users_permissions_user });
      return task;
    } catch (errror) {
      throw error;
    }
  },
  async createTask(body, users_permissions_user) {
    try {
      let task = await strapi
        .query("task")
        .create({ ...body, users_permissions_user });
      return task;
    } catch (errror) {
      throw error;
    }
  },
};
