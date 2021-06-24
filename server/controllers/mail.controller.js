var nodemailer = require('nodemailer');

exports.sendMail = function(req, res) {
    const nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'zavrsnirad19@gmail.com',
            pass: 'zavrsniRad_19'
        }
    });

    // kreiranje transportera radi
    // zameniti sadrzaj i ostalo...
    let mailOptions = {
        from: '"TEST" zavrsnirad19@gmail.com',
        to: 'djokicandjela@gmail.com',
        subject: 'Test',
        text: 'Hello World!'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error.message);
        }
        console.log('success');
    });

}