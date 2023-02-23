// Path: ./config/env/production/server.js

module.exports = ({ env }) => ({
    proxy: true,
    url: env('https://shrouded-spire-88121.herokuapp.com/'), // Sets the public URL of the application.
    app: { 
      keys: env.array('APP_KEYS')
    },
});
