const nodemailer = require('nodemailer');
require('dotenv').config()

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "skl.frtransportes@gmail.com", // TODO: your gmail account 
        pass: "SKL_2077" // TODO: your gmail password
    }
});
    
module.exports = transporter