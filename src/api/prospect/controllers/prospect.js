'use strict';

/**
 * prospect controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::prospect.prospect', ({ strapi }) => ({
  async registerBaseInterest(ctx) {
    const { id } = ctx.params;
    const { primesCh2024Id } = ctx.request.body;

    // Mise à jour de l'entité prospect avec l'offre et primes_ch_2024
    const entity = await strapi.service('api::prospect.prospect').update(id, {
      data: {
        primesCh2024: primesCh2024Id,
      }, 
      populate : '*'
    });
    return entity;
  },

  async registerComplInterest(ctx) {
    const { id } = ctx.params;
    const { complementaireId } = ctx.request.body;

    // Mise à jour de l'entité prospect avec l'offre et primes_ch_2024
    const entity = await strapi.service('api::prospect.prospect').update(id, {
      data: {
        complementaire: complementaireId,
      }, 
      populate : '*'
    });
    return entity;
  }
}));
