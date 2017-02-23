var routes = require("../server/routing");

var securedFunction = function(requestHandler, responseHandler) {
	responseHandler.ok({
		name: "secured function example",
		authObj: requestHandler.authObj
	});
}

routes.register({
	pathname: "/secure",
	func: securedFunction,
	secure: true
});
