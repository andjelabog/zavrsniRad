const express = require('express');
const router = express.Router();
const request = require('request');
const rp = require('request-promise');
const Initial = require('../models/initial.model');
const Ambulance = require('../models/ambulance.model');

function doACall(options) {
    return rp(options)
        .then(function(body) {
            return body;
        })
        .catch(error =>
            console.log("API call failed: " + error))
}

// Za popunjavanje vrednosti na mapi
router.post('/map', function(req, res) {
    var options = {
        uri: 'https://covid19.data.gov.rs/api/datasets/statistic/incomplete_ranking/10',
        body: JSON.stringify({ "dataSetId": 1, "refCodes": [{ "id": 1, "code": "COVID-19 статистике заражени", "values": [{ "id": 1, "name": "Заражено у дану" }] }], "territoryGroupId": 5, "dimTime": "2021-04-25", "hash": "libyevzigrlfeEGTOUvQu0eeaQUA5pyp" }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    doACall(options).then(function(body) {
        res.send(body);
    })
});


router.get('/ambulances', function(req, res) {
    var options = {
        uri: 'https://covid19.data.gov.rs/api/datasets/ambulances',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    doACall(options).then(function(body) {
        initialArray = JSON.parse(body);
        for (let i = 0; i < initialArray.length; i++) {
            const newAmbulance = new Ambulance({
                lat: initialArray[i]['latitude'],
                lng: initialArray[i]['longitude'],
                city: initialArray[i]['city'],
                name: initialArray[i]['name'],
                memo: initialArray[i]['memo'],
                street: initialArray[i]['street'],
                phone: initialArray[i]['phone1'],
            })
            newAmbulance.save().catch(function(err) {
                return res.status(400).json({
                    status: 400,
                    message: err.message
                });
            })

        }
        res.send(body);
    })
});

// Za popunjavanje vrednosti na graficima
router.get('/initial', function(req, res) {
    var options = {
        uri: 'https://covid19.data.gov.rs/api/datasets/statistic/official',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    doACall(options).then(function(body) {
        initialArray = JSON.parse(body);
        console.log(initialArray)
        for (let i = 0; i < initialArray.length; i++) {
            const newInitial = new Initial({
                code: initialArray[i]['dataCode'],
                name: initialArray[i]['dataName'],
                data: []
            })
            for (let j = 0; j < initialArray[i]['points'].length; j++) {
                const newData = {
                    date: initialArray[i]['points'][j]['abscissa']['date'],
                    year: Number.parseInt(initialArray[i]['points'][j]['abscissa']['year']),
                    month: Number.parseInt(initialArray[i]['points'][j]['abscissa']['month']),
                    day: Number.parseInt(initialArray[i]['points'][j]['abscissa']['day']),
                    people: Number.parseFloat(initialArray[i]['points'][j]['ordinate'] || 0)
                }
                newInitial.data.push(newData)
            }
            newInitial.save().catch(function(err) {
                return res.status(400).json({
                    status: 400,
                    message: err.message
                });
            });
        }
        res.send(body);
    })
});


module.exports = router;