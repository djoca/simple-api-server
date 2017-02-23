var fs = require("fs");
var path = require("path");
var config = require("../config/config");

/*
 * Route configuration
 */
var routes = [];

/*
 * Register new routes
 */
var register = function(route) {
	console.log("Registering route %s (%s).", route.pathname, route.secure ? "secured" : "public");
	routes.push(route);
}

/*
 * Return a route for the specified path
 */
var get = function(path) {
	return routes.find(function(element) {
		return element.pathname === path;
	});
}

/*
 * Scan for files in /functions for automatic registering
 */
var readFunctionFiles = function() {
	var functionsPath = config.functionsPath;

	if (!functionsPath) {
		console.warn("No config.functionsPath set.");
		return;
	}

	console.log("Reading files from %s", functionsPath);

	// Called only at server boot, so it's safe to use sync functions
	fs.readdirSync(functionsPath).forEach(function(file) {
		var stat = fs.statSync(path.join(functionsPath, file));

		if (stat && stat.isFile()) {
			require(path.join(functionsPath, file));
		}
	});
}

module.exports = {register, get, readFunctionFiles};
