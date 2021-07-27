const Ambulance = require('../models/ambulance.model');

exports.list = function(req, res) {
    Ambulance.find()
        .then(function(ambulances) {
            return res.status(200).json({
                status: 200,
                data: ambulances,
                message: "Success"
            });
        })
        .catch(function(err) {
            return res.status(400).json({
                status: 400,
                message: err.message
            });
        });
}