module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/form-analytic/analytics',
            handler: 'custom-form-analytic.analytics',
            config: {
                policies: []
            }
        }
    ]
}