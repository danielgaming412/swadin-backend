'use strict';

/**
 * sms-code service
 */

const { createCoreService } = require('@strapi/strapi').factories;

"use strict"
module.exports = () => ({
  async create(data) {
    return await strapi.entityService.create("api::sms-code.sms-code", {
      data,
    });
  },

   async get() {
    return await strapi.entityService.findMany("api::sms-code.sms-code");
  },
});
