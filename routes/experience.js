var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path')

let jsonFile = "experience.json";
let jsonString = fs.readFileSync(path.join(__dirname, '../json', jsonFile), 'utf8');
let json = JSON.parse(jsonString);

router.get('/:id', function (req, res, next) {
    let id = req.params.id;
    if (json.hasOwnProperty(id)) {
        res.json(json[id]);
    }
    else{
        res.status(404).send(`${id} not found!`);
    }
});

module.exports = router;