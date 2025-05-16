// Load the HTTP module for creating a server
const http = require('http');

// Function to parse time into hours, minutes, seconds
function parsetime(time) {
    return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds(),
    };
}

// Function to convert time to Unix timestamp (milliseconds since epoch)
function unixtime(time) {
    return { 
        unixtime: time.getTime(),
    };
}

// Create an HTTP server
const server = http.createServer(function (req, res) {
    // Parse the URL from the request
    const parsedUrl = new URL(req.url, 'http://localhost');
    
    // Get ISO time from query parameter and convert to Date object
    const time = new Date(parsedUrl.searchParams.get('iso'));
    
    // Variable to store result
    let result = 0;
    
    // Route the request based on URL path
    // If path starts with /api/parsetime
    if (/^\/api\/parsetime/.test(req.url)) {
        // Return formatted time
        result = parsetime(time);
    // If path starts with /api/unixtime,
    } else if (/^\/api\/unixtime/.test(req.url)) {
        // return Unix timestamp
        result = unixtime(time);
    }
    
    // Send response
    if (result) {
        // Set headers and send JSON result
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
    } else {
        // If path doesn't match any endpoint, return 404
        res.writeHead(404);
        res.end();
    }
})
// Listen on the port from command-line argument
server.listen(Number(process.argv[2]));