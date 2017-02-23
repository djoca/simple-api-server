var path = require("path");

/*
 * Configuration file
 */
module.exports = {
    // Token expiration in seconds. 
    // Comment the line bellow to disable token expiration
    tokenExpiration: 3600,

    // pass-phrase for token generation use
    tokenSecret: "SecretPassPhrase",

    // Toggle token error logging
    logTokenErrors: true,

    // the listening server port
    httpServerPort: 9000,

    // Define a 404 not found message
    msg404: "Oops! Looks like the resource you requested does not exist.",

    // Define a 500 Internal Server Error message
    msg500: "Ouch! Something bad happened!",

    // The path where all the API functions reside
    functionsPath: path.join(__dirname, "../functions")
}


