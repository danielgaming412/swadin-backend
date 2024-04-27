'use strict';
/**
 * sms-code controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::sms-code.sms-code');

module.exports = {
    
    /**
     * Generates a validation code, saves it in the database along with its expiration time,
     * and sends the code to the provided phone number. It also creates a new prospect record
     * in the database with the provided information.
     *
     * @param {object} ctx - The context object containing the request body.
     * @returns {object} - A success response object with the message and prospect ID.
     * @throws {Error} - If phone number or verification code is missing.
     */
    async create(ctx) {
      const code = Math.floor(Math.random() * 9000 + 1000);
      const {
        phone,
        validation_code,
        email,
        form_info,
        prime_actuelle,
        family_name,
        family_members_count,
        specifique_med_alt,
        specifique_abo_sport,
        specifique_hospit,
        specifique_protec_jur
      } = ctx.request.body;

      if (!phone) {
        throw new Error('Numéro de téléphone requis');
      }

      const expiresIn = 15 * 60 * 1000; // 15 minutes in milliseconds
      const expiresAt = new Date(Date.now() + expiresIn);

      const verificationData = {
        phone,
        validation_code: code,
        expires_at: expiresAt,
      };

      const existingVerification = await strapi.entityService.findMany("api::sms-code.sms-code", {
        filters: { phone },
        limit: 1,
        populate: { propspect: true },
      });

      if (existingVerification.length > 0) {
        const entity = existingVerification[0];
        await strapi.entityService.update("api::sms-code.sms-code", entity.id, { data: verificationData });
      } else {
        await strapi.service("api::sms-code.sms-code").create(verificationData);
      }

      if (!phone || !code) {
        throw new Error('Phone number and verification code are required');
      }

      strapi.service("api::sms-code.sms").sendValidationCode(phone, code);

      const prospect = await strapi.entityService.create("api::prospect.prospect", {
        data: {
          form_info: form_info || {},
          prime_actuelle: prime_actuelle || [],
          email: email || "non renseigné",
          phone,
          family_name: family_name || "non renseigné",
          family_members_count,
          specifique_med_alt,
          specifique_abo_sport,
          specifique_hospit,
          specifique_protec_jur
        },
      });

      return { message: `${code} available for 15min only`, prospect: prospect.id };
    },

    async get(ctx) {
        return await strapi
            .service("api::sms-code.sms-code")
            .get(ctx.request.body);

    },

    async verify(ctx) {
        const { phone, validation_code, prospect_id } = ctx.request.body;
        // Fetch the stored code and expiration time from the database
        const existingVerification = await strapi.entityService.findMany("api::sms-code.sms-code", {
            filters: { phone: phone },
            limit: 1,
            populate: { prospect: true },
        });

        if (!existingVerification || existingVerification.length === 0) {
            return ctx.badRequest('Phone number not found');
        }

        const storedVerification = existingVerification[0];
        const isCodeCorrect = storedVerification.validation_code === parseInt(validation_code);
        const isCodeExpired = new Date(storedVerification.expires_at) < new Date();

        // console.log("storedVerification", storedVerification);
        // console.log("code from body", ctx.request.body);
        // console.log("isCodeExpired", isCodeExpired);

        // Compare the submitted code with the stored code and check if it's expired
        if (isCodeCorrect && !isCodeExpired) {
            const entity  = await strapi.entityService.findOne("api::prospect.prospect", prospect_id);
            console.log("prospect_id", prospect_id)
            console.log("entity", entity);
            const updateNumeroValieEtScore = await strapi.entityService.update("api::prospect.prospect", prospect_id, {
                data: {
                    score: entity.score + 1,
                    numeroValide : true
                },
            });

            console.log("updateScore", updateNumeroValieEtScore);
            // Mark the user as verified in your database
            // Create prospect in the database TODO
            // await strapi.entityService.u("api::prospect.prospect", {
            //     data: {
            //         form_info: form_info || {},
            //         prime_actuelle: prime_actuelle || [],
            //         email: email || "non renseigné",
            //         phone: phone,
            //         family_name: family_name || "non renseigné",
            //     },
            // });
            return ctx.send({ message: 'Vérification réussie' });
        } else {
            return ctx.badRequest('Code de vérification invalide ou expiré');
        }
    }
}