var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path')

let jsonFile = "projects.json";
let jsonString = fs.readFileSync(path.join(__dirname, '../json', jsonFile), 'utf8');
let json = JSON.parse(jsonString);

router.get('/webDev/:id', function (req, res, next) {
    let id = req.params.id;
    if (json["webDev"].hasOwnProperty(id)) {
        res.json(json["webDev"][id]);
    }
    else{
        res.status(404).send(`${id} not found!`);
    }
});

router.get('/systems/:id', function (req, res, next) {
    let id = req.params.id;
    if (json["systems"].hasOwnProperty(id)) {
        res.json(json["systems"][id]);
    }
    else{
        res.status(404).send(`${id} not found!`);
    }
});

module.exports = router;