// Loads fs module for file system operations
const fs = require('fs');

// Decodes a boarding pass to extract row, column, and seat ID
function decodeBoardingPass(boardingPass) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring
    // Extract row and column portions
    // The first 7 characters determine the row (0-127)
    const rowPart = boardingPass.substring(0, 7);
    // The last 3 characters determine the column (0-7)
    const colPart = boardingPass.substring(7);

    // Convert F/B to binary for row
    // F (front) = 0, B (back) = 1
    // This is essentially a binary number where each character selects upper or lower half
    let rowBinary = '';
    for (const char of rowPart) {
        // For each character, append the corresponding binary digit
        rowBinary += (char === 'F') ? '0' : '1';
    }

    // Convert L/R to binary for column
    // L (left) = 0, R (right) = 1
    // Similar to rows, this is a binary representation of the column number
    let colBinary = '';
    for (const char of colPart) {
        // For each character, append the corresponding binary digit
        colBinary += (char === 'L') ? '0' : '1';
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
    // Convert binary strings to integers
    // parseInt() with base 2 converts the binary string to a decimal number
    const row = parseInt(rowBinary, 2);
    const column = parseInt(colBinary, 2);
    // Calculate seat ID according to the formula: row * 8 + column
    // This creates a unique identifier for each seat on the plane
    const seatId = row * 8 + column;
    
    // Return an object with all calculated seat information
    return { row, column, seatId };
}

// Finds the highest seat ID among all boarding passes
function findHighestSeatId(boardingPasses) {
    // Initialize with the lowest possible value to ensure any valid ID will be higher
    let highestId = 0;
    
    // Process each boarding pass in the input
    for (const pass of boardingPasses) {
        // Decode the current boarding pass to get seat information
        // We use destructuring to extract just the seatId from the returned object
        const { seatId } = decodeBoardingPass(pass);
    
        // Check if this seat ID is higher than our current highest
        if (seatId > highestId) {
            // Update the highest ID if we found a new maximum
            highestId = seatId;
        }
    }
    
    // Return the highest seat ID found after processing all passes
    return highestId;
}

// Processes input file
function processInput(filePath) {
    // https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs
    // Read the input file asynchronously
    fs.readFile(filePath, 'utf-8', (err, data) => {
        // Handle errors in file reading (e.g., file not found)
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }
    
        // Split the input into lines to get individual boarding passes
        const boardingPasses = data.trim().split('\n');
    
        // Find the highest seat ID among all boarding passes
        const highestId = findHighestSeatId(boardingPasses);
    
        // Output the result to the console
        console.log(`The highest seat ID is: ${highestId}`);
    });
}

// Define the input file path
const filePath = './input.txt';
// Execute the main function to start the solution process
processInput(filePath);