var express = require('express');
var router = express.Router();
var childProcess = require('child_process');
var githubUsername = 'chenaaron3'
var scriptDirectory = '/var/www'
var scriptFile = 'deploy.sh'

router.post("/github", function (req, res) {
    var sender = req.body.sender;
    var branch = req.body.ref;

    if(branch.indexOf('master') > -1 && sender.login === githubUsername){
        deploy(res);
    }
})

function deploy(res){
    childProcess.exec(`cd ${scriptDirectory} && ./${scriptFile}`, function(err, stdout, stderr){
        if (err) {
         console.error(err);
         return res.send(500);
        }
        res.send(200);
      });
}

export default router;