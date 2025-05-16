// Loads HTTP core module for HTTP server and client functionality
const http = require('http');
// Loads bl core module for collecting an entire stream of data
const bl = require('bl');

// http.get() method is a shortcut for simple GET requests
// first argument is URL you want to get, second argument is callback
// response object is a Node Stream object (object that emits events)
http.get(process.argv[2], function(response) {
    // Pipe response into bl with a callback
    response.pipe(bl(function(err, data) {
        // If error, return error to console
        if (err) {
            return console.error(err);
        }
        // Convert data to string
        data = data.toString();
        // Log the length in bytes to console
        console.log(data.length);
        // Log the buffer object to console
        console.log(data);
    }))
})