var url = require("url");

/*
 * The ResponseHandler class
 */
var RequestHandler = function(_request) {

	// The request object
	this.request = _request;

	var requestUrl = url.parse(_request.url, true);

	// Query params
	this.params = requestUrl.query;

	// Pathname
	this.pathname = requestUrl.pathname;

}

/*
 * Create an instance of ResponseHandler
 */
var create = function(request) {
	return new RequestHandler(request);
}

module.exports = {create};