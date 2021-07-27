const mongoose = require('mongoose');

const AmbulanceSchema = new mongoose.Schema({
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    memo: {
        type: String,
        required: false
    },
    street: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    }
});
const Ambulance = mongoose.model('Ambulance', AmbulanceSchema);
module.exports = Ambulance;