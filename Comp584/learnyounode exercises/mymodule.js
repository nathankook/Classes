// Loads fs module from Node core library for file system operations
const fs = require('fs');
// Loads path module which helps with file path operations
const path = require('path');

// Filter function that will be exported from this module assigned to module exports object
module.exports = function filterByExtension(dirPath, ext, callback) {
    // Read the directory specified in the command-line arguments, and calls function once directory is read
    fs.readdir(dirPath, function(err, files) {
        // If there is an error, return it to the callback
        if (err) {
            return callback(err);
        }
    
        // Filter files by extension
        const filtered = files.filter(function(file) {
            // Check if file's extension matches the requested extension
            return path.extname(file) === `.${ext}`;
        });
    
        // Return null for error (no error) and the filtered list
        callback(null, filtered);
    })
}