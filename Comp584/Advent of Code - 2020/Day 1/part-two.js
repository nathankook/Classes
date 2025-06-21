// Loads fs module for file system operations
// https://nodejs.org/api/fs.html
const fs = require('fs');

// Function to find three numbers that sum to 2020 and find their product
function findThreeNum(expenses) {
    // Get length of expenses list
    const n = expenses.length;

    // Sort the array first to optimize some cases
    expenses.sort((a, b) => a - b);

    // Nested loop approach
    // n - 2 because length - 1 for array length and - 1 again because right pointer will be on last element
    for (let i = 0; i < n - 2; i++) {
        // Same concept as complement from part one, but target will be a sum of two numbers
        const target = 2020 - expenses[i];

        // Two pointers to find target pair
        // Left starts at first number after i
        // Right starts at last number in list (length - 1)
        let left = i + 1;
        let right = n - 1;

        // Loop stops when we've checked all combinations for expenses[i]
        while (left < right) {
            // Keeps track of pairs
            const sum = expenses[left] + expenses[right];
            // If sum equals target
            if (sum === target) {
                // target pair is found, along with expenses[i]
                console.log(`Found triplet: ${expenses[i]}, ${expenses[left]}, and ${expenses[right]}`);
                // return multiplication of the three numbers
                return expenses[i] * expenses[left] * expenses[right];
            // If sum is less than target
            } else if (sum < target) {
                // Need to increase pointer since sum is less than 
                left++;
            } else {
                // Need to decrease pointer since sum is greater than
                right--;
            }
        }
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
        const result = findThreeNum(expenses);

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