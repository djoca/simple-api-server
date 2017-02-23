
var jwt = require("jsonwebtoken");
var config = require("../config/config");

/*
 * Default authentication handler.
 */
var authenticationHandler = function(login, password, callback) {
	console.warn("Default authentication handler. Not safe for production!");

	callback(null, login === password);
}

var handleAuthentication = function(login, password, callback) {
	authenticationHandler(login, password, callback);
}

/*
 * Creates a token for the object in the parameter, using the configured 
 * token secret.
 */
var sign = function(obj) {
	var options = {
		expiresIn: config.tokenExpiration
	};

	return jwt.sign(obj, config.tokenSecret, options);
}

var verify = function(token, callback) {
	var options = {
		ignoreExpiration: !config.tokenExpiration
	};

	jwt.verify(token, config.tokenSecret, options, function(err, decoded) {
		if (config.logTokenErrors && err) {
			console.error(err);
		}

		callback(err, decoded);
	});
}

var register = function(func) {
	console.log("Registering authentication handler.");
	authenticationHandler = func;
}

module.exports = {sign, verify, register, handleAuthentication};