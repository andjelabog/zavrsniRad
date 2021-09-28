var cron = require('node-cron');
const rp = require('request-promise');
const Initial = require('../models/initial.model');
const Ambulance = require('../models/ambulance.model');
const OWIDSerbia = require('../models/owidSerbia.model')

function doACall(options) {
    return rp(options)
        .then(function(body) {
            return body;
        })
        .catch(error =>
            console.log("API call failed: " + error))
    return null;
}

function getWorldDataForSerbia() {

    var options = {
        uri: 'http://localhost:3000/api/govs/worldDataSerbia',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    doACall(options);
}

function createNewInitials() {
    var options = {
        uri: 'http://localhost:3000/api/govs/initial',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    doACall(options);
}

function createAmbulances() {
    var options = {
        uri: 'http://localhost:3000/api/govs/ambulances',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    doACall(options);
}


/**
 * TESTING : '* * * * *' => RUN EVERY MINUTE
 * CHANGE SECOND STAR FOR HOUR
 */
module.exports = () => {
    cron.schedule('0 17 * * *', () => {
        getWorldDataForSerbia();
        Initial.collection.drop();
        createNewInitials();
    });
    OWIDSerbia.collection.drop();
    getWorldDataForSerbia();
    Initial.collection.drop();
    createNewInitials();
    Ambulance.collection.drop();
    createAmbulances();

}