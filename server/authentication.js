var security = require("./security");
var routes = require("./routing");

/*
 * Authenticates the user and returns a token if successful. 
 */
var authenticate = function(requestHandler, responseHandler)  {
	var login = requestHandler.params.login; 
	var password = requestHandler.params.password;

	var callback = function(err, authOk) {
		if (err) {
			responseHandler.internalServerError(err);
			return;
		}

		if (authOk) {
			var credentials = {
				login: login
			};

			var token = security.sign(credentials);

			responseHandler.ok({
				success: true, 
				token: token
			});

		} else {
			responseHandler.forbidden();
		}
	}

	security.handleAuthentication(login, password, callback);
}

routes.register({
	pathname: "/authenticate",
	func: authenticate
});
