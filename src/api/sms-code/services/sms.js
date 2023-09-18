
'use strict';
module.exports = {
    sendValidationCode: async (phone, code) => {
        const message = `Votre code Swiss Advise est : ${code}`;
        var config = {
            "disable": true, // switch to false to enable the service
            "UserName": process.env.ASPSMS_USER,
            "Password": process.env.ASPSMS_PASSWORD,
            "Originator": process.env.ASPSMS_ORIGINATOR,
            // Optional: 
            "logger": console.log,
        };
        const sms = require('mod-aspsms')(config);
        const phoneNumbers = [phone];
        sms.send(phoneNumbers, message); 
    }
};
