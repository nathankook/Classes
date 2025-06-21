// Loads fs module from Node core library for file system operations
const fs = require('fs');

// Reads the file asynchronously at the path to file that is provided as the first command line argument
// 'utf-8' parameter tells Node to decode the file as a UTF-8 string, so .toString() is no longer needed
// third parameter is a callback function that will be called once the file is read
fs.readFile(process.argv[2], 'utf-8', function callback(err, contents) {
    // If there is an error
    if (err) {
        // return error to console
        return console.log(err)
    }
    // Calculate the number of newlines by splitting the string on '\n' characters
    // and counting the resulting array length minus 1
    const lines = contents.split('\n').length - 1;
    // Print lines to console
    console.log(lines);
})

// Sources:
// https://github.com/max-mapper/art-of-node#callbacks