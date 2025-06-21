// Loads HTTP module for HTTP client and server functionality
const http = require('http');
// Loads through2-map for transforming data stream
const map = require('through2-map');

// Creates Node HTTP server 
// Takes a callback that is called once for each connection received by the server
// request is used to fetch properties, such as header and query string
// response is for sending data to client (both headers and body)
// both request and response are Node streams
const server = http.createServer(function (request, response) {
    // Checks if request is POST
    if (request.method === 'POST') {
        // Set HTTP status code (200 = OK) and content type header
        response.writeHead(200, { 'content-type': 'text/plain' });
        // Request is piped through map to transform data stream
        request.pipe(map(function (data) {
            // Data is converted to string and then upper cased
            return data.toString().toUpperCase();
        // Transformed data stream is piped to response
        })).pipe(response);
    // If request is not POST
    } else {
        // Return message that says only POSTS are allowed
        return response.end('Only POST requests are allowed');
    }
})
// Start the server and listen on the specified port
// The server will continue running and accepting connections until stopped
server.listen(Number(process.argv[2]));