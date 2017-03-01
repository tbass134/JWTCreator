var nexmo = require('./nexmo.js');
var NEXMO_APP_ID = "<NEXMO_APPLICATION_ID>";
var NEXMO_PRIVATE_KEY_PATH = "<PATH_TO_PRIVATE_KEY";

var params = {
    url: "https://api.nexmo.com/v1/calls",
    method: "get",
    applicationID:NEXMO_APP_ID,
    privateKeyPath:NEXMO_PRIVATE_KEY_PATH
}

nexmo.executeRequest(params, function (error, result) {
    if (error) {
        console.log("error ", error);
    } else {
        console.log("result ", result);
    }
})


