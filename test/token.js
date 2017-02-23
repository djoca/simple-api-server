var assert = require('assert');
var mockery = require('mockery');

describe('token', function() {

	before(function() {
		var config = {
			httpServerPort: 9000,
			tokenSecret: "testSecret"
		};

		mockery.registerMock('../config/config', config);
		mockery.enable({ useCleanCache: true });

		mockery.warnOnUnregistered(false);
	});

	it('should create a signed token', function() {
		var security = require('../server/security');
		var config = require('../config/config');

		var obj = {login: 'djoca', iat: 1487596840};
		var token = security.sign(obj);

		assert.equal(token, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImRqb2NhIiwiaWF0IjoxNDg3NTk2ODQwfQ.UL_RlmLeDZD1BTdHwo6n2YxuD1lsXeenWAUWsu28uXE');
	});

	it('should decode a signed token', function(done) {
		var security = require('../server/security');
		var config = require('../config/config');

		var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImRqb2NhIiwiaWF0IjoxNDg3NTk2ODQwfQ.UL_RlmLeDZD1BTdHwo6n2YxuD1lsXeenWAUWsu28uXE';

		security.verify(token, function(err, decoded) {
			assert.ifError(err);
			 
			assert.deepEqual(decoded, {login: 'djoca', iat: 1487596840});
			done();
		});
	});

	after(function() {
		mockery.disable();
		mockery.deregisterAll();
	});
 });