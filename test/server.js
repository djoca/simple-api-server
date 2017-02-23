var assert = require('assert');
var mockery = require('mockery');

var http = require('http');

describe('server', function() {
	before(function() {
		var config = {
			httpServerPort: 9000,
			tokenSecret: "testSecret"
		};

		mockery.registerMock('../config/config', config);
		mockery.enable({ useCleanCache: true});

		mockery.warnOnUnregistered(false);
	});

	it('should start server at port defined in config.httpServerPort', function(done) {
		var server = require('../server/server');
		var config = require('../config/config');

		server.start();

		http.get('http://127.0.0.1:' + config.httpServerPort + "/", function(response) {
			assert(response);
			server.stop();
			done();
		});

	});

	after(function() {
		mockery.disable();
		mockery.deregisterAll();
	});

});