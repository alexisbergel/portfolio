const transporter = require('../config/transporter');

// Main Page

exports.EN_page = (req, res, next) => {
    res.render('landing_page');
}

exports.FR_page = (req, res, next) => {
    res.render('landing_page_FR');
}


// Contact

exports.sendMessage = (req, res, next) => {
    const { mail, message } = req.body;
    const errors = [];

    // Checks data format
    if (typeof mail !== 'string' || typeof message !== 'string') {
        errors.push({field:'mail'});
        errors.push({field:'message'});
    }

    // Checks if user provides a mail
    if (mail.length === 0) {
        errors.push({field:'mail'});
    }

    // Checks if user provides a message
    if (message.length === 0) {
        errors.push({field:'message'});
    }

    if (errors.length > 0) {
        const error = new Error('Missing data before sending a message');
        error.details = errors
        error.status = 400;
        return next(error);
    }

    const mailText = 'MAIL: ' + mail + '\n\n' + 'MESSAGE: ' + message;

    const mailOptions = {
        to: process.env.MAIL_APP_TO,
        subject: 'Message reçu depuis alexisbergel.com',
        text: mailText
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return next(error);
        }

        return res.status(200).json({message: 'message sent'});
    })
}