const express = require('express');

const DashboardCtrl = require('../controllers/dashboard.controller');
const router = express.Router();

router.get('/', DashboardCtrl.list);


module.exports = router;