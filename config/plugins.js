module.exports = ({ env }) => ({
    'import-export-entries': {
        enabled: true,
    },
    "vercel-deploy": {
        enabled: true,
        config: {
            deployHook:"https://api.vercel.com/v1/integrations/deploy/prj_Y2OzXvI7jagipjIYJPKvzwhh0Z0v/m2b866vayv",
            apiToken: "yFJCcz8n5Mr9cNgSFBxjVRb7", 
            appFilter: "swadin-backend",
            teamFilter: "",
            roles: ["strapi-super-admin", "strapi-author"],
          },
      },
});