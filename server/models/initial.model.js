const mongoose = require('mongoose');
// const InitialData = require('./initialData.model');

const InitialSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    data: [{
        date: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        month: {
            type: Number,
            required: true,
        },
        day: {
            type: Number,
            required: true,
        },
        people: {
            type: Number,
            required: true,
        }
    }]
});
const Initial = mongoose.model('Initial', InitialSchema);
module.exports = Initial;