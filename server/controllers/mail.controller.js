var nodemailer = require('nodemailer');
var fs = require('fs');


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

    // writeFile function with filename, content and callback function
    fs.writeFile('covid19.csv', JSON.parse(req.body.body), function(err) {
        if (err) throw err;
        else {
            console.log('File is created successfully.');

            // Has to be in else, for synching File System's creation of file then sending the file.
            let mailOptions = {
                from: '"zavrsniRad" zavrsnirad19@gmail.com',
                to: req.body.email, // Sent from modal
                subject: 'Zavrsni Rad',
                text: "Zavrsni rad",
                attachments: { // Stream as an attachment
                    filename: 'covid19.csv',
                    content: fs.createReadStream('covid19.csv')
                }
            };
            // Creating trasporter, to send mail.
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error.message);
                }
                console.log('success');
            });
        }
    });



}