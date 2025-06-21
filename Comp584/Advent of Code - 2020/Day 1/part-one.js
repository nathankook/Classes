// Loads fs module for file system operations
// https://nodejs.org/api/fs.html
const fs = require('fs');

// Function to find two numbers that sum to 2020 and return their product
function findTwoNum(expenses) {
    // Create a new set to keep track of seen numbers
    const seen = new Set();

    for (const expense of expenses) {
        // variable to keep track of complement
        const complement = 2020 - expense;

        // If we've seen the complement before, we found our pair
        if (seen.has(complement)) {
            console.log(`Found pair: ${expense} and ${complement}`);
            return expense * complement;
        }

        // Add current expense to set
        seen.add(expense);
    }

    // No solution found
    return null;
}

// Read and parse the input file
function processInput(filePath) {
    // Asynchronous fs.readFile method
    // https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs
    fs.readFile(filePath, 'utf8', (err, data) => {
        // Error when reading input file
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        // Split by newlines and convert to numbers, filtering out empty lines
        const expenses = data
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
            .split('\n')
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
            .filter(line => line.trim() !== '')
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
            .map(Number);

        // Find the result
        const result = findTwoNum(expenses);

        // Return result to console if result exists
        if (result) {
            console.log(`The answer is: ${result}`);
        } else {
            console.log('No solution found.');
        }
    });
}

// Set filePath to input.txt
const filePath = './input.txt';
// Execute function
processInput(filePath);