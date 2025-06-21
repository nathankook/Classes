// Loads HTTP module for HTTP client and server functionality
const http = require('http');
// Loads fs module for file system operations
const fs = require('fs');

// Get port and file path from command-line arguments
const port = process.argv[2];
const filePath = process.argv[3];

// Creates Node HTTP server 
// Takes a callback that is called once for each connection received by the server
// request is used to fetch properties, such as header and query string
// response is for sending data to client (both headers and body)
// both request and response are Node streams
const server = http.createServer(function (request, response) {
    // Set HTTP status code (200 = OK) and content type header
    response.writeHead(200, { 'content-type': 'text/plain' })
    // Creates a readable stream from the file specified in filePath
    // pipe() connects the read stream to the response write stream
    // This efficiently transfers file data to client without loading entire file into memory
    fs.createReadStream(filePath).pipe(response);
})
// Start the server and listen on the specified port
// The server will continue running and accepting connections until stopped
server.listen(port);