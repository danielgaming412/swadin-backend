'use strict';
/**
 * sms-code controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::sms-code.sms-code');

module.exports = {
    async create(ctx) {
        const code = Math.floor(Math.random() * 9000 + 1000);
        const phone = ctx.request.body.phone;
        if (!phone) {
            return ctx.badRequest('Numéro de téléphone requis');
        }
        // console.log("phonecontroller", phone)
        // Calculate the expiration time (e.g., 15 minutes from now)
        const expiresIn = 15 * 60 * 1000; // 15 minutes in milliseconds
        const expiresAt = new Date(Date.now() + expiresIn);

        // Save the code and its expiration time in your database
        const verificationData = {
            phone,
            validation_code: code,
            expires_at: expiresAt,
        };

        const existingVerification = await strapi.entityService.findMany("api::sms-code.sms-code",
            {
                filters: { phone: phone },
                limit: 1,
                populate: { propspect: true },
            });

        //  console.log(existingVerification)

        if (existingVerification && existingVerification.length > 0) {
            // Update the existing record with the new code and expiration time
            const entity = existingVerification[0]
            //   console.log("entity", entity);
            // console.log(verificationData)
            await strapi.entityService.update("api::sms-code.sms-code", entity.id, { data: verificationData });
            //  console.log("updated")
        } else {
            // Create a new record if it doesn't exist with the verificationData
            await strapi.service("api::sms-code.sms-code").create(verificationData);
            // console.log("created");
        }

        if (!phone || !code) {
            return ctx.badRequest('Phone number and verification code are required');
        }

        // Send the validation code
        strapi.service("api::sms-code.sms").sendValidationCode(phone, code);
        return ctx.send({ message: `${code} available for 15min only` });
    },


    async get(ctx) {
        return await strapi
            .service("api::sms-code.sms-code")
            .get(ctx.request.body);

    },

    async verify(ctx) {
        const { phone, validation_code } = ctx.request.body;
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
            // Mark the user as verified in your database
            // Create prospect in the database TODO
            await strapi.entityService.create("api::prospect.prospect", {
                data: {
                    email: "test",
                    phone: phone,
                },
            });
            return ctx.send({ message: 'Vérification réussie' });
        } else {
            return ctx.badRequest('Code de vérification invalide ou expiré');
        }
    }
}