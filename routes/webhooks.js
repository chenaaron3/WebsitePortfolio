var express = require('express');
var router = express.Router();
var childProcess = require('child_process');
var githubUsername = 'chenaaron3'
var scriptDirectory = '/var/www'
var scriptFile = 'deploy.sh'

// test webook

router.post("/github", function (req, res) {
    var sender = req.body.sender;
    var branch = req.body.ref;

    if (branch.indexOf('master') > -1 && sender.login === githubUsername) {
        console.log("Push Detected! Now Deploying!");
        deploy(res);
    }
})

function deploy(res) {
    let command = `cd ${scriptDirectory} && ./${scriptFile}`;
    let child = childProcess.spawn(command, {
        stdio: 'inherit',
        shell: true
    });

    child.on('exit', function (code, signal) {
        console.log('child process exited with ' + `code ${code} and signal ${signal}`);
        res.send(200);
    });
    
    // childProcess.exec(command, function (err, stdout, stderr) {
    //     if (err) {
    //         console.log("Something went wrong during deployment!")
    //         console.error(err);
    //         return res.send(500);
    //     }
    //     console.log("Successfully Deployed!")
    //     res.send(200);
    // });
}

module.exports = router;