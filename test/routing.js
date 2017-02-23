var assert = require('assert');
var mockery = require('mockery');

var http = require('http');

describe('routing', function() {
	before(function() {
		var config = {
			httpServerPort: 9000
		};

		mockery.registerMock('../config/config', config);
		mockery.enable({ useCleanCache: true });

		mockery.warnOnUnregistered(false);

		require('../server/server').start();
	});

	it('should register a route', function() {
		var routing = require('../server/routing');
		var config = require('../config/config');

		var hello = {
			pathname: '/hi',
			func: function() {
				return "Hi, world!";
			}
		};

		routing.register(hello);

		var route = routing.get('/hi');

		assert.deepEqual(route, hello);
		assert.equal("Hi, world!", route.func());
	});

	it('should return 403 if route is secure and token is invalid or not given', function(done) {
		var routing = require('../server/routing');

		var secure = {
			pathname: '/secure',
			secure: true,
			func: function(requestHandler, responseHandler) {
				responseHandler.ok({msg: 'This is a secret!'});
			}
		};

		routing.register(secure);

		http.get('http://127.0.0.1:9000/secure', function(response) {
			assert(response);
			assert.equal(response.statusCode, 403);
			done();
		});

	});	

	it('should return ok if route exists and is public', function(done) {
		var routing = require('../server/routing');

		var publicRoute = {
			pathname: '/public',
			func: function(requestHandler, responseHandler) {
				responseHandler.ok({msg: 'Hi, world!'});
			}
		};

		routing.register(publicRoute);

		http.get('http://127.0.0.1:9000/public', function(response) {
			assert(response);
			assert.equal(response.statusCode, 200);
			done();
		});

	});

	it('should return 404 if route is not found', function(done) {
		var routing = require('../server/routing');

		http.get('http://127.0.0.1:9000/unregisteredRoute', function(response) {
			assert(response);
			assert.equal(response.statusCode, 404);
			done();
		});			
	});

	it('should return 500 if internal server error occurred', function(done) {
		var routing = require('../server/routing');

		var errorRoute = {
			pathname: '/error',
			func: function(requestHandler, responseHandler) {
				responseHandler.internalServerError();
			}
		};

		routing.register(errorRoute);

		http.get('http://127.0.0.1:9000/error', function(response) {
			assert(response);
			assert.equal(response.statusCode, 500);
			done();
		});
	});

	after(function() {
		require('../server/server').stop();
		mockery.disable();
		mockery.deregisterAll();
	})

});