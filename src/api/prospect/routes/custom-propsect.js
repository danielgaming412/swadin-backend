// path: /src/api/prospect/routes/custom-prospect.js

module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/prospects/:id/register-base-interest',
        handler: 'prospect.registerBaseInterest',
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'POST',
        path: '/prospects/:id/register-compl-interest',
        handler: 'prospect.registerComplInterest',
        config: {
          policies: [],
          middlewares: [],
        },
      },
    ],
  };
  