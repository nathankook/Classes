// Import custom module
const filterByExtension = require('./mymodule.js');

// Get directory path and extension from command-line arguments
const dirPath = process.argv[2];
const ext = process.argv[3];

// Call the imported function with directory path, extension, and a callback
filterByExtension(dirPath, ext, function(err, files) {
    // If there is an error
    if (err) {
        // Return error to console
        return console.log('Error:', err);
    }
    
    // Print each filtered file to console
    files.forEach(function(file) {
        console.log(file);
    });
});