const express = require('express');

const AmbulanceCtrl = require('../controllers/ambulances.controller');
const router = express.Router();

router.get('/', AmbulanceCtrl.list);


module.exports = router;