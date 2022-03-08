const nodemailer = require('nodemailer');
require('dotenv').config()

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.ADMIN_EMAIL, // TODO: your gmail account 
        pass: process.env.ADMIN_PASSWORD // TODO: your gmail password
    }
});
    
module.exports = transporter