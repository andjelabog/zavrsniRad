const OWIDSerbia = require('../models/owidSerbia.model');

exports.listLast = function(req, res) {
    OWIDSerbia.find().sort({ created_at: -1 }).limit(1)
        .then(function(owidSerbia) {
            return res.status(200).json({
                status: 200,
                data: owidSerbia,
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