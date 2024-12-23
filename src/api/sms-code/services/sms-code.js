'use strict';

/**
 * sms-code service
 */

const { createCoreService } = require('@strapi/strapi').factories;

"use strict"
module.exports = () => ({
  async create(data) {
    return await strapi.documents("api::sms-code.sms-code").create({
      data,
    });
  },

   async get() {
    return await strapi.documents("api::sms-code.sms-code").findMany();
  },
});
