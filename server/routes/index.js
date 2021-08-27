const express = require('express');

const router = express.Router();

const govRoutes = require('./government.route');
const mailRoutes = require('./mail.route');
const dashboardRoutes = require('./dashboard.route');
const ambulanceRoutes = require('./ambulance.route');
const dataRoutes = require('./owidSerbia.route');

router.get('/', function(req, res) {
    res.send('API works!');
});

router.use('/mail', mailRoutes);
router.use('/ambulance', ambulanceRoutes);
router.use('/govs', govRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/data', dataRoutes);





module.exports = router;