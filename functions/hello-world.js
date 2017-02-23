var routes = require("../server/routing");

var hello = function(requestHandler, responseHandler) {
    responseHandler.ok({
        msg: "hello world!"
    });
}

routes.register({
    pathname: "/hello",
    func: hello
});
