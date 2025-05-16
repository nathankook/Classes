// Loads fs module from Node core library for file system operations
const fs = require('fs');

// Reads file at the path to file that is provided as the first command line argument
// Returns a Buffer object that contains the complete contents of the file
// Buffer objects are Node's way of representing arrays of data
const contents = fs.readFileSync(process.argv[2]);

// Converts contents to strings, split by newline characters'\n',
// gets the resulting array's length, and subtracts 1 to get the number of newlines
// n newlines creates n + 1 elements when split so we subtract 1
const lines = contents.toString().split('\n').length - 1;

// Prints lines to console
console.log(lines);

