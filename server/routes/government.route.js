const express = require('express');
const router = express.Router();

const request = require('request');
const rp = require('request-promise');

const Initial = require('../models/initial.model');
const Ambulance = require('../models/ambulance.model');
const OWIDSerbia = require('../models/owidSerbia.model');

function doACall(options) {
    return rp(options)
        .then(function(body) {
            return body;
        })
        .catch(error =>
            console.log("API call failed: " + error))
}

// router.post('/map', function(req, res) {
//     var options = {
//         uri: 'https://covid19.data.gov.rs/api/datasets/statistic/incomplete_ranking/10',
//         body: JSON.stringify({ "dataSetId": 1, "refCodes": [{ "id": 1, "code": "COVID-19 статистике заражени", "values": [{ "id": 1, "name": "Заражено у дану" }] }], "territoryGroupId": 5, "dimTime": "2021-04-25", "hash": "libyevzigrlfeEGTOUvQu0eeaQUA5pyp" }),
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     };
//     doACall(options).then(function(body) {
//         res.send(body);
//     })
// });

/**
 * Getting all the locations for nearest ambulances in Serbia
 */
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

// Initial values on graphs on dashboard
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
        let nameENG = "";
        for (let i = 0; i < initialArray.length; i++) {
            switch (initialArray[i]['dataCode'].toString()) {
                case 'BROJ_LICA_NA_RESPIRATORU_ZA_DATI_DATUM':
                    nameENG = "Total on Respirators"
                    break;
                case 'BROJ_HOSPITALIZOVANIH_LICA_ZA_DATI_DATUM':
                    nameENG = "Total Hospitalized"
                    break;
                case 'BROJ_POZITIVNIH_LICA_ZA_DATI_DATUM':
                    nameENG = "Daily New Cases"
                    break;
                case 'UKUPAN_BROJ_POZITIVNIH_LICA_OD_POČETKA_PANDEMIJE':
                    nameENG = "Total Cases"
                    break;
                case 'BROJ_TESTIRANIH_LICA_ZA_DATI_DATUM':
                    nameENG = "Daily Tested"
                    break;
                case 'UKUPAN_BROJ_TESTIRANIH_LICA_OD_POČETKA_PANDEMIJE':
                    nameENG = "Total Tested"
                    break;
                case 'BROJ_PREMINULIH_LICA_ZA_DATI_DATUM':
                    nameENG = "Daily Deaths"
                    break;
                case 'BROJ_PREMINULIH_MUŠKARACA_ZA_DATI_DATUM':
                    nameENG = "Men Daily Deaths"
                    break;
                case 'BROJ_PREMINULIH_ŽENA_ZA_DATI_DATUM':
                    nameENG = "Women Daily Deaths"
                    break;
                case 'UKUPAN_BROJ_PREMINULIH_LICA_OD_POČETKA_PANDEMIJE':
                    nameENG = "Total Deaths"
                    break;
                case 'UKUPAN_BROJ_IZLEČENIH_LICA_OD_POČETKA_PANDEMIJE':
                    nameENG = "Total Recovered"
                    break;
                case 'PROSEK_GODINA_LICA_PREMINULIH_ZA_DATI_DATUM':
                    nameENG = "Daily Mean Age of Deaths"
                    break;
                case 'PROCENAT_ZARAŽENIH_LICA_ U_ODNOSU_NA_BROJ_TESTIRANIH_LICA_ZA_DATI DATUM':
                    nameENG = "Daily Percent infected / tested"
                    break;
                case 'PROCENAT_ZARAŽENIH_LICA_OD_POČETKA_PANDEMIJE_U_ODNOSU_NA_UKUPAN_BROJ_TESTIRANIH_LICA':
                    nameENG = "Total Percent infected / tested"
                    break;
                case 'PROCENAT_HOSPITALIZOVANIH_LICA_U ODNOSU_NA_UKUPAN_BROJ_ZARAŽENIH_ZA_DATI_DATUM':
                    nameENG = "Percent Hospitalized / infected"
                    break;
                case 'PROCENAT_IZLEČENIH_LICA_U_ODNOSU_NA_UKUPAN_BROJ_ZARAŽENIH_OD_POČETKA_PANDEMIJE':
                    nameENG = "Total Percent Recoverd / Infected"
                    break;
                case 'PROCENAT_LICA_NA_RESPIRATORU_U_ODNOSU_NA_UKUPAN_BROJ_HOSPITALIZOVANIH':
                    nameENG = "Total Percent on Respirators / Hospitalized"
                    break;
                default:
                    nameENG = "";
            }
            const newInitial = new Initial({
                code: initialArray[i]['dataCode'],
                name: initialArray[i]['dataName'],
                nameENG: nameENG,
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


/**
 * Get latest values from ourworldindata.org
 */
router.get('/worldDataSerbia', function(req, res) {
    var options = {
        uri: 'https://covid.ourworldindata.org/data/latest/owid-covid-latest.json',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    doACall(options).then(function(body) {
        let serbianData = JSON.parse(body)["SRB"]; // Specific for Serbia
        console.log(serbianData)
        const newOWIDSerbia = new OWIDSerbia({
            population: serbianData["population"],
            lastUpdatedDate: serbianData["last_updated_date"],
            totalCases: serbianData["total_cases"],
            newCases: serbianData["new_cases"],
            totalDeaths: serbianData["total_deaths"],
            newDeaths: serbianData["new_deaths"],
            newTests: serbianData["new_tests"],
            totalTests: serbianData["total_tests"],
            positiveRate: serbianData["positive_rate"],
            totalVaccinations: serbianData["total_vaccinations"],
            peopleVaccinated: serbianData["people_vaccinated"],
            peopleFullyVaccinated: serbianData["people_fully_vaccinated"],
            newVaccinations: serbianData["new_vaccinations"],
            created_at: Date.now()
        })
        newOWIDSerbia.save().catch(function(err) {
            return res.status(400).json({
                status: 400,
                message: err.message
            });
        });
    });
    return res.status(200).json({
        status: 200,
        message: "Success"
    });
});


module.exports = router;