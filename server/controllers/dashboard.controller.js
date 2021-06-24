const Initial = require('../models/initial.model');

exports.list = function(req, res) {
    Initial.find()
        .then(function(initials) {
            return res.status(200).json({
                status: 200,
                data: initials,
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