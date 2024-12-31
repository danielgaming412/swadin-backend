'use strict';

/**
 * astuce service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::astuce.astuce');
