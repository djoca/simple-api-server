var assert = require('assert');
var mockery = require('mockery');

describe('security', function() {
	it('should return a credential if token is valid');
	it('should return a token if authentication is successful');
	it('should return a token with expiration time if config.tokenExpiration is set');
	it('should return a token without expiration time if config.tokenExpiration is not set');
	it('should return 403 if token has expired');
	it('should register a authentication handler');
});
