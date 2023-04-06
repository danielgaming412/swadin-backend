
'use strict';
module.exports = {
    sendValidationCode: async (phone, code) => {
        const message = `Votre code Swiss Advise est : ${code}`;
        var config = {
            "disable": true, // switch to false to enable the service
            "UserName": process.env.ASPSMS_USERNAME,
            "Password": process.env.ASPSMS_PASSWORD,
            "Originator": process.env.ASPSMS_ORIGINATOR,
            // Optional:
            "logger": console.log,
        };
        const sms = require('mod-aspsms')(config);
        //  const msg = 'A MONAKUDUM';
        // const addressBook = ['+33678682644', '+41782336046'];
        try {
            //sms.send(phone, message);
            console.log("phone", phone)
            console.log("message", message)

        } catch (error) {
            console.error(error);
        }

    }
};
