## Simple API Server

This is a very simple API server made with Node.js. The purpose of this project is to support the typical needs an API server must have.

Until now, Simple API Server provides:

 - A token authentication mechanism
 - API functions modularization
 - Routing registration

## Getting started

First, you should have node.js and npm installed.

Clone this project to your machine and install the packages:

    npm install

Then, run the server:

    npm start

Open a web browser and go to `http://localhost:9000/hello`.

## Examples

The Simple API Server comes with some very basic examples. The files are contained in the `/functions` folder.

## How does it work

When Simple API Server start, it scans for all the files in the `/functions`. Each file can contain one or more API function. To expose these functions, each one must be registered in the routing engine. Look at the example below:

    routes.register({
        pathname: "/hello",
        func: hello
    });

If authentication is required, enable the security for each path:

    routes.register({
        pathname: "/secure",
        func: securedFunction,
        secure: true
    });

The functions folder can be changed in the configuration file. 

You can create other folders inside the `/functions`  folder if you need. These folders and the files it contains will not be scanned.

## Authentication

To create an authentication method, you must create a function inside the `/functions`  folder and register it with the authentication engine.

The authentication method must be a function that expects to receive 3 parameters:

 - login: a string containing the user login. password: a string
 - containing the user password. callback: a callback function to the
 - authentication engine.

The callback function has 2 parameters:
- error: set only if an error occured.
- authentication_ok: true if authentication succeeds, false otherwise.

Simple API Server comes with a default authentication method, that should be used only for development. This method returns true if the login and password are equals.

Simple API Server uses JSON Web Tokens to create and decode tokens.

## License
MIT