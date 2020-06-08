var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path')
const sgMail = require('@sendgrid/mail');

let jsonFile = "contact.json";
let jsonString = fs.readFileSync(path.join(__dirname, '../json', jsonFile), 'utf8');
let json = JSON.parse(jsonString);

router.post('/email', function(req, res, next) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log(req.body);
    const msg = {
      to: req.body.to,
      from: req.body.from,
      subject: req.body.subject,
      text: req.body.text
    };
    sgMail.send(msg)
    .then(() => res.status(200).send("Message sent!"))
    .catch(function(err){
      console.log(err);
      res.status(400).send("Please enter a valid email!");
    })
  });

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