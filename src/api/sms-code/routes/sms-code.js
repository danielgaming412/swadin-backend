'use strict';

/**
 * sms-code router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::sms-code.sms-code');

module.exports = {
    routes: [
      {
        method: "POST",
        path: "/sms-code",
        handler: "sms-code.create",
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: "GET",
        path: "/sms-code",
        handler: "sms-code.get",
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'POST',
        path: '/sms-code/verify',
        handler: 'sms-code.verify',
        config: {
          policies: [],
          middlewares: [],
        },
      }
    ],
  };
