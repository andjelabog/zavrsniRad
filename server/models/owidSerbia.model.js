const mongoose = require('mongoose');
// const InitialData = require('./initialData.model');

const OWIDSerbiaSchema = new mongoose.Schema({
    population: {
        type: Number,
        required: false
    },
    lastUpdatedDate: {
        type: String,
        required: true
    },
    totalCases: {
        type: Number,
        required: true
    },
    newCases: {
        type: Number,
        required: false
    },
    totalDeaths: {
        type: Number,
        required: false
    },
    newDeaths: {
        type: Number,
        required: false
    },
    newTests: {
        type: Number,
        required: false
    },
    totalTests: {
        type: Number,
        required: false
    },
    positiveRate: {
        type: Number,
        required: false
    },
    totalVaccinations: {
        type: Number,
        required: false
    },
    peopleVaccinated: {
        type: Number,
        required: false
    },
    peopleFullyVaccinated: {
        type: Number,
        required: false
    },
    newVaccinations: {
        type: Number,
        required: false
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }

});
const OWIDSerbia = mongoose.model('OWIDSerbia', OWIDSerbiaSchema);
module.exports = OWIDSerbia;