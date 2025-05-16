// Loads HTTP core module for HTTP client and server functionality
const http = require('http');
// Loads bl core module for collecting an entire stream of data
const bl = require('bl');

// assign URLs to variables
const url1 = process.argv[2];
const url2 = process.argv[3];
const url3 = process.argv[4];

// Array to store results in order
const results = ['', '', ''];
// Counter to track completed requests
let completedRequests = 0;

// Function to handle HTTP requests
function httpGet(url, index) {
    // http.get() method is a shortcut for simple GET requests
    // first argument is URL you want to get, second argument is callback
    // response object is a Node Stream object (object that emits events)
    http.get(url, function(response) {
        // Pipe response into bl with a callback
        response.pipe(bl(function(err,data) {
            // If error
            if (err) {
                // return error to console
                return console.error(err);
            }
            // Convert data to string and add to results array at correct index
            results[index] = data.toString();

            // Increment counter
            completedRequests ++;

            // If all requests are completed, print results in order
            if (completedRequests === 3) {
                for (let i = 0; i < 3; i++) {
                    console.log(results[i]);
                }
            }
        }));
    // On error, callback function
    }).on('error', function(error) {
        // Print error to console
        console.error(`Error for ${url}: ${err.message}`);
    });
}

// Make HTTP requests for each URL with its corresponding index
httpGet(url1, 0);
httpGet(url2, 1);
httpGet(url3, 2);