const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'stayplannerhelp@gmail.com',
        pass: 'hlga rapi zufi bgre'
    }
});
module.exports = transporter;