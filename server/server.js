//TODO Better logging
//TODO Write README
//TODO Better authentication example
//TODO TESTS!!
//TODO Central database handling? Or any other resource handling
//TODO Better js imports
//TODO Change routes.register call to routing.register on all files
//FIXME Padronizar mensagens JSON
//TODO support POST and other methods

var http = require("http");
var url = require("url");

var routing = require("./routing");
var authentication = require("./authentication"); // FIXME Ugly! Need this for registering /authenticate
var requestHandlerFactory = require("./request-handler");
var responseHandlerFactory = require("./response-handler");
var security = require("./security");
var config = require("../config/config");

// This server
var server = undefined;

/*
 * Main server logic
 */
var requestListener = function (request, response) {
	var requestHandler = requestHandlerFactory.create(request);
	var responseHandler = responseHandlerFactory.create(response);

	var route = routing.get(requestHandler.pathname);

	// If there's not a configured path, return 404
	if (!route) {
		responseHandler.notFound();
		return;
	}

	// If route is not secure, call function without token
	if (!route.secure) {
		route.func(requestHandler, responseHandler);
		return;
	}

	// Retrieve token for secure routes
	var token = requestHandler.params.token;

	if (!token) {
		responseHandler.forbidden();
		return;
	}

	// Verify token and call function
	security.verify(token, function(err, decoded) {
		if (err) {
			responseHandler.forbidden();
			return;
		}

		requestHandler.credentials = decoded;

		route.func(requestHandler, responseHandler);
	});

}

// Start the server and listen for incoming requests
var start = function() {

	// Read function files before starting the server
	routing.readFunctionFiles();

	server = http.createServer(requestListener);

	var httpServerPort = config.httpServerPort || 9000;

	server.listen(httpServerPort);

	console.log("Server running at port %d.", httpServerPort);
}

var stop = function() {
	server.close();
}

module.exports = {start, stop};