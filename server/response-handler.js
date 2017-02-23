var config = require("../config/config");

/*
 * The ResponseHandler class
 */
var ResponseHandler = function(_response) {

	// The response object
	this.response = _response;

	/*
	 * Default headers
	 */
	var defaultHeaders = {
		"Content-Type": "application/json; charset=utf-8",
		"Access-Control-Allow-Headers": "Content-Type",
		"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
		"Access-Control-Allow-Origin": "*"
	};

	/*
	 * Status 200 Ok
	 */
	this.ok = function(data) {
		this.response.writeHead(200, defaultHeaders);

		if (data) {
			this.response.write(JSON.stringify(data));
		}

		this.response.end();
	}

	/*
	 * Status 404 Not Found
	 */
	this.notFound = function() {
		this.response.statusCode = 404;
		this.response.write(config.msg404 || "Resource not found");
		this.response.end();
	}

	/*
	 * Status 500 Internal Server Error
	 */
	this.internalServerError = function(exception) {
		this.response.statusCode = 500;
		this.response.write(config.msg500 || "Internal Server Error");
		this.response.end();
	}

	/*
	 * Status 403 Forbidden
	 */
	this.forbidden = function() {
		this.response.writeHead(403, defaultHeaders);
		this.response.end();
	}

}

/*
 * Create an instance of ResponseHandler
 */
var create = function(response) {
	return new ResponseHandler(response);
}

module.exports = {create};