const express = require('express');

const router = express.Router();

const postRoutes = require('./post.route');
const govRoutes = require('./government.route');
const mailRoutes = require('./mail.route');
const dashboardRoutes = require('./dashboard.route');

router.get('/', function(req, res) {
    res.send('API works!');
});
router.use('/posts', postRoutes);
router.use('/govs', govRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/mail', mailRoutes);



module.exports = router;