const express = require('express');
const router = express.Router();
const MailCtrl = require('../controllers/mail.controller');

router.get('/testMail', MailCtrl.sendMail);



module.exports = router;