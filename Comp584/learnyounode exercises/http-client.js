// Loads HTTP core module for HTTP server and client functionality
const http = require('http');

// http.get() method is a shortcut for simple GET requests
// first argument is URL you want to get, second argument is callback
// response object is a Node Stream object (object that emits events)
http.get(process.argv[2], function (response) {
    // Set the encoding of the received data to UTF-8
    response.setEncoding('utf8');
    // Listens to events
    // "data" event is emitted when a chunk of data is available and can be processed
    // when response is data event, log to console
    response.on('data', console.log);
    // "error" event
    // when response is error event, log error to console
    response.on('error', console.error);
// If error with get request, log error to console
}).on('error', console.error);