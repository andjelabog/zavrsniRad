const express = require('express');
const router = express.Router();
const MailCtrl = require('../controllers/mail.controller');

router.post('/testMail', MailCtrl.sendMail);



module.exports = router;