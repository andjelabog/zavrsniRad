var cron = require('node-cron');
const rp = require('request-promise');
const Initial = require('../models/initial.model');

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
    task.stop();
}


/**
 * At 03:00. do a specific job.
 */


/**
 * TESTING : '* * * * *' => RUN EVERY MINUTE
 */
module.exports = () => {
    cron.schedule('0 3 * * *', () => {
        getWorldDataForSerbia();
        Initial.remove({});
        createNewInitials();
    });

    const task = cron.schedule('* * * * *', () => {
        getWorldDataForSerbia();
        Initial.remove({});
        createNewInitials();
        createAmbulances();
    })
}