module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/calculMeilleuresPrimes',
      handler: 'prime-ch.calculMeilleuresPrimes',
      config: {
        auth: false
      }
    }
  ]
};