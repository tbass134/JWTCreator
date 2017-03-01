

exports.executeRequest = function (params, callback) {
    var request = require('request');

    var url = params.url;
    var method = params.method;
    var applicationID = params.applicationID
    var privateKeyPath = params.privateKeyPath
    var json = params.json;

    var fs = require("fs");
    var path = require('path');
    var file = path.join(__dirname, privateKeyPath);
    var cert = fs.readFileSync(file); // get private key

    token = sign(applicationID, cert);    
    auth = {
        bearer: token
    }

    request({
        url: url,
        method: method,
        auth: auth
    }, function (err, response, body) {
        // console.log("err " + err);
        // console.log("response ", response);
        // console.log("body " + body);
        if (err) {
            callback(err);
        } else {
            callback(body);
        }
    });
    // console.log('request ', request);
    
}

function sign(applicationID, privateKeyPath) {
    // sign with default (HMAC SHA256)
    var jwt = require('jsonwebtoken');
    var uuid = require('uuid');
    var hour = (60 * 60)

    var date = Math.floor(Date.now() / 1000)
    var toSign = {
        'iat': date,
        'application_id': applicationID,
        'jti': uuid.v1()
    };
   
    return jwt.sign(toSign, privateKeyPath, {
        algorithm: 'RS256'
    });
}