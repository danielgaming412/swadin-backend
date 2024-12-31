'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

const coreController = createCoreController('api::form-analytic.form-analytic');

module.exports = {
    ...coreController,
    async analytics(ctx) {
        const { created_at_gte, created_at_lte, step_name } = ctx.request.query;
        let query = `
        SELECT step_number, step_name, COUNT(*) as count
        FROM form_analytics
          WHERE 1=1
        `;
        let params = [];
        if (created_at_gte && created_at_lte) {
            query += ` AND created_at BETWEEN ? AND ?`;
            params.push(created_at_gte, created_at_lte);
        } else {
            if (created_at_gte) {
                query += ` AND created_at >= ?`;
                params.push(created_at_gte);
            }
            if (created_at_lte) {
                query += ` AND created_at <= ?`;
                params.push(created_at_lte);
            }
            else {
                query += ` AND created_at >= ?`;
                params.push(new Date(new Date().setDate(new Date().getDate() - 7)));
            }
        }
        if (step_name) {
            query += ` AND step_name = ?`;
            params.push(step_name);
        }
        query += ` GROUP BY step_number, step_name
         ORDER BY step_number`;
        const result = await strapi.db.connection.context.raw(query, params);
        console.log(result);
        ctx.send(result);
    },
};
