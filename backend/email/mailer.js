const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ece.20becd76@silicon.ac.in',
        pass: 'ypul oyul wlar qomm'
    }
});
module.exports = transporter;