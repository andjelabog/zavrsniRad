var cron = require('node-cron');
const rp = require('request-promise');

function doACall(options) {
    return rp(options)
        .then(function(body) {
            return body;
        })
        .catch(error =>
            console.log("API call failed: " + error))
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


module.exports = () => {
    // cron.schedule('* * * * *', () => {
    //     getWorldDataForSerbia();
    // });
}


/**
 * At 03:00. do a specific job.
 */
//  var task=  cron.schedule('0 3 * * *', () => {
//     console.log('running a task every minute');
// });