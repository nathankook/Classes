// Loads fs module for file system operations
const fs = require('fs');

// Function to find number of trees for specific slope
function countTrees(map, rightStep, downStep) {
    // Split input into lines
    const lines = map.trim().split('\n');
    
    // Get width of the pattern (for wrapping)
    const width = lines[0].length;
    // Variable to keep track of number of trees on path
    let treeCount = 0;
    // Variable to keep track of position
    let x = 0;

    for (let y = 0; y < lines.length; y += downStep) {
        // Check if current position has a tree
        if (lines[y][x % width] === '#') {
            treeCount++;
        }
        
        // Move right for next position
        x += rightStep;
    }

    // Return the final tree count
    return treeCount;
}

// Function to calculate product of # of trees for all slopes
function calculateProduct(map, slopes) {
    // Variable to keep track of product
    let product = 1;

    // Loop for each right and down step of each of the slopes
    for (const [right, down] of slopes) {
        // Variable to keep track of # of trees for current slope
        const trees = countTrees(map, right, down);
        console.log(`Slope right ${right}, down ${down}: ${trees} trees`);
        // Update product
        product *= trees;
    }
    // Return product
    return product;
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
        
        // The slopes to check
        const slopes = [
        [1, 1], // Right 1, down 1
        [3, 1], // Right 3, down 1 (the original slope)
        [5, 1], // Right 5, down 1
        [7, 1], // Right 7, down 1
        [1, 2]  // Right 1, down 2
        ];

        // Find result
        const result = calculateProduct(data, slopes);

        // Return result to console
        console.log(`Multiplied result: ${result}`);
    });
}

// Set filePath to input.txt
const filePath = './input.txt';
// Execute function
processInput(filePath);