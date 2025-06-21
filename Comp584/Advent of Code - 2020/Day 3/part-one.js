// Loads fs module for file system operations
// https://nodejs.org/api/fs.html
const fs = require('fs');

// Function to find number of trees on path
function findTrees(map) {
    // Split input into lines
    const lines = map.trim().split('\n');

    // Get width of the pattern (for wrapping)
    const width = lines[0].length;
    // Variable to keep track of number of trees on path
    let treeCount = 0;
    // Variable to keep track of position
    let position = 0;

    // Loop to iterate through each of the lines
    for (let i = 0; i < lines.length; i++) {
        // Check if current position has a tree
        // Use modulo to handle the repeating pattern
        if (lines[i][position % width] === '#') {
            treeCount++;
        }
        // Add 3 to position (move 3 to the right)
        position += 3;
    }

    // Return the final tree count
    return treeCount;
}

// Read and parse the input file
function processInput (filePath) {
    // https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs
    fs.readFile(filePath, 'utf-8', (err, data) => {
        // Error when reading input file
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }
        
        // Find result
        const result = findTrees(data);

        // Return result to console
        console.log(`# of trees: ${result}`);
    });
}

// Set filePath to input.txt
const filePath = './input.txt';
// Execute function
processInput(filePath);