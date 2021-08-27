const express = require('express');

const OWIDSerbiaCtrl = require('../controllers/owidSerbia.controller');
const router = express.Router();

router.get('/', OWIDSerbiaCtrl.listLast);


module.exports = router;