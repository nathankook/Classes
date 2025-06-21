// Loads fs module from Node core library for file system operations
const fs = require('fs');
// Loads path module which helps with file path operations
const path = require('path');

// Read the directory specified in the command-line arguments, and calls function once directory is read
fs.readdir(process.argv[2], function callback(err, files) {
    // If there is an error
    if (err) {
        // return error to console
        return console.log(err)
    }
    // For each file in files list
    files.forEach(function (file) {
        // If file's extension name is equal to '.' + extension given in command line argument
        if (path.extname(file) === `.${process.argv[3]}`) {
            // Print file name to console
            console.log(file);
        }
    });
});