var express = require('express');
var router = express.Router();
const sgMail = require('@sendgrid/mail');
const path = require('path');

/* GET home page. */
router.post('/email', function(req, res, next) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log(req.body);
  const msg = {
    to: req.body.to,
    from: req.body.from,
    subject: req.body.subject,
    text: req.body.text
  };
  sgMail.send(msg).then(function() {
    res.status(200).send("Message sent!");
  }).catch(function(){
    res.status(400).send("Please enter a valid email!");
  })
});

router.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname+'../client/build/index.html'));
});

module.exports = router;
